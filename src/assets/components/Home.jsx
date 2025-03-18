import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Home() {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center font-pop" 
      style={{ backgroundImage: "url('/src/Images/bgori11.jpg')" }}
    >
      {/* Transparent Header */}
      <Header />

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-full bg-black bg-opacity-30 p-6 md:p-12">
        
        {/* Left Side (Text Section) */}
        <div className="flex flex-col items-center md:items-start relative mt-24 justify-center px-4 md:px-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4">
            Welcome to <span className="text-green-600">F</span><span className='text-green-600'>arm</span>
            <span className="text-green-600">S</span><span className='text-green-600'>ol</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
            We deliver better Agriculture for a better Future.
          </p>
          
          <div className='mt-6'>
            <Link 
              to="/about" 
              className="px-6 py-2 bg-gray-400 text-white font-medium rounded-lg shadow-md hover:bg-powder transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Side (Card Component) */}
        <div className="flex justify-center items-center relative mt-24  md:mt-0">
          <Card />
        </div>
        
      </div>
    </div>
  );
}
