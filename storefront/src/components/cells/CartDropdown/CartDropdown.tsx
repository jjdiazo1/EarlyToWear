"use client";

import { Badge, Button } from "@/components/atoms";
import { CartDropdownItem } from "@/components/molecules";
import { Link } from "@/i18n/routing";
import { CartIcon } from "@/icons";
import { convertToLocale } from "@/lib/helpers/money";
import { HttpTypes } from "@medusajs/types";
import { useEffect, useRef, useState } from "react";
import { PortalDropdown } from "@/components/molecules";
import { useRouter } from "@/i18n/routing"; // Use i18n router instead
import { retrieveCart } from "@/lib/data/cart";

const getItemCount = (cart: HttpTypes.StoreCart | null) => {
  return cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};

// 🔧 FIXED HELPER: Calculate item price manually with better fallbacks
const getItemPrice = (item: any) => {
  console.log('🔍 Getting price for cart item:', {
    id: item.id,
    title: item.title || item.product_title,
    unit_price: item.unit_price,
    subtotal: item.subtotal,
    total: item.total,
    quantity: item.quantity,
    product_id: item.product_id,
    variant_id: item.variant_id,
    variant: !!item.variant,
    calculated_price: item.calculated_price,
    original_price: item.original_price
  });

  // 1. Try calculated_price first (most reliable for cart items)
  if (item.calculated_price && item.calculated_price > 0) {
    console.log('✅ Using calculated_price:', item.calculated_price);
    return item.calculated_price;
  }

  // 2. Try unit_price 
  if (item.unit_price && item.unit_price > 0) {
    console.log('✅ Using unit_price:', item.unit_price);
    return item.unit_price;
  }

  // 3. Try original_price
  if (item.original_price && item.original_price > 0) {
    console.log('✅ Using original_price:', item.original_price);
    return item.original_price;
  }

  // 4. Calculate from subtotal if we have quantity
  if (item.subtotal && item.subtotal > 0 && item.quantity && item.quantity > 0) {
    const unitFromSubtotal = item.subtotal / item.quantity;
    console.log('✅ Calculated from subtotal/quantity:', unitFromSubtotal);
    return unitFromSubtotal;
  }

  // 5. Calculate from total if we have quantity  
  if (item.total && item.total > 0 && item.quantity && item.quantity > 0) {
    const unitFromTotal = item.total / item.quantity;
    console.log('✅ Calculated from total/quantity:', unitFromTotal);
    return unitFromTotal;
  }

  // 6. Try to find COP price in variant prices
  const variant = item.variant;
  if (variant?.prices && Array.isArray(variant.prices)) {
    const copPrice = variant.prices.find((p: any) => 
      p.currency_code?.toLowerCase() === 'cop'
    );
    if (copPrice && copPrice.amount) {
      console.log('✅ Using variant COP price:', copPrice.amount);
      return copPrice.amount;
    }
    
    // Try any price if COP not found
    const anyPrice = variant.prices.find((p: any) => p.amount && p.amount > 0);
    if (anyPrice) {
      console.log('✅ Using any variant price:', anyPrice.amount);
      return anyPrice.amount;
    }
  }

  // 7. Try product variant prices if available
  if (item.product?.variants && Array.isArray(item.product.variants)) {
    const productVariant = item.product.variants.find((v: any) => v.id === item.variant_id);
    if (productVariant?.prices) {
      const copPrice = productVariant.prices.find((p: any) => 
        p.currency_code?.toLowerCase() === 'cop'
      );
      if (copPrice && copPrice.amount) {
        console.log('✅ Using product variant COP price:', copPrice.amount);
        return copPrice.amount;
      }
    }
  }

  // 8. Last resort: use subtotal or total as-is
  if (item.subtotal && item.subtotal > 0) {
    console.log('⚠️ Using subtotal as unit price:', item.subtotal);
    return item.subtotal;
  }

  if (item.total && item.total > 0) {
    console.log('⚠️ Using total as unit price:', item.total);
    return item.total;
  }
  
  console.log('❌ No price found, using 0');
  return 0;
};

