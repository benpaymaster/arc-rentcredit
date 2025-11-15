"use client";

export default function TenantEscrowList() {
  // Mock escrow data
  const escrows = [
    {
      id: '1',
      propertyAddress: '123 Main St, Boston, MA',
      depositAmount: '2500',
      token: 'USDC',
      status: 'Active',
      landlord: '0x1234...5678',
      createdAt: '2024-11-01'
    },
    {
      id: '2',
      propertyAddress: '456 Oak Ave, Cambridge, MA',
      depositAmount: '3000',
      token: 'USDC',
      status: 'Pending',
      landlord: '0xabcd...efgh',
      createdAt: '2024-11-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {escrows.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-lg font-medium">No escrows yet</h3>
            <p className="text-sm">Create your first rental escrow to get started</p>
          </div>
        </div>
      ) : (
        escrows.map((escrow) => (
          <div key={escrow.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{escrow.propertyAddress}</h3>
                <p className="text-sm text-gray-600">Landlord: {escrow.landlord}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>
                {escrow.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">Deposit Amount</p>
                <p className="text-lg font-semibold">{escrow.depositAmount} {escrow.token}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="text-lg font-semibold">{new Date(escrow.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm">
                View Details
              </button>
              {escrow.status === 'Active' && (
                <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors text-sm">
                  Request Release
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
