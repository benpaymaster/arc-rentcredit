"use client";

import { useState } from 'react';

export default function TenantEscrowForm() {
  const [formData, setFormData] = useState({
    propertyAddress: '',
    depositAmount: '',
    landlordAddress: '',
    token: 'USDC'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating escrow:', formData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Create Rental Escrow</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Address
          </label>
          <input
            type="text"
            value={formData.propertyAddress}
            onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter property address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Landlord Address
          </label>
          <input
            type="text"
            value={formData.landlordAddress}
            onChange={(e) => setFormData({ ...formData, landlordAddress: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0x..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deposit Amount
          </label>
          <div className="flex">
            <input
              type="number"
              value={formData.depositAmount}
              onChange={(e) => setFormData({ ...formData, depositAmount: e.target.value })}
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
            <select
              value={formData.token}
              onChange={(e) => setFormData({ ...formData, token: e.target.value })}
              className="border border-l-0 border-gray-300 rounded-r-md px-3 py-2 bg-gray-50"
            >
              <option value="USDC">USDC</option>
              <option value="EURC">EURC</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Escrow
        </button>
      </form>
    </div>
  );
}