export const CartDropdown = ({ initialCart }: { initialCart?: HttpTypes.StoreCart | null }) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(initialCart || null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // 🔄 Auto-refresh cart every few seconds and when dropdown opens
  const refreshCart = async () => {
    try {
      console.log('🔄 Refreshing cart...');
      const freshCart = await retrieveCart();
      console.log('🛒 Fresh cart loaded:', {
        id: freshCart?.id,
        itemsCount: freshCart?.items?.length || 0,
        currency: freshCart?.currency_code,
        items: freshCart?.items?.map(item => ({
          id: item.id,
          title: item.title || item.product_title,
          quantity: item.quantity,
          price: getItemPrice(item)
        }))
      });
      setCart(freshCart);
    } catch (error) {
      console.error('❌ Failed to refresh cart:', error);
    }
  };

  // Refresh cart when component mounts and every 5 seconds
  useEffect(() => {
    refreshCart();
    
    const interval = setInterval(() => {
      refreshCart();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Also refresh when dropdown opens
  useEffect(() => {
    if (open) {
      refreshCart();
    }
  }, [open]);

  const cartItemsCount = getItemCount(cart);
  
  // 🔧 IMPROVED: Total calculation with better error handling
  const calculateTotal = () => {
    if (!cart?.items || cart.items.length === 0) return 0;
    
    console.log('💰 Calculating cart total...');
    
    const total = cart.items.reduce((total, item) => {
      const itemPrice = getItemPrice(item);
      const itemTotal = itemPrice * item.quantity;
      console.log(`💰 Item ${item.title}: ${itemPrice} x ${item.quantity} = ${itemTotal}`);
      return total + itemTotal;
    }, 0);

    console.log('💰 Final cart total:', total);
    return total;
  };

  const totalAmount = calculateTotal();
  
  // 🔧 IMPROVED: Better total formatting with error handling
  let total;
  try {
    total = convertToLocale({
      amount: totalAmount,
      currency_code: cart?.currency_code || "cop",
    });
  } catch (error) {
    console.error('❌ Error formatting total:', error);
    // Fallback formatting
    total = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(totalAmount);
  }

  // 🔍 DEBUG: Ver qué cart tenemos
  console.log('🛒 CartDropdown state:', {
    cartExists: !!cart,
    cartId: cart?.id,
    itemsLength: cart?.items?.length,
    cartItemsCount,
    totalAmount,
    currency: cart?.currency_code,
    open
  });

  // Función para abrir con delay
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpen(true);
  };

  // Función para cerrar con delay - MAS TIEMPO para hacer click
  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300); // Aumentado a 300ms para dar más tiempo
  };

  // 🔧 FIXED: Navigation function - STOP EVENT BUBBLING
  const goToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevenir que el click cierre el dropdown
    console.log("🛒 GO TO CART CLICKED!");
    
    // Navegar inmediatamente SIN cerrar dropdown primero
    try {
      router.push("/cart");
      console.log("✅ router.push called");
    } catch (error) {
      console.error("❌ router.push failed:", error);
      window.location.href = "/cart";
    }
  };

  // 🔧 FIXED: Navigation to categories - STOP EVENT BUBBLING  
  const goToCategories = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevenir que el click cierre el dropdown
    console.log("📂 GO TO CATEGORIES CLICKED!");
    
    try {
      router.push("/categories");
    } catch (error) {
      console.error("❌ router.push to categories failed:", error);
      window.location.href = "/categories";
    }
  };

  // Cleanup del timeout
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // 🔧 FIXED: Cerrar el dropdown al hacer clic fuera - NO interferir con botones internos
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // No cerrar si el click es en un botón del dropdown o sus hijos
      if (target.closest('button[data-cart-action]')) {
        return;
      }
      
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div
      className="relative z-cart"
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ícono del carrito */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative cursor-pointer p-1"
        aria-label="Abrir carrito"
        onMouseEnter={handleMouseEnter}
      >
        <CartIcon
          size={24}
          className={`text-gray-600 hover:text-indigo-600 transition-colors duration-200 ${
            open ? "text-indigo-600" : ""
          }`}
        />
        {cartItemsCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                            border-2 border-white shadow-lg animate-pulse text-xs flex items-center justify-center">
            {cartItemsCount}
          </Badge>
        )}
      </button>

      {/* Portal dropdown - IMPROVED MOUSE HANDLING */}
      <PortalDropdown show={open}>
        <div 
          className="p-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={(e) => e.stopPropagation()} // Prevent clicks from bubbling
        >
          {/* Encabezado del dropdown */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            <h3
              className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                         bg-clip-text text-transparent uppercase tracking-wide"
            >
              Shopping Cart
            </h3>
          </div>

          {cartItemsCount > 0 ? (
            <>
              {/* Lista de productos */}
              <div className="space-y-3 max-h-80 overflow-y-auto mb-4 pr-2">
                {cart?.items?.map((item) => (
                  <CartDropdownItem
                    key={item.id}
                    item={item}
                    currency_code={cart.currency_code}
                  />
                ))}
              </div>

              {/* Total y botón */}
              <div className="border-t border-gray-200/50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-medium">Total</span>
                  <span
                    className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                               bg-clip-text text-transparent"
                  >
                    {total}
                  </span>
                </div>
                
                {/* 🔧 FIXED: Button with data attribute to prevent dropdown close */}
                <button
                  type="button"
                  data-cart-action="go-to-cart"
                  onClick={goToCart}
                  onMouseDown={(e) => e.stopPropagation()} // Extra protection
                  className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                             hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                             transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer"
                >
                  <span>Go to cart</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            /* Estado vacío */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mx-auto mb-4 
                              flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-400"
                >
                  <path
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v6a2 2 0 002 2h8a2 2 0 002-2v-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">
                Tu carrito está vacío
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Agrega artículos para comenzar
              </p>
              
              <button
                data-cart-action="go-to-categories"
                onClick={goToCategories}
                onMouseDown={(e) => e.stopPropagation()} // Extra protection
                className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                           hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
                           transition-all duration-300 cursor-pointer"
              >
                Explorar productos
              </button>
            </div>
          )}
        </div>
      </PortalDropdown>
    </div>
  );
};