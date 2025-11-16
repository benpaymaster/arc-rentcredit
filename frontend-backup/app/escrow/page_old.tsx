'use client';'use client';



import React, { useState, useEffect } from 'react';import React, { useState, useEffect } from 'react';

import Navigation from '../../components/Navigation';import Navigation from '../../components/Navigation';



export default function EscrowPage() {export default function EscrowPage() {

  const [fromChain, setFromChain] = useState('Arc Testnet');  const [fromChain, setFromChain] = useState('Arc Testnet');

  const [toChain, setToChain] = useState('Ethereum');  const [toChain, setToChain] = useState('Ethereum');

  const [amount, setAmount] = useState('2000.00');  const [amount, setAmount] = useState('2000.00');

  const [duration, setDuration] = useState('12');  const [duration, setDuration] = useState('12');

  const [landlordAddress, setLandlordAddress] = useState('0x742d35Cc60aB216dB3c65f094ea5C5e9c9c8E3B8');  const [landlordAddress, setLandlordAddress] = useState('0x742d35Cc60aB216dB3c65f094ea5C5e9c9c8E3B8');

  const [isConnected, setIsConnected] = useState(false);  const [isConnected, setIsConnected] = useState(false);

  const [isLoading, setIsLoading] = useState(false);  const [isLoading, setIsLoading] = useState(false);

  const [status, setStatus] = useState<Array<{message: string, type: 'pending' | 'active' | 'success' | 'error'}>>([  const [status, setStatus] = useState<Array<{message: string, type: 'pending' | 'active' | 'success' | 'error'}>>([

    { message: 'Waiting for wallet connection...', type: 'pending' }    { message: 'Waiting for wallet connection...', type: 'pending' }

  ]);  ]);

  const [userAddress] = useState("0xMockTenantAddressForEscrowTesting");  const [userAddress] = useState("0xMockTenantAddressForEscrowTesting");



  const chains = {  const chains = {

    'Arc Testnet': { name: 'Arc Testnet', icon: '⚡' },    'Arc Testnet': { name: 'Arc Testnet', icon: '⚡' },

    'Ethereum': { name: 'Ethereum Mainnet', icon: 'Ξ' },    'Ethereum': { name: 'Ethereum Mainnet', icon: 'Ξ' },

    'Polygon': { name: 'Polygon PoS', icon: '⬢' },    'Polygon': { name: 'Polygon PoS', icon: '⬢' },

    'Avalanche': { name: 'Avalanche C-Chain', icon: '❄️' },    'Avalanche': { name: 'Avalanche C-Chain', icon: '❄️' },

    'Base': { name: 'Base', icon: '🅱️' },    'Base': { name: 'Base', icon: '🅱️' },

  };  };



  const durations = {  const durations = {

    '6': '6 months',    '6': '6 months',

    '12': '12 months',    '12': '12 months',

    '18': '18 months',    '18': '18 months',

    '24': '24 months'    '24': '24 months'

  };  };



  // Auto-connect wallet on load  // Auto-connect wallet on load

  useEffect(() => {  useEffect(() => {

    mockConnectWallet();    mockConnectWallet();

  }, []);  }, []);



  const mockConnectWallet = () => {  const mockConnectWallet = () => {

    setStatus([{ message: 'Connecting to wallet...', type: 'active' }]);    setStatus([{ message: 'Connecting to wallet...', type: 'active' }]);

    setTimeout(() => {    setTimeout(() => {

      setIsConnected(true);      setIsConnected(true);

      setStatus([      setStatus([

        { message: `Wallet connected: ${userAddress.substring(0, 10)}...`, type: 'success' },        { message: `Wallet connected: ${userAddress.substring(0, 10)}...`, type: 'success' },

        { message: 'Ready to create rental escrow!', type: 'pending' }        { message: 'Ready to create rental escrow!', type: 'pending' }

      ]);      ]);

    }, 1000);    }, 1000);

  };  };



  const swapChainsIfEqual = (newFrom?: string, newTo?: string) => {  const swapChainsIfEqual = (newFrom?: string, newTo?: string) => {

    const currentFrom = newFrom || fromChain;    const currentFrom = newFrom || fromChain;

    const currentTo = newTo || toChain;    const currentTo = newTo || toChain;

        

    if (currentFrom === currentTo) {    if (currentFrom === currentTo) {

      if (currentFrom === 'Arc Testnet') {      if (currentFrom === 'Arc Testnet') {

        setToChain('Ethereum');        setToChain('Ethereum');

      } else {      } else {

        setToChain('Arc Testnet');        setToChain('Arc Testnet');

      }      }

    }    }

  };  };



  const handleFromChainChange = (value: string) => {  const handleFromChainChange = (value: string) => {

    setFromChain(value);    setFromChain(value);

    swapChainsIfEqual(value, toChain);    swapChainsIfEqual(value, toChain);

  };  };



  const handleToChainChange = (value: string) => {  const handleToChainChange = (value: string) => {

    setToChain(value);    setToChain(value);

    swapChainsIfEqual(fromChain, value);    swapChainsIfEqual(fromChain, value);

  };  };



  const manualSwap = () => {  const manualSwap = () => {

    const temp = fromChain;    const temp = fromChain;

    setFromChain(toChain);    setFromChain(toChain);

    setToChain(temp);    setToChain(temp);

  };  };



  const updateStatus = (message: string, statusIndex: number, type: 'pending' | 'active' | 'success' | 'error' = 'pending') => {  const updateStatus = (message: string, statusIndex: number, type: 'pending' | 'active' | 'success' | 'error' = 'pending') => {

    setStatus(prev => {    setStatus(prev => {

      const newStatus = [...prev];      const newStatus = [...prev];

      if (newStatus[statusIndex]) {      if (newStatus[statusIndex]) {

        newStatus[statusIndex] = { message, type };        newStatus[statusIndex] = { message, type };

      } else {      } else {

        newStatus.push({ message, type });        newStatus.push({ message, type });

      }      }

      return newStatus;      return newStatus;

    });    });

  };  };



  const mockEscrowStep = (stepIndex: number, message: string, duration = 3000): Promise<void> => {  const mockEscrowStep = (stepIndex: number, message: string, duration = 3000): Promise<void> => {

    return new Promise(resolve => {    return new Promise(resolve => {

      updateStatus(message, stepIndex, 'active');      updateStatus(message, stepIndex, 'active');

      setTimeout(() => {      setTimeout(() => {

        updateStatus(message.replace('...', '... Complete!'), stepIndex, 'success');        updateStatus(message.replace('...', '... Complete!'), stepIndex, 'success');

        resolve();        resolve();

      }, duration + (Math.random() * 1000));      }, duration + (Math.random() * 1000));

    });    });

  };  };



  const createEscrow = async () => {  const createEscrow = async () => {

    if (!isConnected) {    if (!isConnected) {

      updateStatus("Please connect your wallet first.", 0, 'error');      updateStatus("Please connect your wallet first.", 0, 'error');

      return;      return;

    }    }



    const amountNum = parseFloat(amount);    const amountNum = parseFloat(amount);

    if (amountNum <= 0 || isNaN(amountNum)) {    if (amountNum <= 0 || isNaN(amountNum)) {

      updateStatus("Please enter a valid rental amount.", 1, 'error');      updateStatus("Please enter a valid rental amount.", 1, 'error');

      return;      return;

    }    }



    if (!landlordAddress || landlordAddress.length !== 42) {    if (!landlordAddress || landlordAddress.length !== 42) {

      updateStatus("Please enter a valid landlord address.", 1, 'error');      updateStatus("Please enter a valid landlord address.", 1, 'error');

      return;      return;

    }    }



    setIsLoading(true);    setIsLoading(true);

    setStatus([]);    setStatus([]);

    let step = 0;    let step = 0;



    const logStep = (message: string, type: 'pending' | 'active' | 'success' | 'error' = 'active') => updateStatus(message, step++, type);    const logStep = (message: string, type: 'pending' | 'active' | 'success' | 'error' = 'active') => updateStatus(message, step++, type);



    logStep(`Creating rental escrow for ${amountNum.toFixed(2)} USDC on ${fromChain}...`, 'active');    logStep(`Creating rental escrow for ${amountNum.toFixed(2)} USDC on ${fromChain}...`, 'active');



    try {    try {

      await mockEscrowStep(step++, `1. Approving USDC on ${fromChain} (User Wallet Action Required)...`);      await mockEscrowStep(step++, `1. Approving USDC on ${fromChain} (User Wallet Action Required)...`);

      await mockEscrowStep(step++, `2. Depositing ${amountNum.toFixed(2)} USDC into escrow contract...`);      await mockEscrowStep(step++, `2. Depositing ${amountNum.toFixed(2)} USDC into escrow contract...`);

      await mockEscrowStep(step++, `3. Setting up rental parameters (${duration} months)...`);      await mockEscrowStep(step++, `3. Setting up rental parameters (${duration} months)...`);

      await mockEscrowStep(step++, `4. Configuring automated payment schedule...`);      await mockEscrowStep(step++, `4. Configuring automated payment schedule...`);

      await mockEscrowStep(step++, `5. Linking to reputation scoring system...`, 2000);      await mockEscrowStep(step++, `5. Linking to reputation scoring system...`, 2000);

            

      logStep(`🏠 Rental escrow created! Escrow ID: #${Math.floor(Math.random() * 10000)}`, 'success');      logStep(`🏠 Rental escrow created! Escrow ID: #${Math.floor(Math.random() * 10000)}`, 'success');



    } catch (error: any) {    } catch (error: any) {

      console.error("Escrow Error:", error);      console.error("Escrow Error:", error);

      logStep(`❌ Escrow Creation Failed: ${error.message || 'Check console for details.'}`, 'error');      logStep(`❌ Escrow Creation Failed: ${error.message || 'Check console for details.'}`, 'error');

    } finally {    } finally {

      setIsLoading(false);      setIsLoading(false);

    }    }

  };  };



  return (  return (

    <>    <>

      <Navigation />      <Navigation />

      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-5 pt-20">      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-5 pt-20">

        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 max-w-[480px] w-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-white">        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 max-w-[480px] w-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-white">

          <h1 className="text-3xl font-bold text-center text-teal-300 mb-2">Create Rental Escrow</h1>          <h1 className="text-3xl font-bold text-center text-teal-300 mb-2">Create Rental Escrow</h1>

          <p className="text-sm text-center text-gray-400 mb-6">Secure rental payments with multi-currency support</p>          <p className="text-sm text-center text-gray-400 mb-6">Secure rental payments with multi-currency support</p>



          {/* Chain Selection */}          {/* Chain Selection */}

          <div className="space-y-6">          <div className="space-y-6">

            {/* Tenant Chain */}            {/* Tenant Chain */}

            <div>            <div>

              <label className="block text-sm font-medium mb-1 text-gray-300">Tenant Network</label>              <label className="block text-sm font-medium mb-1 text-gray-300">Tenant Network</label>

              <div className="relative">              <div className="relative">

                <select                 <select 

                  value={fromChain}                  value={fromChain}

                  onChange={(e) => handleFromChainChange(e.target.value)}                  onChange={(e) => handleFromChainChange(e.target.value)}

                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"

                >                >

                  {Object.entries(chains).map(([key, chain]) => (                  {Object.entries(chains).map(([key, chain]) => (

                    <option key={key} value={key}>{chain.name}</option>                    <option key={key} value={key}>{chain.name}</option>

                  ))}                  ))}

                </select>                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">

                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>

                  </svg>                  </svg>

                </div>                </div>

              </div>              </div>

            </div>            </div>



            {/* Swap Button */}            {/* Swap Button */}

            <div className="flex items-center justify-center -my-2">            <div className="flex items-center justify-center -my-2">

              <button               <button 

                onClick={manualSwap}                onClick={manualSwap}

                className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"                className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"

                title="Swap Tenant and Landlord Networks"                title="Swap Tenant and Landlord Networks"

              >              >

                <svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">                <svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>

                </svg>                </svg>

              </button>              </button>

            </div>            </div>



            {/* Landlord Chain */}            {/* Landlord Chain */}

            <div>            <div>

              <label className="block text-sm font-medium mb-1 text-gray-300">Landlord Network</label>              <label className="block text-sm font-medium mb-1 text-gray-300">Landlord Network</label>

              <div className="relative">              <div className="relative">

                <select                 <select 

                  value={toChain}                  value={toChain}

                  onChange={(e) => handleToChainChange(e.target.value)}                  onChange={(e) => handleToChainChange(e.target.value)}

                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"

                >                >

                  {Object.entries(chains).map(([key, chain]) => (                  {Object.entries(chains).map(([key, chain]) => (

                    <option key={key} value={key}>{chain.name}</option>                    <option key={key} value={key}>{chain.name}</option>

                  ))}                  ))}

                </select>                </select>

                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">

                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>

                  </svg>                  </svg>

                </div>                </div>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          {/* Rental Amount */}          {/* Rental Amount */}

          <div className="mt-6">          <div className="mt-6">

            <label className="block text-sm font-medium mb-1 text-gray-300">Monthly Rent (USDC)</label>            <label className="block text-sm font-medium mb-1 text-gray-300">Monthly Rent (USDC)</label>

            <div className="relative">            <div className="relative">

              <input               <input 

                type="number"                type="number"

                value={amount}                value={amount}

                onChange={(e) => setAmount(e.target.value)}                onChange={(e) => setAmount(e.target.value)}

                step="0.01"                step="0.01"

                min="100"                min="100"

                className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-lg focus:ring-teal-500 focus:border-teal-500 text-white"                className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-lg focus:ring-teal-500 focus:border-teal-500 text-white"

                placeholder="2000.00"                placeholder="2000.00"

              />              />

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">

                <span className="text-gray-400 font-semibold">USDC</span>                <span className="text-gray-400 font-semibold">USDC</span>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          {/* Lease Duration */}          {/* Lease Duration */}

          <div className="mt-6">          <div className="mt-6">

            <label className="block text-sm font-medium mb-1 text-gray-300">Lease Duration</label>            <label className="block text-sm font-medium mb-1 text-gray-300">Lease Duration</label>

            <div className="relative">            <div className="relative">

              <select               <select 

                value={duration}                value={duration}

                onChange={(e) => setDuration(e.target.value)}                onChange={(e) => setDuration(e.target.value)}

                className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"                className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"

              >              >

                {Object.entries(durations).map(([key, label]) => (                {Object.entries(durations).map(([key, label]) => (

                  <option key={key} value={key}>{label}</option>                  <option key={key} value={key}>{label}</option>

                ))}                ))}

              </select>              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">

                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>

                </svg>                </svg>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          {/* Landlord Address */}          {/* Landlord Address */}

          <div className="mt-6">          <div className="mt-6">

            <label className="block text-sm font-medium mb-1 text-gray-300">Landlord Address</label>            <label className="block text-sm font-medium mb-1 text-gray-300">Landlord Address</label>

            <input             <input 

              type="text"              type="text"

              value={landlordAddress}              value={landlordAddress}

              onChange={(e) => setLandlordAddress(e.target.value)}              onChange={(e) => setLandlordAddress(e.target.value)}

              className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg text-lg focus:ring-teal-500 focus:border-teal-500 text-white font-mono text-sm"              className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg text-lg focus:ring-teal-500 focus:border-teal-500 text-white font-mono text-sm"

              placeholder="0x..."              placeholder="0x..."

            />            />

            <p className="text-xs mt-1 text-gray-500">Address where rental payments will be sent</p>            <p className="text-xs mt-1 text-gray-500">Address where rental payments will be sent</p>

          </div>          </div>



          {/* Create Escrow Button */}          {/* Create Escrow Button */}

          <button           <button 

            onClick={createEscrow}            onClick={createEscrow}

            disabled={!isConnected || isLoading}            disabled={!isConnected || isLoading}

            className="mt-6 w-full p-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"            className="mt-6 w-full p-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"

            style={{backgroundColor: '#2e8b57'}}            style={{backgroundColor: '#2e8b57'}}

            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3cb371')}            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3cb371')}

            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2e8b57')}            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2e8b57')}

          >          >

            <span>            <span>

              {isConnected ? (isLoading ? "Creating Escrow..." : "Create Rental Escrow") : "Connect Wallet to Create"}              {isConnected ? (isLoading ? "Creating Escrow..." : "Create Rental Escrow") : "Connect Wallet to Create"}

            </span>            </span>

            {isLoading && (            {isLoading && (

              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

              </svg>              </svg>

            )}            )}

          </button>          </button>



          {/* Status / Feedback Box */}          {/* Status / Feedback Box */}

          <div className="mt-6 p-4 rounded-lg bg-gray-700 text-sm text-gray-200 min-h-[100px] transition-all duration-300">          <div className="mt-6 p-4 rounded-lg bg-gray-700 text-sm text-gray-200 min-h-[100px] transition-all duration-300">

            <p className="font-semibold mb-1">Escrow Status:</p>            <p className="font-semibold mb-1">Escrow Status:</p>

            <ul className="space-y-2">            <ul className="space-y-2">

              {status.map((item, index) => (              {status.map((item, index) => (

                <li key={index} className="flex items-center">                <li key={index} className="flex items-center">

                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${

                    item.type === 'success' ? 'bg-green-500' :                    item.type === 'success' ? 'bg-green-500' :

                    item.type === 'error' ? 'bg-red-500' :                    item.type === 'error' ? 'bg-red-500' :

                    item.type === 'active' ? 'bg-yellow-500 animate-pulse' :                    item.type === 'active' ? 'bg-yellow-500 animate-pulse' :

                    'bg-gray-500'                    'bg-gray-500'

                  }`}></span>                  }`}></span>

                  {item.message}                  {item.message}

                </li>                </li>

              ))}              ))}

            </ul>            </ul>

          </div>          </div>



          {/* Additional Info */}          {/* Additional Info */}

          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-xs text-gray-400">          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-xs text-gray-400">

            <p className="font-semibold mb-1">🔒 Security Features:</p>            <p className="font-semibold mb-1">🔒 Security Features:</p>

            <ul className="space-y-1">            <ul className="space-y-1">

              <li>• Automated monthly payments</li>              <li>• Automated monthly payments</li>

              <li>• Dispute resolution system</li>              <li>• Dispute resolution system</li>

              <li>• Reputation scoring integration</li>              <li>• Reputation scoring integration</li>

              <li>• Cross-chain compatibility</li>              <li>• Cross-chain compatibility</li>

            </ul>            </ul>

          </div>          </div>

        </div>        </div>

      </div>      </div>

    </>    </>

  );  );

}}

