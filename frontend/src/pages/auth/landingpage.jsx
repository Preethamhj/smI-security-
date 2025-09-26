import React from "react";
import  image  from '../../assets/image.jpeg';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-blue-400">SecureLayers</div>
        <nav className="space-x-6">
          <a href="#features" className="hover:text-blue-400">Features</a>
          <a href="#scans" className="hover:text-blue-400">Scans</a>
          <a href="#dashboard" className="hover:text-blue-400">Dashboard</a>
          <a href="/login" className="hover:text-blue-400">Login</a>
          <a href="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
            Sign Up
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-blue-400">
            Protect Every Layer of Your Business
          </h1>
          <p className="text-gray-300 mb-6">
            Real-time detection, automated response, and a simple dashboard to secure
            your websites, servers, and databases.
          </p>
          <div className="flex space-x-4">
            <a href="/register" className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded font-semibold">
              Get Started
            </a>
            <a href="#demo" className="border border-blue-400 hover:bg-blue-400 hover:text-black px-5 py-2 rounded font-semibold">
              Watch Demo
            </a>  
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <img
            src={image}
            alt="Security Illustration"
            className="w-100 md:w-[40rem]"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-16 py-12 text-center">
        <h2 className="text-3xl font-bold mb-8 text-blue-400">Start Your Security Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20">
            <h3 className="text-xl font-semibold mb-2">Continuous Scans</h3>
            <p className="text-gray-300">
              Get 24/7 monitoring of web, server and database assets.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20">
            <h3 className="text-xl font-semibold mb-2">Automated Response</h3>
            <p className="text-gray-300">
              Neutralize threats instantly with built-in playbooks.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 hover:shadow-lg hover:shadow-blue-500/20">
            <h3 className="text-xl font-semibold mb-2">Behavioral Training</h3>
            <p className="text-gray-300">
              Reduce human vulnerabilities with micro-learning & phishing simulations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
