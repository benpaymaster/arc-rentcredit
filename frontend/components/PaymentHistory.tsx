'use client'

interface PaymentHistoryProps {
  userType: 'tenant' | 'landlord'
}

const payments = [
  {
    id: '1',
    date: '2025-11-01',
    amount: 2500,
    status: 'completed',
    property: '123 Main St, Apt 4B',
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    date: '2025-10-01',
    amount: 2500,
    status: 'completed',
    property: '123 Main St, Apt 4B',
    txHash: '0x2345...6789'
  },
  {
    id: '3',
    date: '2025-09-01',
    amount: 2500,
    status: 'completed',
    property: '123 Main St, Apt 4B',
    txHash: '0x3456...7890'
  },
  {
    id: '4',
    date: '2025-08-01',
    amount: 2500,
    status: 'completed',
    property: '123 Main St, Apt 4B',
    txHash: '0x4567...8901'
  },
  {
    id: '5',
    date: '2025-07-01',
    amount: 2500,
    status: 'completed',
    property: '123 Main St, Apt 4B',
    txHash: '0x5678...9012'
  },
  {
    id: '6',
    date: '2025-06-01',
    amount: 2500,
    status: 'completed',
    property: '456 Oak Ave, Unit 2A',
    txHash: '0x6789...0123'
  },
  {
    id: '7',
    date: '2025-05-01',
    amount: 1800,
    status: 'completed',
    property: '789 Pine St, Suite 1C',
    txHash: '0x7890...1234'
  },
  {
    id: '8',
    date: '2025-04-01',
    amount: 2200,
    status: 'completed',
    property: '456 Oak Ave, Unit 2A',
    txHash: '0x8901...2345'
  }
]

export default function PaymentHistory({ userType }: PaymentHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-400 to-emerald-500'
      case 'pending':
        return 'from-orange-400 to-yellow-500'
      case 'failed':
        return 'from-red-400 to-red-500'
      default:
        return 'from-gray-400 to-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'pending':
        return 'In Escrow'
      case 'failed':
        return 'Failed'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
      {payments.map((payment) => (
        <div
          key={payment.id}
          className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getStatusColor(payment.status)}`}></div>
              <span className="text-white font-medium">
                ${payment.amount.toLocaleString()} USDC
              </span>
            </div>
            <span className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(payment.status)} text-white font-medium`}>
              {getStatusText(payment.status)}
            </span>
          </div>
          
          <div className="text-sm text-white/60 mb-2">
            {payment.property}
          </div>
          
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>{new Date(payment.date).toLocaleDateString()}</span>
            <button
              onClick={() => window.open(`https://etherscan.io/tx/${payment.txHash}`, '_blank')}
              className="hover:text-purple-300 transition-colors"
            >
              View Tx: {payment.txHash}
            </button>
          </div>
        </div>
      ))}
      
      {payments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full"></div>
          </div>
          <p className="text-white/60 text-sm">
            {userType === 'tenant' ? 'No payments made yet' : 'No payments received yet'}
          </p>
        </div>
      )}
    </div>
  )
}