export default function EscrowPage() {
  const [formData, setFormData] = useState({
    landlordAddress: '',
    depositAmount: '5000',
    rentAmount: '2000',
    duration: '12',
    damageThreshold: '500',
    requireInspection: true,
    requireTenantConfirmation: true,
    autoRelease: false,
    earlyTermination: false
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [escrowId, setEscrowId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate escrow creation
    setTimeout(() => {
      setEscrowId('ESC-' + Date.now().toString().slice(-6));
      setIsCreating(false);
      setIsComplete(true);
    }, 2500);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-full text-gray-300 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            Programmable Escrow • Smart Contracts • Automated Releases
            <Home className="w-4 h-4 text-blue-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Rental <span className="arc-gradient-text">Escrow</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Set up a programmable USDC escrow for your rental deposit with automated conditions and smart contract protection
          </p>
        </div>

        {!isComplete ? (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Basic Information */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Rental Details</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Landlord Wallet Address
                      </label>
                      <input
                        type="text"
                        value={formData.landlordAddress}
                        onChange={(e) => updateFormData('landlordAddress', e.target.value)}
                        placeholder="0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Property Address (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="123 Student St, Boston, MA"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Terms */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-bold text-white">Financial Terms</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Security Deposit (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.depositAmount}
                          onChange={(e) => updateFormData('depositAmount', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-green-500 focus:outline-none"
                          required
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Monthly Rent (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.rentAmount}
                          onChange={(e) => updateFormData('rentAmount', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-green-500 focus:outline-none"
                          required
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Damage Threshold (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.damageThreshold}
                          onChange={(e) => updateFormData('damageThreshold', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-yellow-500 focus:outline-none"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lease Terms */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Lease Duration</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Duration (Months)
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => updateFormData('duration', e.target.value)}
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="18">18 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Smart Contract Conditions */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-teal-400" />
                    <h3 className="text-xl font-bold text-white">Automation Settings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'requireInspection', label: 'Require Property Inspection', desc: 'Landlord must complete inspection before deposit release' },
                      { key: 'requireTenantConfirmation', label: 'Require Tenant Confirmation', desc: 'Tenant must confirm move-out before automated release' },
                      { key: 'autoRelease', label: 'Auto-Release Monthly Rent', desc: 'Automatically release rent payments on schedule' },
                      { key: 'earlyTermination', label: 'Allow Early Termination', desc: 'Permit early lease termination with penalty' }
                    ].map((option) => (
                      <div key={option.key} className="flex items-start gap-4 p-4 bg-[#24292e] border border-[#30363d] rounded-xl">
                        <input
                          type="checkbox"
                          checked={formData[option.key as keyof typeof formData] as boolean}
                          onChange={(e) => updateFormData(option.key, e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-[#30363d] text-teal-500 focus:ring-teal-500 focus:ring-2"
                        />
                        <div>
                          <div className="text-white font-semibold">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-white mb-4">Escrow Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Security Deposit:</span>
                      <span className="text-white font-semibold">${formData.depositAmount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Rent:</span>
                      <span className="text-white font-semibold">${formData.rentAmount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Duration:</span>
                      <span className="text-white font-semibold">{formData.duration} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Damage Threshold:</span>
                      <span className="text-yellow-300 font-semibold">${formData.damageThreshold} USDC</span>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-300">Total Escrow:</span>
                        <span className="text-teal-300 font-bold">
                          ${(parseInt(formData.depositAmount) + parseInt(formData.rentAmount) * parseInt(formData.duration)).toLocaleString()} USDC
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#24292e] border border-[#30363d] rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div className="text-xs text-gray-400">
                        Smart contract will hold funds in escrow and automatically execute releases based on programmed conditions.
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreating || !formData.landlordAddress || !formData.depositAmount}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating Escrow...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Create Escrow
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Escrow Created Successfully!</h2>
              <p className="text-lg text-gray-300 mb-8">
                Your rental escrow has been deployed to the Arc blockchain with smart contract protection.
              </p>
              
              <div className="bg-[#24292e] border border-[#30363d] rounded-xl p-6 mb-8">
                <div className="text-sm text-gray-400 mb-2">Escrow Contract ID</div>
                <div className="text-xl font-mono text-teal-300 font-bold">{escrowId}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-green-500 transition-all flex items-center gap-3 justify-center"
                >
                  <FileCheck className="w-5 h-5" />
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <button
                  onClick={() => {
                    setIsComplete(false);
                    setFormData({
                      landlordAddress: '',
                      depositAmount: '5000',
                      rentAmount: '2000',
                      duration: '12',
                      damageThreshold: '500',
                      requireInspection: true,
                      requireTenantConfirmation: true,
                      autoRelease: false,
                      earlyTermination: false
                    });
                  }}
                  className="px-8 py-4 bg-[#161b22] border border-[#30363d] text-gray-200 rounded-xl font-semibold hover:bg-[#24292e] transition-all"
                >
                  Create Another Escrow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}