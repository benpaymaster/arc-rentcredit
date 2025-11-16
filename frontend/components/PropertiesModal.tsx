'use client'

import { useState } from 'react'
import { X, MapPin, Calendar, DollarSign, Users } from 'lucide-react'

interface Property {
  id: string
  address: string
  amount: string
  duration: string
  tenantAddress?: string
  paymentDate: string
  status: 'active' | 'pending' | 'completed'
}

interface PropertiesModalProps {
  isOpen: boolean
  onClose: () => void
  properties: Property[]
}

export default function PropertiesModal({ isOpen, onClose, properties }: PropertiesModalProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  if (!isOpen) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-500/20 border-green-400/30'
      case 'pending':
        return 'text-orange-400 bg-orange-500/20 border-orange-400/30'
      case 'completed':
        return 'text-blue-400 bg-blue-500/20 border-blue-400/30'
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-400/30'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-950/95 via-slate-900/95 to-purple-950/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">All Properties</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Properties Yet</h3>
              <p className="text-white/60">
                Properties will appear here when tenants make payments.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => setSelectedProperty(selectedProperty?.id === property.id ? null : property)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <h3 className="text-lg font-semibold text-white">{property.address}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-white/70">Rent:</span>
                          <span className="text-green-400 font-semibold">{property.amount} USDC</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span className="text-white/70">Duration:</span>
                          <span className="text-purple-400 font-semibold">{property.duration} months</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-orange-400" />
                          <span className="text-white/70">Status:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(property.status)}`}>
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {selectedProperty?.id === property.id && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-400/20 rounded-xl p-4">
                          <h4 className="font-semibold text-blue-200 mb-3">Payment Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Monthly Rent:</span>
                              <span className="text-white font-semibold">{property.amount} USDC</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Safety Contribution:</span>
                              <span className="text-white font-semibold">{(parseFloat(property.amount) * 0.1).toFixed(2)} USDC</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Total Payment:</span>
                              <span className="text-green-400 font-bold">{(parseFloat(property.amount) * 1.1).toFixed(2)} USDC</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border border-green-400/20 rounded-xl p-4">
                          <h4 className="font-semibold text-green-200 mb-3">Tenancy Info</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Duration:</span>
                              <span className="text-white font-semibold">{property.duration} months</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Payment Date:</span>
                              <span className="text-white font-semibold">{property.paymentDate}</span>
                            </div>
                            {property.tenantAddress && (
                              <div className="flex justify-between">
                                <span className="text-white/70">Tenant Wallet:</span>
                                <span className="text-white font-semibold font-mono text-xs">
                                  {property.tenantAddress.substring(0, 6)}...{property.tenantAddress.substring(-4)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-3">
                        <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                          Release Payment
                        </button>
                        <button className="flex-1 bg-white/10 border border-white/20 text-white py-2 px-4 rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                          Contact Tenant
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{properties.filter(p => p.status === 'active').length}</div>
              <div className="text-sm text-green-200">Active Properties</div>
            </div>
            <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">{properties.filter(p => p.status === 'pending').length}</div>
              <div className="text-sm text-orange-200">Pending Payments</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">
                ${properties.reduce((sum, p) => sum + parseFloat(p.amount), 0).toFixed(2)}
              </div>
              <div className="text-sm text-blue-200">Total Monthly Income</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}