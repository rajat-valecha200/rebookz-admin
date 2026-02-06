import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Smartphone, Globe } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col font-sans">
            {/* Navbar */}
            <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-2xl">
                    <BookOpen size={28} />
                    <span>ReBookz</span>
                </div>
                <div>
                    <Link to="/login" className="text-gray-600 font-medium hover:text-blue-600 transition-colors">
                        Admin Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
                <div className="max-w-3xl space-y-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Used Books, <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">New Stories.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
                        The easiest way to sell, buy, and swap used textbooks and novels in Saudi Arabia.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <button className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-gray-800 transform hover:-translate-y-1 transition-all">
                            <Smartphone size={24} />
                            <span>Download on App Store</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all">
                            <Globe size={24} />
                            <span>Get on Google Play</span>
                        </button>
                    </div>
                </div>

                {/* Features Graphic / Placeholder */}
                <div className="mt-20 w-full max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4 mx-auto md:mx-0">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Vast Library</h3>
                            <p className="text-gray-500">Find thousands of textbooks and novels from sellers nearby.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-teal-500 hover:shadow-xl transition-shadow">
                            <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center text-teal-600 mb-4 mx-auto md:mx-0">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
                            <p className="text-gray-500">Verified users and optional moderation for peace of mind.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-shadow">
                            <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center text-orange-600 mb-4 mx-auto md:mx-0">
                                <Smartphone size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                            <p className="text-gray-500">Snap a photo to sell. Chat with sellers instantly.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-center py-8 text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} ReBookz Saudi. All rights reserved.
            </footer>
        </div>
    );
};

export default LandingPage;
