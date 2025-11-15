"use client";"use client";"use client";"use client";"use client";



import { useState } from 'react';

import { 

  Building2, import { useState } from 'react';

  DollarSign, 

  TrendingUp, import { 

  Clock,

  Wallet,   Building2, import { useState } from 'react';

  CheckCircle,

  AlertCircle,  DollarSign, 

  Eye,

  Settings,  TrendingUp, import { 

  User,

  CreditCard,  Clock,

  Shield,

  Star  Wallet,  Building2, import { useState } from 'react';import { useState } from 'react';

} from 'lucide-react';

  CheckCircle,

export default function LandlordDashboard() {

  const [selectedEscrow, setSelectedEscrow] = useState<string | null>(null);  AlertTriangle,  DollarSign, 



  // Mock data for demonstration  Settings,

  const escrows = [

    {  MapPin,  Clock, import { import { 

      id: 'ESC-001',

      tenant: '0x742d35Cc...4e5B74e',  Calendar,

      property: 'Boston Studio Apartment',

      depositAmount: 2500,  PlayCircle,  TrendingUp, 

      rentAmount: 1200,

      status: 'Active',  PauseCircle,

      startDate: '2024-01-15',

      endDate: '2024-12-15',  Shield,  Shield,   Building2,   Building2, 

      reputationScore: 780,

      currency: 'USDC'  Eye,

    },

    {  Target,  Users, 

      id: 'ESC-002', 

      tenant: '0x8ba1f109...7c36265E',  Users,

      property: 'NYC 1BR Apartment',

      depositAmount: 3500,  Globe,  AlertTriangle,   DollarSign,   DollarSign, 

      rentAmount: 2100,

      status: 'TenantReleased',  ExternalLink,

      startDate: '2024-02-01',

      endDate: '2025-01-31',  ArrowUpRight  CheckCircle,

      reputationScore: 695,

      currency: 'USDC'} from 'lucide-react';

    },

    {  Eye,  Clock,   Clock, 

      id: 'ESC-003',

      tenant: '0x3f5CE5FB...B5F4F2A8',export default function LandlordDashboard() {

      property: 'SF Shared Room',

      depositAmount: 1800,  const [activeEscrows] = useState([  Settings,

      rentAmount: 950,

      status: 'Disputed',    {

      startDate: '2024-03-01',

      endDate: '2024-08-31',      id: "ESC-001",  ArrowUpRight,  TrendingUp,   TrendingUp, 

      reputationScore: 620,

      currency: 'EURC'      tenant: "Sara Chen",

    }

  ];      property: "123 Harvard St",  Wallet,



  const totalLocked = escrows.reduce((sum, escrow) => sum + escrow.depositAmount + escrow.rentAmount, 0);      deposit: 5000,

  const activeEscrows = escrows.filter(e => e.status === 'Active').length;

      monthlyRent: 2500,  Target,  Shield,   Shield, 

  const getStatusColor = (status: string) => {

    switch (status) {      status: "active",

      case 'Active': return 'bg-green-100 text-green-700';

      case 'TenantReleased': return 'bg-blue-100 text-blue-700';      nextPayment: "2025-12-15",  Activity,

      case 'Disputed': return 'bg-red-100 text-red-700';

      case 'LandlordReleased': return 'bg-gray-100 text-gray-700';      automation: { autoRelease: true, inspectionRequired: true, gracePeriod: 3 }

      default: return 'bg-gray-100 text-gray-700';

    }    },  Globe,  Users,   Users, 

  };

    {

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">      id: "ESC-002",   ChevronDown,

      {/* Background Effects */}

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>      tenant: "Mike Johnson",

      <div className="absolute top-0 left-0 w-full h-full">

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>      property: "456 MIT Ave",  ExternalLink,  AlertTriangle,   AlertTriangle, 

        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      </div>      deposit: 4500,



      <div className="relative z-10 p-6">      monthlyRent: 2200,  PlayCircle,

        <div className="max-w-7xl mx-auto">

                status: "pending_inspection",

          {/* Header */}

          <div className="mb-8">      nextPayment: "2025-12-10",  PauseCircle,  CheckCircle,  CheckCircle,

            <h1 className="text-4xl font-bold text-white mb-2">Landlord Dashboard</h1>

            <p className="text-white/70">Manage your rental escrows and tenant relationships</p>      automation: { autoRelease: false, inspectionRequired: true, gracePeriod: 5 }

          </div>

    }  MapPin,

          {/* Stats Cards */}

          <div className="grid md:grid-cols-4 gap-6 mb-8">  ]);

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">

              <div className="flex items-center justify-between">  Calendar  Eye,  Eye,

                <div>

                  <p className="text-white/70 text-sm">Total Value Locked</p>  const stats = {

                  <p className="text-2xl font-bold text-white">${totalLocked.toLocaleString()}</p>

                </div>    totalDeposited: 47500,} from 'lucide-react';

                <Wallet className="w-8 h-8 text-blue-400" />

              </div>    yieldEarned: 1247,

            </div>

    pendingRelease: 12500,  Settings,  Settings,

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">

              <div className="flex items-center justify-between">    available: 35000

                <div>

                  <p className="text-white/70 text-sm">Active Escrows</p>  };export default function LandlordDashboard() {

                  <p className="text-2xl font-bold text-white">{activeEscrows}</p>

                </div>

                <Shield className="w-8 h-8 text-green-400" />

              </div>  const getStatusColor = (status: string) => {  const [activeEscrows] = useState([  ArrowUpRight,  ArrowUpRight,

            </div>

    switch (status) {

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">

              <div className="flex items-center justify-between">      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';    {

                <div>

                  <p className="text-white/70 text-sm">Properties</p>      case 'pending_inspection': return 'bg-amber-100 text-amber-700 border-amber-200';

                  <p className="text-2xl font-bold text-white">3</p>

                </div>      case 'disputed': return 'bg-red-100 text-red-700 border-red-200';      id: "ESC-001",  Wallet,  Wallet,

                <Building2 className="w-8 h-8 text-purple-400" />

              </div>      default: return 'bg-gray-100 text-gray-700 border-gray-200';

            </div>

    }      tenant: "Sara Chen",

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">

              <div className="flex items-center justify-between">  };

                <div>

                  <p className="text-white/70 text-sm">Monthly Revenue</p>      property: "123 Harvard St",  Target,  Target,

                  <p className="text-2xl font-bold text-white">$4,250</p>

                </div>  return (

                <TrendingUp className="w-8 h-8 text-pink-400" />

              </div>    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">      deposit: 5000,

            </div>

          </div>      {/* Header */}



          {/* Escrows List */}      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">      monthlyRent: 2500,  Activity,  Activity,

          <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10">

            <div className="p-6 border-b border-white/10">        <div className="max-w-7xl mx-auto px-6 py-4">

              <h2 className="text-2xl font-bold text-white flex items-center gap-3">

                <CreditCard className="w-6 h-6 text-blue-400" />          <div className="flex items-center justify-between">      status: "active",

                Active Rental Escrows

              </h2>            <div>

            </div>

              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">      nextPayment: "2025-12-15",  Globe,  Globe,

            <div className="p-6">

              <div className="space-y-4">                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">

                {escrows.map((escrow) => (

                  <div                   <Building2 className="w-5 h-5 text-white" />      automation: { autoRelease: true, inspectionRequired: true, gracePeriod: 3 }

                    key={escrow.id}

                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"                </div>

                  >

                    <div className="flex items-center justify-between mb-4">                Landlord Dashboard    },  ExternalLink,  ChevronDown,

                      <div className="flex items-center gap-4">

                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">              </h1>

                          <Building2 className="w-6 h-6 text-white" />

                        </div>              <p className="text-slate-600 mt-1">Manage properties with programmable USDC escrows on Arc</p>    {

                        <div>

                          <h3 className="text-lg font-semibold text-white">{escrow.property}</h3>            </div>

                          <p className="text-white/60 text-sm">Escrow ID: {escrow.id}</p>

                        </div>            <div className="flex items-center gap-3">      id: "ESC-002",   Plus  ExternalLink

                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(escrow.status)}`}>              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">

                        {escrow.status}

                      </div>                <Settings className="w-4 h-4" />      tenant: "Mike Johnson",

                    </div>

                Settings

                    <div className="grid md:grid-cols-4 gap-4">

                      <div>              </button>      property: "456 MIT Ave",} from 'lucide-react';} from 'lucide-react';

                        <p className="text-white/60 text-xs mb-1">Tenant</p>

                        <p className="text-white text-sm font-mono">{escrow.tenant}</p>            </div>

                        <div className="flex items-center gap-1 mt-1">

                          <Star className="w-3 h-3 text-yellow-400" />          </div>      deposit: 4500,

                          <span className="text-yellow-300 text-xs">{escrow.reputationScore}</span>

                        </div>        </div>

                      </div>

                            </div>      monthlyRent: 2200,import { ARC_CONTRACTS } from '@/lib/addresses';import { ARC_CONTRACTS, DEMO_DATA } from '@/lib/addresses';

                      <div>

                        <p className="text-white/60 text-xs mb-1">Deposit</p>

                        <p className="text-white text-sm font-semibold">

                          {escrow.depositAmount.toLocaleString()} {escrow.currency}      <div className="max-w-7xl mx-auto px-6 py-8">      status: "pending_inspection",

                        </p>

                      </div>        {/* Stats Cards */}

                      

                      <div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">      nextPayment: "2025-12-10",

                        <p className="text-white/60 text-xs mb-1">Monthly Rent</p>

                        <p className="text-white text-sm font-semibold">          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

                          {escrow.rentAmount.toLocaleString()} {escrow.currency}

                        </p>            <div className="flex items-center justify-between mb-4">      automation: { autoRelease: false, inspectionRequired: true, gracePeriod: 5 }

                      </div>

                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">

                      <div>

                        <p className="text-white/60 text-xs mb-1">Lease Period</p>                <Wallet className="w-6 h-6 text-white" />    }export default function LandlordDashboard() {export default function LandlordDashboard() {

                        <p className="text-white text-sm">{escrow.startDate}</p>

                        <p className="text-white/60 text-xs">to {escrow.endDate}</p>              </div>

                      </div>

                    </div>              <TrendingUp className="w-5 h-5 text-emerald-500" />  ]);



                    <div className="flex gap-3 mt-6">            </div>

                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">

                        <Eye className="w-4 h-4" />            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Deposited</h3>  const [activeEscrows] = useState([  const [activeEscrows] = useState([

                        View Details

                      </button>            <p className="text-3xl font-bold text-slate-800">${stats.totalDeposited.toLocaleString()}</p>

                      

                      {escrow.status === 'TenantReleased' && (            <p className="text-sm text-emerald-600 mt-2">+12.5% this month</p>  const stats = {

                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">

                          <CheckCircle className="w-4 h-4" />          </div>

                          Release Deposit

                        </button>    totalDeposited: 47500,    {    {

                      )}

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

                      {escrow.status === 'Disputed' && (

                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">            <div className="flex items-center justify-between mb-4">    yieldEarned: 1247,

                          <AlertCircle className="w-4 h-4" />

                          Manage Dispute              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">

                        </button>

                      )}                <TrendingUp className="w-6 h-6 text-white" />    pendingRelease: 12500,      id: "ESC-001",      id: "ESC-001",



                      <button className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm font-medium border border-white/20 hover:bg-white/20 transition-all">              </div>

                        <Settings className="w-4 h-4" />

                        Settings              <ArrowUpRight className="w-5 h-5 text-emerald-500" />    available: 35000

                      </button>

                    </div>            </div>

                  </div>

                ))}            <h3 className="text-sm font-medium text-slate-600 mb-1">Yield Earned</h3>  };      tenant: "Sara Chen",      tenant: "Sara Chen",

              </div>

            </div>            <p className="text-3xl font-bold text-slate-800">${stats.yieldEarned.toLocaleString()}</p>

          </div>

            <p className="text-sm text-emerald-600 mt-2">5.2% APY</p>

          {/* Quick Actions */}

          <div className="mt-8 grid md:grid-cols-3 gap-6">          </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">

              <User className="w-12 h-12 text-blue-400 mx-auto mb-4" />  const getStatusColor = (status: string) => {      property: "123 Harvard St",      property: "123 Harvard St",

              <h3 className="text-lg font-semibold text-white mb-2">Tenant Verification</h3>

              <p className="text-white/60 text-sm mb-4">Review and verify new tenant applications</p>          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium">

                View Applications            <div className="flex items-center justify-between mb-4">    switch (status) {

              </button>

            </div>              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">



            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">                <Clock className="w-6 h-6 text-white" />      case 'active': return 'bg-emerald-100 text-emerald-700 border-emerald-200';      deposit: 5000,      deposit: 5000,

              <Building2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />

              <h3 className="text-lg font-semibold text-white mb-2">Property Management</h3>              </div>

              <p className="text-white/60 text-sm mb-4">Add new properties and manage listings</p>

              <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-medium">              <AlertTriangle className="w-5 h-5 text-amber-500" />      case 'pending_inspection': return 'bg-amber-100 text-amber-700 border-amber-200';

                Manage Properties

              </button>            </div>

            </div>

            <h3 className="text-sm font-medium text-slate-600 mb-1">Pending Release</h3>      case 'disputed': return 'bg-red-100 text-red-700 border-red-200';      monthlyRent: 2500,      monthlyRent: 2500,

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">

              <TrendingUp className="w-12 h-12 text-pink-400 mx-auto mb-4" />            <p className="text-3xl font-bold text-slate-800">${stats.pendingRelease.toLocaleString()}</p>

              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>

              <p className="text-white/60 text-sm mb-4">View detailed revenue and performance metrics</p>            <p className="text-sm text-amber-600 mt-2">2 escrows pending</p>      default: return 'bg-gray-100 text-gray-700 border-gray-200';

              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl text-sm font-medium">

                View Analytics          </div>

              </button>

            </div>    }      status: "active",      status: "active",

          </div>

        </div>          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

      </div>

    </div>            <div className="flex items-center justify-between mb-4">  };

  );

}              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">

                <DollarSign className="w-6 h-6 text-white" />      nextPayment: "2025-12-15",      nextPayment: "2025-12-15",

              </div>

              <CheckCircle className="w-5 h-5 text-emerald-500" />  return (

            </div>

            <h3 className="text-sm font-medium text-slate-600 mb-1">Available</h3>    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">      avatar: "👩‍🎓",      automation: {

            <p className="text-3xl font-bold text-slate-800">${stats.available.toLocaleString()}</p>

            <p className="text-sm text-emerald-600 mt-2">Ready to withdraw</p>      {/* Header */}

          </div>

        </div>      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-10">      automation: {        autoRelease: true,



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">        <div className="max-w-7xl mx-auto px-6 py-4">

          {/* Active Escrows */}

          <div className="lg:col-span-2">          <div className="flex items-center justify-between">        autoRelease: true,        inspectionRequired: true,

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">

              <div className="p-6 border-b border-slate-200/50">            <div>

                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">

                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">        inspectionRequired: true,        gracePeriod: 3

                    <Building2 className="w-4 h-4 text-white" />

                  </div>                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">

                  Active Escrows

                </h2>                  <Building2 className="w-5 h-5 text-white" />        gracePeriod: 3      }

              </div>

              <div className="p-6 space-y-6">                </div>

                {activeEscrows.map((escrow) => (

                  <div key={escrow.id} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200/50">                Landlord Dashboard      }    },

                    <div className="flex justify-between items-start mb-4">

                      <div className="flex items-center gap-4">              </h1>

                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">

                          <MapPin className="w-6 h-6 text-blue-600" />              <p className="text-slate-600 mt-1">Manage properties with programmable USDC escrows on Arc</p>    },    {

                        </div>

                        <div>            </div>

                          <h3 className="font-semibold text-slate-800">{escrow.property}</h3>

                          <p className="text-sm text-slate-600">Tenant: {escrow.tenant}</p>            <div className="flex items-center gap-3">    {      id: "ESC-002", 

                          <p className="text-xs text-slate-500">ID: {escrow.id}</p>

                        </div>              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">

                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(escrow.status)}`}>                <Settings className="w-4 h-4" />      id: "ESC-002",       tenant: "Mike Johnson",

                        {escrow.status.replace('_', ' ').toUpperCase()}

                      </span>                Settings

                    </div>

              </button>      tenant: "Mike Johnson",      property: "456 MIT Ave",

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

                      <div className="bg-white rounded-lg p-3">            </div>

                        <p className="text-xs text-slate-600">Deposit</p>

                        <p className="font-bold text-slate-800">${escrow.deposit.toLocaleString()} USDC</p>          </div>      property: "456 MIT Ave",      deposit: 4500,

                      </div>

                      <div className="bg-white rounded-lg p-3">        </div>

                        <p className="text-xs text-slate-600">Monthly Rent</p>

                        <p className="font-bold text-slate-800">${escrow.monthlyRent.toLocaleString()}/month</p>      </div>      deposit: 4500,      monthlyRent: 2200,

                      </div>

                      <div className="bg-white rounded-lg p-3">

                        <p className="text-xs text-slate-600">Next Payment</p>

                        <p className="font-bold text-slate-800 flex items-center gap-1">      <div className="max-w-7xl mx-auto px-6 py-8">      monthlyRent: 2200,      status: "pending_inspection",

                          <Calendar className="w-3 h-3" />

                          {new Date(escrow.nextPayment).toLocaleDateString()}        {/* Stats Cards */}

                        </p>

                      </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">      status: "pending_inspection",      nextPayment: "2025-12-10",

                      <div className="bg-white rounded-lg p-3">

                        <p className="text-xs text-slate-600">Automation</p>          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

                        <div className="flex items-center gap-1">

                          {escrow.automation.autoRelease ?             <div className="flex items-center justify-between mb-4">      nextPayment: "2025-12-10",      automation: {

                            <PlayCircle className="w-4 h-4 text-emerald-500" /> : 

                            <PauseCircle className="w-4 h-4 text-slate-400" />              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">

                          }

                          <span className="text-xs font-medium">                <Wallet className="w-6 h-6 text-white" />      avatar: "👨‍💼",        autoRelease: false,

                            {escrow.automation.autoRelease ? 'ON' : 'OFF'}

                          </span>              </div>

                        </div>

                      </div>              <TrendingUp className="w-5 h-5 text-emerald-500" />      automation: {        inspectionRequired: true,

                    </div>

            </div>

                    <div className="bg-white/60 rounded-lg p-3 mb-4">

                      <h4 className="text-sm font-medium text-slate-700 mb-2">Automation Rules</h4>            <h3 className="text-sm font-medium text-slate-600 mb-1">Total Deposited</h3>        autoRelease: false,        gracePeriod: 5

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">

                        <div className="flex items-center gap-1">            <p className="text-3xl font-bold text-slate-800">${stats.totalDeposited.toLocaleString()}</p>

                          <Shield className="w-3 h-3 text-blue-500" />

                          <span>Auto-release: {escrow.automation.autoRelease ? 'ON' : 'OFF'}</span>            <p className="text-sm text-emerald-600 mt-2">+12.5% this month</p>        inspectionRequired: true,      }

                        </div>

                        <div className="flex items-center gap-1">          </div>

                          <Eye className="w-3 h-3 text-amber-500" />

                          <span>Inspection required</span>        gracePeriod: 5    }

                        </div>

                        <div className="flex items-center gap-1">          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

                          <Clock className="w-3 h-3 text-purple-500" />

                          <span>Grace period: {escrow.automation.gracePeriod} days</span>            <div className="flex items-center justify-between mb-4">      }  ]);

                        </div>

                      </div>              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">

                    </div>

                <TrendingUp className="w-6 h-6 text-white" />    }

                    <div className="flex gap-3">

                      <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">              </div>

                        Release Deposit

                      </button>              <ArrowUpRight className="w-5 h-5 text-emerald-500" />  ]);  const [vaultStats] = useState({

                      <button className="flex-1 bg-white text-slate-700 border border-slate-200 py-2 px-4 rounded-lg hover:bg-slate-50 transition-all duration-200 text-sm font-medium">

                        View Details            </div>

                      </button>

                    </div>            <h3 className="text-sm font-medium text-slate-600 mb-1">Yield Earned</h3>    totalDeposited: 47500,

                  </div>

                ))}            <p className="text-3xl font-bold text-slate-800">${stats.yieldEarned.toLocaleString()}</p>

              </div>

            </div>            <p className="text-sm text-emerald-600 mt-2">5.2% APY</p>  const [vaultStats] = useState({    yieldEarned: 1247,

          </div>

          </div>

          {/* Sidebar */}

          <div className="space-y-6">    totalDeposited: 47500,    pendingRelease: 12500,

            {/* Vault Stats */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">            <div className="flex items-center justify-between mb-4">    yieldEarned: 1247,    availableWithdraw: 35000

                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">

                    <Target className="w-3 h-3 text-white" />              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">

                  </div>

                  ERC4626 Yield Vault                <Clock className="w-6 h-6 text-white" />    pendingRelease: 12500,  });

                </h3>

              </div>              </div>

              <div className="p-6 space-y-4">

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">              <AlertTriangle className="w-5 h-5 text-amber-500" />    availableWithdraw: 35000,

                  <p className="text-sm text-slate-600 mb-1">Total Value Locked (TVL)</p>

                  <p className="text-2xl font-bold text-slate-800">${stats.totalDeposited.toLocaleString()}</p>            </div>

                  <p className="text-sm text-emerald-600">+5.2% APY</p>

                </div>            <h3 className="text-sm font-medium text-slate-600 mb-1">Pending Release</h3>    apy: 5.2,  const [releaseDeposit, setReleaseDeposit] = useState('');

                <div className="grid grid-cols-2 gap-3">

                  <div className="bg-slate-50 rounded-lg p-3">            <p className="text-3xl font-bold text-slate-800">${stats.pendingRelease.toLocaleString()}</p>

                    <p className="text-xs text-slate-600">Yield Earned</p>

                    <p className="font-bold text-slate-800">${stats.yieldEarned}</p>            <p className="text-sm text-amber-600 mt-2">2 escrows pending</p>    utilization: 98.5  

                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">          </div>

                    <p className="text-xs text-slate-600">Utilization</p>

                    <p className="font-bold text-slate-800">98.5%</p>  });  const handleReleaseDeposit = (escrowId: string) => {

                  </div>

                </div>          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg transition-all duration-200">

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">

                  Manage Vault            <div className="flex items-center justify-between mb-4">    setReleaseDeposit(escrowId);

                </button>

              </div>              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">

            </div>

                <DollarSign className="w-6 h-6 text-white" />  const getStatusColor = (status: string) => {    // Simulate deposit release

            {/* Risk Management */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">              </div>

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">              <CheckCircle className="w-5 h-5 text-emerald-500" />    switch (status) {    setTimeout(() => {

                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center">

                    <Shield className="w-3 h-3 text-white" />            </div>

                  </div>

                  Risk Management            <h3 className="text-sm font-medium text-slate-600 mb-1">Available</h3>      case 'active':      setReleaseDeposit('');

                </h3>

              </div>            <p className="text-3xl font-bold text-slate-800">${stats.available.toLocaleString()}</p>

              <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">            <p className="text-sm text-emerald-600 mt-2">Ready to withdraw</p>        return 'bg-emerald-100 text-emerald-700 border-emerald-200';    }, 2000);

                  <span className="text-sm text-slate-600">Risk Score</span>

                  <span className="text-2xl font-bold text-emerald-600">A+</span>          </div>

                </div>

                <div className="flex justify-between items-center">        </div>      case 'pending_inspection':  };

                  <span className="text-sm text-slate-600">Buffer Ratio</span>

                  <span className="font-bold text-slate-800">15%</span>

                </div>

                <div className="bg-red-50 rounded-lg p-3">        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">        return 'bg-amber-100 text-amber-700 border-amber-200';

                  <p className="text-xs text-red-600 mb-1">Risk Buffer</p>

                  <p className="text-sm font-bold text-red-700">$7,125 USDC locked</p>          {/* Active Escrows */}

                  <p className="text-xs text-red-600">for damage protection</p>

                </div>          <div className="lg:col-span-2">      case 'completed':  return (

                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">

                  Adjust Risk Parameters            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">

                </button>

              </div>              <div className="p-6 border-b border-slate-200/50">        return 'bg-blue-100 text-blue-700 border-blue-200';    <div className="min-h-screen bg-gray-50 p-4">

            </div>

                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">

            {/* Tenant Analytics */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">      default:      <div className="max-w-7xl mx-auto">

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">                    <Building2 className="w-4 h-4 text-white" />

                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md flex items-center justify-center">

                    <Users className="w-3 h-3 text-white" />                  </div>        return 'bg-gray-100 text-gray-700 border-gray-200';        

                  </div>

                  Tenant Analytics                  Active Escrows

                </h3>

              </div>                </h2>    }        {/* Header */}

              <div className="p-6 space-y-4">

                <div className="grid grid-cols-3 gap-3">              </div>

                  <div className="text-center">

                    <p className="text-xl font-bold text-slate-800">847</p>              <div className="p-6 space-y-6">  };        <div className="mb-8">

                    <p className="text-xs text-slate-600">Avg Score</p>

                  </div>                {activeEscrows.map((escrow) => (

                  <div className="text-center">

                    <p className="text-xl font-bold text-emerald-600">98%</p>                  <div key={escrow.id} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200/50">          <h1 className="text-3xl font-bold text-gray-900 mb-2">

                    <p className="text-xs text-slate-600">Success Rate</p>

                  </div>                    <div className="flex justify-between items-start mb-4">

                  <div className="text-center">

                    <p className="text-xl font-bold text-blue-600">12</p>                      <div className="flex items-center gap-4">  const getStatusIcon = (status: string) => {            Landlord Dashboard

                    <p className="text-xs text-slate-600">Countries</p>

                  </div>                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">

                </div>

                <div className="bg-blue-50 rounded-lg p-3">                          <MapPin className="w-6 h-6 text-blue-600" />    switch (status) {          </h1>

                  <p className="text-xs text-blue-600 mb-1">Multi-currency bonus</p>

                  <p className="text-sm font-bold text-blue-700">+15% for EURC users</p>                        </div>

                </div>

              </div>                        <div>      case 'active':          <p className="text-gray-600">

            </div>

          </div>                          <h3 className="font-semibold text-slate-800">{escrow.property}</h3>

        </div>

                          <p className="text-sm text-slate-600">Tenant: {escrow.tenant}</p>        return <CheckCircle size={16} className="text-emerald-600" />;            Manage your rental properties with programmable USDC escrows on Arc

        {/* Arc Integration Footer */}

        <div className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white">                          <p className="text-xs text-slate-500">ID: {escrow.id}</p>

          <div className="flex items-center justify-between">

            <div>                        </div>      case 'pending_inspection':          </p>

              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">

                <Globe className="w-5 h-5" />                      </div>

                Arc Integration

              </h3>                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(escrow.status)}`}>        return <Clock size={16} className="text-amber-600" />;        </div>

              <p className="text-blue-100 text-sm">Advanced programmable money features powered by Arc blockchain infrastructure</p>

            </div>                        {escrow.status.replace('_', ' ').toUpperCase()}

            <div className="text-right">

              <p className="text-xs text-blue-200">Main Escrow Contract:</p>                      </span>      default:

              <p className="font-mono text-sm">0x5FC8d32...875707</p>

              <p className="text-xs text-blue-200 mt-1">Network: Arc Testnet (Chain 42161)</p>                    </div>

              <button className="mt-2 bg-white/20 hover:bg-white/30 text-white py-1 px-3 rounded-lg text-xs transition-colors flex items-center gap-1">

                View on Explorer <ExternalLink className="w-3 h-3" />        return <AlertTriangle size={16} className="text-gray-600" />;        {/* Stats Overview */}

              </button>

            </div>                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">

          </div>

        </div>                      <div className="bg-white rounded-lg p-3">    }        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

      </div>

    </div>                        <p className="text-xs text-slate-600">Deposit</p>

  );

}                        <p className="font-bold text-slate-800">${escrow.deposit.toLocaleString()} USDC</p>  };          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                      </div>

                      <div className="bg-white rounded-lg p-3">            <div className="flex items-center">

                        <p className="text-xs text-slate-600">Monthly Rent</p>

                        <p className="font-bold text-slate-800">${escrow.monthlyRent.toLocaleString()}/month</p>  return (              <DollarSign className="text-green-500 mr-3" size={24} />

                      </div>

                      <div className="bg-white rounded-lg p-3">    <div className="space-y-8">              <div>

                        <p className="text-xs text-slate-600">Next Payment</p>

                        <p className="font-bold text-slate-800 flex items-center gap-1">      {/* Header Stats Grid */}                <p className="text-sm text-gray-600">Total Deposited</p>

                          <Calendar className="w-3 h-3" />

                          {new Date(escrow.nextPayment).toLocaleDateString()}      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">                <p className="text-2xl font-bold text-gray-900">${vaultStats.totalDeposited.toLocaleString()}</p>

                        </p>

                      </div>        {/* Total Deposited */}              </div>

                      <div className="bg-white rounded-lg p-3">

                        <p className="text-xs text-slate-600">Automation</p>        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">            </div>

                        <div className="flex items-center gap-1">

                          {escrow.automation.autoRelease ?           <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>          </div>

                            <PlayCircle className="w-4 h-4 text-emerald-500" /> : 

                            <PauseCircle className="w-4 h-4 text-slate-400" />          <div className="relative">

                          }

                          <span className="text-xs font-medium">            <div className="flex items-center justify-between mb-3">          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                            {escrow.automation.autoRelease ? 'ON' : 'OFF'}

                          </span>              <Wallet size={24} className="text-blue-200" />            <div className="flex items-center">

                        </div>

                      </div>              <ArrowUpRight size={16} className="text-blue-200" />              <TrendingUp className="text-blue-500 mr-3" size={24} />

                    </div>

            </div>              <div>

                    <div className="bg-white/60 rounded-lg p-3 mb-4">

                      <h4 className="text-sm font-medium text-slate-700 mb-2">Automation Rules</h4>            <div className="text-2xl font-bold mb-1">${vaultStats.totalDeposited.toLocaleString()}</div>                <p className="text-sm text-gray-600">Yield Earned</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">

                        <div className="flex items-center gap-1">            <div className="text-blue-200 text-sm">Total Deposited</div>                <p className="text-2xl font-bold text-gray-900">${vaultStats.yieldEarned.toLocaleString()}</p>

                          <Shield className="w-3 h-3 text-blue-500" />

                          <span>Auto-release: {escrow.automation.autoRelease ? 'ON' : 'OFF'}</span>          </div>              </div>

                        </div>

                        <div className="flex items-center gap-1">        </div>            </div>

                          <Eye className="w-3 h-3 text-amber-500" />

                          <span>Inspection required</span>          </div>

                        </div>

                        <div className="flex items-center gap-1">        {/* Yield Earned */}

                          <Clock className="w-3 h-3 text-purple-500" />

                          <span>Grace period: {escrow.automation.gracePeriod} days</span>        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                        </div>

                      </div>          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>            <div className="flex items-center">

                    </div>

          <div className="relative">              <Clock className="text-orange-500 mr-3" size={24} />

                    <div className="flex gap-3">

                      <button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">            <div className="flex items-center justify-between mb-3">              <div>

                        Release Deposit

                      </button>              <TrendingUp size={24} className="text-emerald-200" />                <p className="text-sm text-gray-600">Pending Release</p>

                      <button className="flex-1 bg-white text-slate-700 border border-slate-200 py-2 px-4 rounded-lg hover:bg-slate-50 transition-all duration-200 text-sm font-medium">

                        View Details              <span className="text-emerald-200 text-xs bg-white/20 px-2 py-1 rounded-full">+{vaultStats.apy}%</span>                <p className="text-2xl font-bold text-gray-900">${vaultStats.pendingRelease.toLocaleString()}</p>

                      </button>

                    </div>            </div>              </div>

                  </div>

                ))}            <div className="text-2xl font-bold mb-1">${vaultStats.yieldEarned.toLocaleString()}</div>            </div>

              </div>

            </div>            <div className="text-emerald-200 text-sm">Yield Earned</div>          </div>

          </div>

          </div>

          {/* Sidebar */}

          <div className="space-y-6">        </div>          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

            {/* Vault Stats */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">            <div className="flex items-center">

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">        {/* Pending Release */}              <Shield className="text-purple-500 mr-3" size={24} />

                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md flex items-center justify-center">

                    <Target className="w-3 h-3 text-white" />        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">              <div>

                  </div>

                  ERC4626 Yield Vault          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>                <p className="text-sm text-gray-600">Available</p>

                </h3>

              </div>          <div className="relative">                <p className="text-2xl font-bold text-gray-900">${vaultStats.availableWithdraw.toLocaleString()}</p>

              <div className="p-6 space-y-4">

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">            <div className="flex items-center justify-between mb-3">              </div>

                  <p className="text-sm text-slate-600 mb-1">Total Value Locked (TVL)</p>

                  <p className="text-2xl font-bold text-slate-800">${stats.totalDeposited.toLocaleString()}</p>              <Clock size={24} className="text-amber-200" />            </div>

                  <p className="text-sm text-emerald-600">+5.2% APY</p>

                </div>              <Target size={16} className="text-amber-200" />          </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="bg-slate-50 rounded-lg p-3">            </div>        </div>

                    <p className="text-xs text-slate-600">Yield Earned</p>

                    <p className="font-bold text-slate-800">${stats.yieldEarned}</p>            <div className="text-2xl font-bold mb-1">${vaultStats.pendingRelease.toLocaleString()}</div>

                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">            <div className="text-amber-200 text-sm">Pending Release</div>        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    <p className="text-xs text-slate-600">Utilization</p>

                    <p className="font-bold text-slate-800">98.5%</p>          </div>          

                  </div>

                </div>        </div>          {/* Active Escrows */}

                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">

                  Manage Vault          <div className="xl:col-span-2">

                </button>

              </div>        {/* Available */}            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">

            {/* Risk Management */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">          <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mb-10"></div>                <Building2 className="mr-2" size={24} />

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">          <div className="relative">                Active Escrows

                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-md flex items-center justify-center">

                    <Shield className="w-3 h-3 text-white" />            <div className="flex items-center justify-between mb-3">              </h2>

                  </div>

                  Risk Management              <DollarSign size={24} className="text-purple-200" />              

                </h3>

              </div>              <Activity size={16} className="text-purple-200" />              <div className="space-y-4">

              <div className="p-6 space-y-4">

                <div className="flex justify-between items-center">            </div>                {activeEscrows.map((escrow) => (

                  <span className="text-sm text-slate-600">Risk Score</span>

                  <span className="text-2xl font-bold text-emerald-600">A+</span>            <div className="text-2xl font-bold mb-1">${vaultStats.availableWithdraw.toLocaleString()}</div>                  <div key={escrow.id} className="border border-gray-200 rounded-lg p-4">

                </div>

                <div className="flex justify-between items-center">            <div className="text-purple-200 text-sm">Available</div>                    <div className="flex justify-between items-start mb-3">

                  <span className="text-sm text-slate-600">Buffer Ratio</span>

                  <span className="font-bold text-slate-800">15%</span>          </div>                      <div>

                </div>

                <div className="bg-red-50 rounded-lg p-3">        </div>                        <h3 className="font-semibold text-gray-900">{escrow.property}</h3>

                  <p className="text-xs text-red-600 mb-1">Risk Buffer</p>

                  <p className="text-sm font-bold text-red-700">$7,125 USDC locked</p>      </div>                        <p className="text-sm text-gray-600">Tenant: {escrow.tenant}</p>

                  <p className="text-xs text-red-600">for damage protection</p>

                </div>                        <p className="text-xs text-gray-500">Escrow ID: {escrow.id}</p>

                <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200 text-sm font-medium">

                  Adjust Risk Parameters      {/* Main Content Grid */}                      </div>

                </button>

              </div>      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">                      <div className="text-right">

            </div>

                                <div className="text-lg font-bold text-green-600">

            {/* Tenant Analytics */}

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50">        {/* Active Escrows - Takes 2 columns */}                          ${escrow.deposit.toLocaleString()} USDC

              <div className="p-6 border-b border-slate-200/50">

                <h3 className="font-bold text-slate-800 flex items-center gap-2">        <div className="xl:col-span-2">                        </div>

                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-md flex items-center justify-center">

                    <Users className="w-3 h-3 text-white" />          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">                        <div className="text-sm text-gray-600">

                  </div>

                  Tenant Analytics            <div className="p-6 border-b border-gray-100">                          ${escrow.monthlyRent}/month

                </h3>

              </div>              <div className="flex items-center justify-between">                        </div>

              <div className="p-6 space-y-4">

                <div className="grid grid-cols-3 gap-3">                <div className="flex items-center space-x-3">                      </div>

                  <div className="text-center">

                    <p className="text-xl font-bold text-slate-800">847</p>                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">                    </div>

                    <p className="text-xs text-slate-600">Avg Score</p>

                  </div>                    <Building2 className="text-blue-600" size={20} />

                  <div className="text-center">

                    <p className="text-xl font-bold text-emerald-600">98%</p>                  </div>                    {/* Status and Automation */}

                    <p className="text-xs text-slate-600">Success Rate</p>

                  </div>                  <div>                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                  <div className="text-center">

                    <p className="text-xl font-bold text-blue-600">12</p>                    <h2 className="text-xl font-bold text-gray-900">Active Escrows</h2>                      <div>

                    <p className="text-xs text-slate-600">Countries</p>

                  </div>                    <p className="text-gray-500 text-sm">Manage your rental properties</p>                        <div className="flex items-center mb-2">

                </div>

                <div className="bg-blue-50 rounded-lg p-3">                  </div>                          {escrow.status === 'active' ? (

                  <p className="text-xs text-blue-600 mb-1">Multi-currency bonus</p>

                  <p className="text-sm font-bold text-blue-700">+15% for EURC users</p>                </div>                            <CheckCircle className="text-green-500 mr-2" size={16} />

                </div>

              </div>                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2">                          ) : (

            </div>

          </div>                  <Plus size={16} />                            <AlertTriangle className="text-orange-500 mr-2" size={16} />

        </div>

                  <span>Add Property</span>                          )}

        {/* Arc Integration Footer */}

        <div className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 text-white">                </button>                          <span className="text-sm font-medium">

          <div className="flex items-center justify-between">

            <div>              </div>                            {escrow.status === 'active' ? 'Active' : 'Pending Inspection'}

              <h3 className="font-bold text-lg mb-1 flex items-center gap-2">

                <Globe className="w-5 h-5" />            </div>                          </span>

                Arc Integration

              </h3>                        </div>

              <p className="text-blue-100 text-sm">Advanced programmable money features powered by Arc blockchain infrastructure</p>

            </div>            <div className="p-6 space-y-4">                        <div className="text-xs text-gray-600">

            <div className="text-right">

              <p className="text-xs text-blue-200">Main Escrow Contract:</p>              {activeEscrows.map((escrow) => (                          Next payment: {escrow.nextPayment}

              <p className="font-mono text-sm">0x5FC8d32...875707</p>

              <p className="text-xs text-blue-200 mt-1">Network: Arc Testnet (Chain 42161)</p>                <div key={escrow.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 hover:shadow-md transition-all">                        </div>

              <button className="mt-2 bg-white/20 hover:bg-white/30 text-white py-1 px-3 rounded-lg text-xs transition-colors flex items-center gap-1">

                View on Explorer <ExternalLink className="w-3 h-3" />                  <div className="flex items-start justify-between mb-4">                      </div>

              </button>

            </div>                    <div className="flex items-start space-x-4">                      

          </div>

        </div>                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">                      <div>

      </div>

    </div>                        {escrow.avatar}                        <div className="text-sm font-medium text-gray-700 mb-2">Automation</div>

  );

}                      </div>                        <div className="space-y-1">

                      <div>                          <div className="flex items-center text-xs">

                        <h3 className="text-lg font-bold text-gray-900">{escrow.property}</h3>                            <div className={`w-2 h-2 rounded-full mr-2 ${escrow.automation.autoRelease ? 'bg-green-500' : 'bg-gray-400'}`} />

                        <p className="text-gray-600">Tenant: {escrow.tenant}</p>                            Auto-release: {escrow.automation.autoRelease ? 'ON' : 'OFF'}

                        <p className="text-sm text-gray-500">ID: {escrow.id}</p>                          </div>

                      </div>                          <div className="flex items-center text-xs">

                    </div>                            <div className={`w-2 h-2 rounded-full mr-2 ${escrow.automation.inspectionRequired ? 'bg-blue-500' : 'bg-gray-400'}`} />

                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(escrow.status)}`}>                            Inspection required

                      <div className="flex items-center space-x-1">                          </div>

                        {getStatusIcon(escrow.status)}                          <div className="text-xs text-gray-600">

                        <span>{escrow.status.replace('_', ' ').toUpperCase()}</span>                            Grace period: {escrow.automation.gracePeriod} days

                      </div>                          </div>

                    </div>                        </div>

                  </div>                      </div>

                    </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white rounded-lg p-4">                    {/* Actions */}

                      <div className="text-2xl font-bold text-gray-900">${escrow.deposit.toLocaleString()}</div>                    <div className="flex gap-2">

                      <div className="text-gray-500 text-sm">USDC Deposit</div>                      {escrow.status === 'pending_inspection' && (

                    </div>                        <button className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">

                    <div className="bg-white rounded-lg p-4">                          Mark Inspected

                      <div className="text-2xl font-bold text-gray-900">${escrow.monthlyRent}/mo</div>                        </button>

                      <div className="text-gray-500 text-sm">Monthly Rent</div>                      )}

                    </div>                      <button 

                    <div className="bg-white rounded-lg p-4">                        onClick={() => handleReleaseDeposit(escrow.id)}

                      <div className="text-lg font-bold text-gray-900">{escrow.nextPayment}</div>                        disabled={releaseDeposit === escrow.id}

                      <div className="text-gray-500 text-sm">Next Payment</div>                        className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 disabled:opacity-50"

                    </div>                      >

                  </div>                        {releaseDeposit === escrow.id ? 'Releasing...' : 'Release Deposit'}

                      </button>

                  {/* Automation Status */}                      <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">

                  <div className="bg-white rounded-lg p-4 mb-4">                        View Details

                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">                      </button>

                      <Settings size={16} className="mr-2" />                    </div>

                      Automation Settings                  </div>

                    </h4>                ))}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">              </div>

                      <div className="flex items-center justify-between">            </div>

                        <span className="text-gray-600 text-sm">Auto-release</span>          </div>

                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${

                          escrow.automation.autoRelease           {/* Right Panel - Advanced Features */}

                            ? 'bg-green-100 text-green-700'           <div className="space-y-6">

                            : 'bg-red-100 text-red-700'            

                        }`}>            {/* Yield Vault Stats */}

                          {escrow.automation.autoRelease ? 'ON' : 'OFF'}            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

                        </span>              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">

                      </div>                <TrendingUp className="mr-2" size={20} />

                      <div className="flex items-center justify-between">                ERC4626 Yield Vault

                        <span className="text-gray-600 text-sm">Inspection</span>              </h3>

                        <span className="text-amber-600 text-sm font-medium">Required</span>              

                      </div>              <div className="space-y-4">

                      <div className="flex items-center justify-between">                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">

                        <span className="text-gray-600 text-sm">Grace period</span>                  <div className="text-sm text-gray-600">Total Value Locked (TVL)</div>

                        <span className="text-gray-900 text-sm font-medium">{escrow.automation.gracePeriod} days</span>                  <div className="text-2xl font-bold text-gray-900">${vaultStats.totalDeposited.toLocaleString()}</div>

                      </div>                  <div className="text-xs text-green-600">+5.2% APY</div>

                    </div>                </div>

                  </div>

                <div className="grid grid-cols-2 gap-4">

                  {/* Action Buttons */}                  <div className="text-center">

                  <div className="flex flex-wrap gap-3">                    <div className="text-lg font-bold text-green-600">${vaultStats.yieldEarned}</div>

                    {escrow.status === 'pending_inspection' ? (                    <div className="text-xs text-gray-600">Yield Earned</div>

                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2">                  </div>

                        <CheckCircle size={16} />                  <div className="text-center">

                        <span>Mark Inspected</span>                    <div className="text-lg font-bold text-blue-600">98.5%</div>

                      </button>                    <div className="text-xs text-gray-600">Utilization</div>

                    ) : null}                  </div>

                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2">                </div>

                      <DollarSign size={16} />

                      <span>Release Deposit</span>                <button className="w-full bg-purple-500 text-white py-2 rounded-lg text-sm hover:bg-purple-600">

                    </button>                  Manage Vault

                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center space-x-2">                </button>

                      <Eye size={16} />              </div>

                      <span>View Details</span>            </div>

                    </button>

                  </div>            {/* Risk Management */}

                </div>            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              ))}              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">

            </div>                <Shield className="mr-2" size={20} />

          </div>                Risk Management

        </div>              </h3>

              

        {/* Sidebar - Takes 1 column */}              <div className="space-y-4">

        <div className="space-y-6">                <div className="grid grid-cols-2 gap-4">

                            <div>

          {/* ERC4626 Vault */}                    <div className="text-sm text-gray-600">Risk Score</div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">                    <div className="text-xl font-bold text-green-600">A+</div>

            <div className="flex items-center justify-between mb-6">                  </div>

              <div className="flex items-center space-x-3">                  <div>

                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">                    <div className="text-sm text-gray-600">Buffer Ratio</div>

                  <Wallet size={20} />                    <div className="text-xl font-bold text-blue-600">15%</div>

                </div>                  </div>

                <div>                </div>

                  <h3 className="text-lg font-bold">ERC4626 Vault</h3>

                  <p className="text-indigo-200 text-sm">Yield generation</p>                <div className="bg-yellow-50 p-3 rounded-lg">

                </div>                  <div className="text-sm text-yellow-800">

              </div>                    <strong>Risk Buffer:</strong> $7,125 USDC locked for damage protection

              <button className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm transition-colors">                  </div>

                Manage                </div>

              </button>

            </div>                <button className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600">

                  Adjust Risk Parameters

            <div className="space-y-4">                </button>

              <div>              </div>

                <div className="text-2xl font-bold">${vaultStats.totalDeposited.toLocaleString()}</div>            </div>

                <div className="text-indigo-200 text-sm">Total Value Locked (TVL)</div>

              </div>            {/* Reputation Analytics */}

                          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              <div className="grid grid-cols-2 gap-4">              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">

                <div>                <Users className="mr-2" size={20} />

                  <div className="text-lg font-bold">+{vaultStats.apy}% APY</div>                Tenant Analytics

                  <div className="text-indigo-200 text-xs">Annual yield</div>              </h3>

                </div>              

                <div>              <div className="space-y-4">

                  <div className="text-lg font-bold">{vaultStats.utilization}%</div>                <div className="text-center">

                  <div className="text-indigo-200 text-xs">Utilization</div>                  <div className="text-2xl font-bold text-gray-900">847</div>

                </div>                  <div className="text-sm text-gray-600">Avg Tenant Score</div>

              </div>                </div>



              <div className="bg-white/10 rounded-lg p-3">                <div className="grid grid-cols-2 gap-4 text-center">

                <div className="text-sm font-medium mb-2">Yield Progress</div>                  <div>

                <div className="w-full bg-white/20 rounded-full h-2">                    <div className="text-lg font-bold text-green-600">98%</div>

                  <div className="bg-white rounded-full h-2" style={{ width: `${vaultStats.utilization}%` }}></div>                    <div className="text-xs text-gray-600">Success Rate</div>

                </div>                  </div>

              </div>                  <div>

            </div>                    <div className="text-lg font-bold text-blue-600">12</div>

          </div>                    <div className="text-xs text-gray-600">Countries</div>

                  </div>

          {/* Risk Management */}                </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

            <div className="flex items-center space-x-3 mb-6">                <div className="bg-green-50 p-3 rounded-lg">

              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">                  <div className="text-sm text-green-800">

                <Shield size={20} className="text-emerald-600" />                    <strong>Multi-currency bonus:</strong> +15% for EURC users

              </div>                  </div>

              <div>                </div>

                <h3 className="text-lg font-bold text-gray-900">Risk Management</h3>              </div>

                <p className="text-gray-500 text-sm">Security overview</p>            </div>

              </div>

            </div>            {/* Contract Integration */}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

            <div className="space-y-4">              <h3 className="text-lg font-bold text-gray-900 mb-4">Arc Integration</h3>

              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">              

                <div>              <div className="space-y-3">

                  <div className="text-2xl font-bold text-emerald-700">A+</div>                <div className="text-xs">

                  <div className="text-emerald-600 text-sm">Risk Score</div>                  <div className="text-gray-600 mb-1">Main Escrow Contract:</div>

                </div>                  <div className="font-mono text-blue-600 break-all">

                <CheckCircle className="text-emerald-600" size={24} />                    {ARC_CONTRACTS.RENTAL_ESCROW}

              </div>                  </div>

                </div>

              <div className="grid grid-cols-2 gap-3">                

                <div className="bg-gray-50 rounded-lg p-3">                <div className="text-xs">

                  <div className="text-lg font-bold text-gray-900">15%</div>                  <div className="text-gray-600 mb-1">Network:</div>

                  <div className="text-gray-600 text-xs">Buffer Ratio</div>                  <div className="font-mono text-green-600">

                </div>                    Arc Testnet (Chain {ARC_CONTRACTS.CHAIN_ID})

                <div className="bg-gray-50 rounded-lg p-3">                  </div>

                  <div className="text-lg font-bold text-gray-900">$7.1K</div>                </div>

                  <div className="text-gray-600 text-xs">Risk Buffer</div>

                </div>                <button className="w-full bg-gray-500 text-white py-2 rounded-lg text-sm hover:bg-gray-600">

              </div>                  View on Explorer

                </button>

              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium transition-colors">              </div>

                Adjust Parameters            </div>

              </button>          </div>

            </div>        </div>

          </div>

        {/* Footer */}

          {/* Tenant Analytics */}        <div className="mt-8 text-center text-gray-500 text-sm">

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">          <p>Advanced programmable money features powered by Arc blockchain infrastructure</p>

            <div className="flex items-center space-x-3 mb-6">        </div>

              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">      </div>

                <Users size={20} className="text-blue-600" />    </div>

              </div>  );

              <div>}
                <h3 className="text-lg font-bold text-gray-900">Tenant Analytics</h3>
                <p className="text-gray-500 text-sm">Performance metrics</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">847</div>
                  <div className="text-gray-500 text-sm">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">98%</div>
                  <div className="text-gray-500 text-sm">Success Rate</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 text-sm font-medium">Global Coverage</span>
                  <Globe size={16} className="text-gray-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">12 Countries</div>
                <div className="text-purple-600 text-xs">+15% EURC bonus</div>
              </div>
            </div>
          </div>

          {/* Arc Integration */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">Arc Integration</h3>
                <p className="text-gray-400 text-sm">Blockchain infrastructure</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-gray-300 text-sm mb-1">Main Contract</div>
                <div className="bg-white/10 rounded-lg p-3 font-mono text-sm break-all">
                  {ARC_CONTRACTS.RENTAL_ESCROW}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-300 text-sm">Network</div>
                  <div className="font-medium">Arc Testnet</div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm transition-colors flex items-center space-x-2">
                  <ExternalLink size={14} />
                  <span>Explorer</span>
                </button>
              </div>

              <div className="text-xs text-gray-400 bg-white/5 rounded-lg p-3">
                Advanced programmable money features powered by Arc infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}