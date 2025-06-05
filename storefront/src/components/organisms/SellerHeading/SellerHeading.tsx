'use client'

import { SellerInfo } from "@/components/molecules"
import { Button, Divider } from "@/components/atoms"
import { Modal, ReportSellerForm } from "@/components/molecules"
import { SellerProps } from "@/types/seller"
import { Chat } from "../Chat/Chat"
import { HttpTypes } from "@medusajs/types"
import { format } from "date-fns"
import { useState } from "react"


export const SellerHeading = ({
  seller,
  user,
  header,
}: {
  header: boolean
  seller: SellerProps
  user: HttpTypes.StoreCustomer | null
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="group relative">
      {/* Main container */}
      <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-sm overflow-hidden p-4">
        
        {/* Top row - Joined and Report */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-500">Joined {format(seller.created_at, "MMM yyyy")}</span>
          <Button
            variant="text"
            className="text-gray-600 hover:text-red-600 text-sm px-2 py-1"
            onClick={() => setOpenModal(true)}
          >
            Report
          </Button>
        </div>

        {/* Seller image and name */}
        <div className="flex flex-col items-center mb-2">
          {/* Seller image - now smaller and at the top */}
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 mb-2">
            {seller.photo ? (
              <img 
                src={seller.photo} 
                alt={seller.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <span className="text-lg font-bold text-indigo-600">
                  {seller.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Brand name - bolder */}
          <h1 className="text-xl font-extrabold text-gray-900 text-center">
            {seller.name}
          </h1>
        </div>

        {/* Reviews - centered */}
        <div className="text-center text-sm text-gray-500 mb-2">
          <SellerInfo header={false} seller={seller} />
        </div>

        {/* Description - closer to brand name */}
        {seller.description && (
          <p className="text-gray-600 text-sm text-center mb-3">
            {seller.description}
          </p>
        )}

        {/* Badge moved to bottom right */}
        <div className="absolute bottom-2 right-2">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm border border-gray-200/50 px-2 py-1 rounded-full text-xs">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
            <span>Brand</span>
          </div>
        </div>

        {/* Chat button */}
        {user && (
          <div className="flex justify-center mt-1">
            <Chat
              user={user}
              seller={seller}
              icon
              buttonClassNames="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full"
            />
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <Modal 
          heading="Report seller" 
          onClose={() => setOpenModal(false)}
        >
          <div className="relative bg-white/95">
            <ReportSellerForm onClose={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  )
}