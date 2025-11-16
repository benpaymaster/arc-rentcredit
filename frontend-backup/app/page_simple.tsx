'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-5">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 max-w-[600px] w-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-white">
        <h1 className="text-3xl font-bold text-center text-teal-300 mb-2">Create Rental Escrow</h1>
        <p className="text-sm text-center text-gray-400 mb-6">Programmable Escrow • Smart Contracts • Automated Releases</p>

        {/* Rental Details Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-white border-b border-[#30363d] pb-2">Rental Details</h3>
          
          {/* Landlord Address */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Landlord Wallet Address</label>
            <input 
              type="text"
              value="0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e"
              className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white font-mono"
              readOnly
            />
          </div>

          {/* Property Address */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Property Address (Optional)</label>
            <input 
              type="text"
              value="123 Student St, Boston, MA"
              className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white"
              readOnly
            />
          </div>
        </div>

        {/* Financial Terms */}
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold text-white border-b border-[#30363d] pb-2">Financial Terms</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Security Deposit */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Security Deposit (USDC)</label>
              <div className="relative">
                <input 
                  type="number"
                  value="5000"
                  className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white"
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400 font-semibold">USDC</span>
                </div>
              </div>
            </div>

            {/* Monthly Rent */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Monthly Rent (USDC)</label>
              <div className="relative">
                <input 
                  type="number"
                  value="2000"
                  className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white"
                  readOnly
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-400 font-semibold">USDC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Damage Threshold */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Damage Threshold (USDC)</label>
            <div className="relative">
              <input 
                type="number"
                value="500"
                className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white"
                readOnly
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 font-semibold">USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Duration */}
        <div className="mt-8 space-y-6">
          <h3 className="text-lg font-semibold text-white border-b border-[#30363d] pb-2">Lease Duration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Duration (Months)</label>
              <div className="relative">
                <select className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-sm appearance-none cursor-pointer text-white">
                  <option value="12">12 months</option>
                  <option value="6">6 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Start Date</label>
              <input 
                type="text"
                placeholder="mm/dd/yyyy"
                className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg text-sm focus:ring-teal-500 focus:border-teal-500 text-white"
              />
            </div>
          </div>
        </div>

        {/* Automation Settings */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white border-b border-[#30363d] pb-2">Automation Settings</h3>
          
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded border-[#30363d] bg-[#24292e] text-teal-500 focus:ring-teal-500" />
              <div>
                <div className="text-sm font-medium text-white">Require Property Inspection</div>
                <div className="text-xs text-gray-400">Landlord must complete inspection before deposit release</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded border-[#30363d] bg-[#24292e] text-teal-500 focus:ring-teal-500" />
              <div>
                <div className="text-sm font-medium text-white">Require Tenant Confirmation</div>
                <div className="text-xs text-gray-400">Tenant must confirm move-out before automated release</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded border-[#30363d] bg-[#24292e] text-teal-500 focus:ring-teal-500" />
              <div>
                <div className="text-sm font-medium text-white">Auto-Release Monthly Rent</div>
                <div className="text-xs text-gray-400">Automatically release rent payments on schedule</div>
              </div>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="mt-1 rounded border-[#30363d] bg-[#24292e] text-teal-500 focus:ring-teal-500" />
              <div>
                <div className="text-sm font-medium text-white">Allow Early Termination</div>
                <div className="text-xs text-gray-400">Enable early lease termination with conditions</div>
              </div>
            </label>
          </div>
        </div>

        {/* Create Escrow Button */}
        <button 
          className="mt-8 w-full p-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
          style={{backgroundColor: '#2e8b57'}}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3cb371')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2e8b57')}
        >
          Create Rental Escrow
        </button>

        {/* Navigation Links */}
        <div className="mt-6 flex justify-center space-x-4 text-sm">
          <a href="/bridge" className="text-teal-300 hover:text-teal-200 transition-colors">Bridge</a>
          <span className="text-gray-500">•</span>
          <a href="/escrow" className="text-teal-300 hover:text-teal-200 transition-colors">Escrow</a>
          <span className="text-gray-500">•</span>
          <a href="/dashboard" className="text-teal-300 hover:text-teal-200 transition-colors">Dashboard</a>
        </div>
      </div>
    </div>
  );
}