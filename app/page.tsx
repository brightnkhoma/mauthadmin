import Image from 'next/image';
import React from 'react';
import heroImage from '/public/hero.jpg'; // Import the image

export default function Page() {
  return (
    <div className='min-h-screen flex bg-gradient-to-br from-blue-50 to-purple-100'>
      {/* Left Side: Welcome and Hero Image */}
      <div className='flex-1 flex flex-col items-center justify-center p-8'>
        <h1 className='text-6xl font-bold text-slate-800 mb-6 animate-fade-in'>
          Welcome
        </h1>
        <div className='space-y-4 mb-12 animate-fade-in-up'>
          <p className='font-bold text-4xl text-slate-900'>
            Experience Secure
          </p>
          <p className='font-bold text-4xl text-slate-700'>
            Transactions
          </p>
          <p className='font-bold text-4xl text-slate-900'>
            Like Never Before!
          </p>
        </div>
        <div className='rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 animate-fade-in-up'>
     

<Image
  src={heroImage}
  alt="Secure Transactions"
  width={1200}
  height={800}
  className="w-full h-auto rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 animate-fade-in-up"
  placeholder="blur"
  priority
/>
        </div>
      </div>

      {/* Right Side: Form or Additional Content */}
      <div className='w-1/3 bg-white p-8 shadow-lg flex flex-col justify-center'>
        <h2 className='text-3xl font-bold text-slate-800 mb-6'>Get Started</h2>
        <form className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-slate-700'>Email</label>
            <input
              type='email'
              className='w-full p-3 mt-1 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700'>Password</label>
            <input
              type='password'
              className='w-full p-3 mt-1 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your password'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}