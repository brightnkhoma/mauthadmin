'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Lpage({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      {/* Header */}
      <div className='w-full bg-blue-600 h-12 px-6 flex items-center justify-between shadow-md'>
        <span
          onClick={() => router.push('/')}
          className='text-white text-2xl font-bold cursor-pointer hover:text-blue-100 transition-colors duration-200'
        >
          mAuth
        </span>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-row'>
        {/* Sidebar */}
        <div className='w-48 h-full bg-white border-r border-gray-200 p-4 shadow-sm'>
          <SideComponent
            onClick={() => router.push('/Auth/registration')}
            name='Register'
            active={true}
          />
          <SideComponent
            onClick={() => router.push('/Auth/reregistration')}
            name='Re-register'
            active={false}
          />
          <SideComponent
            onClick={() => router.push('/Auth/registration')}
            name='Monitor'
            active={false}
          />
        </div>

        {/* Content Area */}
        <div className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}

interface SideComponentProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

const SideComponent: React.FC<SideComponentProps> = ({ name, active, onClick }) => {
  return (
    <div
      className={`p-3 rounded-lg text-md mb-2 cursor-pointer transition-all duration-200 ${
        active
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
      }`}
      onClick={onClick}
    >
      <span>{name}</span>
    </div>
  );
};