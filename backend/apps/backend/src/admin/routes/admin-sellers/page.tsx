import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Buildings } from "@medusajs/icons";
import { Button, Container, Heading, Text, toast } from "@medusajs/ui";
import { useEffect, useState } from "react";

const AdminSellersPage = () => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar sellers usando fetch básico
  const loadSellers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/admin/sellers', {
        credentials: 'include', // Importante para autenticación
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Sellers loaded:', data); // Debug
        setSellers(data.sellers || []);
        toast.success(`Loaded ${data.sellers?.length || 0} sellers`);
      } else {
        console.error('Response not ok:', response.status);
        toast.error(`Failed to load sellers: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error loading sellers');
    } finally {
      setLoading(false);
    }
  };

  // Impersonar seller
  const handleImpersonate = async (sellerId: string) => {
    try {
      const response = await fetch(`/admin/sellers/${sellerId}/impersonate`, {
        method: 'POST',
        credentials: 'include', // Importante para autenticación
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Impersonation data:', data); // Debug
        toast.success(data.message || 'Impersonation successful');
        
        // Abrir en nueva pestaña
        if (data.vendor_url) {
          window.open(data.vendor_url, '_blank');
        }
      } else {
        console.error('Impersonation failed:', response.status);
        toast.error(`Failed to impersonate seller: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error impersonating seller');
    }
  };

  useEffect(() => {
    loadSellers();
  }, []);

  return (
    <Container className="p-6">
      <div className="mb-6">
        <Heading>Sellers Management</Heading>
        <Text className="text-ui-fg-subtle" size="small">
          Basic seller management panel
        </Text>
      </div>

      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={loadSellers}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh Sellers'}
        </Button>
      </div>

      {loading ? (
        <Text>Loading sellers...</Text>
      ) : sellers.length > 0 ? (
        <div className="space-y-4">
          {sellers.map((seller) => (
            <div 
              key={seller.id} 
              className="border border-ui-border-base rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <Heading level="h3">{seller.name}</Heading>
                  <Text size="small" className="text-ui-fg-subtle">
                    @{seller.handle} • {seller.email || 'No email'}
                  </Text>
                </div>
                
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleImpersonate(seller.id)}
                >
                  Impersonate
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Text className="text-ui-fg-muted">No sellers found</Text>
        </div>
      )}
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Admin Sellers",
  icon: Buildings,
});

export default AdminSellersPage;