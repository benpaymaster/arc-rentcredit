'use client'

import { SupportedNetwork } from '@/lib/constants'

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">
              ⚡ Arc Bridge
            </div>
            <div className="hidden md:block text-sm text-gray-200">
              Powered by Circle Bridge Kit
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Network Active</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}