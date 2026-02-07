import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Smartphone, Globe, ArrowRight, Star, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Header / Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600">
                        <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                            <BookOpen size={24} className="text-white" />
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-gray-900">ReBookz</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
                        <a href="#community" className="hover:text-blue-600 transition-colors">Community</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="hidden sm:block text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors">
                            Admin Login
                        </Link>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95">
                            Get the App
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1 pt-32">
                <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                                <Star size={14} fill="currentColor" />
                                <span>Saudi Arabia's #1 Book Community</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                                Used Books, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">New Stories.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Join thousands of students and book lovers in Saudi Arabia. Sell, buy, and swap pre-loved books with ease.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                                <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-black group transition-all">
                                    <Smartphone size={24} />
                                    <div className="text-left">
                                        <p className="text-[10px] opacity-60 uppercase font-black">Download on the</p>
                                        <p className="text-lg">App Store</p>
                                    </div>
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="flex items-center justify-center gap-3 bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-gray-50 transition-all">
                                    <Globe size={24} className="text-blue-600" />
                                    <div className="text-left">
                                        <p className="text-[10px] opacity-60 uppercase font-black">Get it on</p>
                                        <p className="text-lg">Google Play</p>
                                    </div>
                                </button>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-3 pt-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-gray-400">
                                    <span className="text-gray-900">5,000+</span> active readers this month
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            {/* App Screenshot Placeholder / Mockup */}
                            <div className="relative w-full max-w-[320px] mx-auto aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden">
                                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex justify-center items-end pb-1">
                                    <div className="w-20 h-4 bg-gray-900 rounded-full" />
                                </div>
                                <div className="p-4 pt-10 h-full bg-gradient-to-b from-blue-50 to-white">
                                    <div className="h-4 w-12 bg-blue-200 rounded-full mb-4" />
                                    <div className="h-8 w-full bg-blue-100 rounded-xl mb-2" />
                                    <div className="h-4 w-3/4 bg-blue-50 rounded-lg mb-8" />

                                    <div className="grid grid-cols-2 gap-3">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="aspect-[3/4] bg-white rounded-2xl shadow-sm p-2">
                                                <div className="h-full w-full bg-gray-50 rounded-xl mb-1" />
                                                <div className="h-2 w-1/2 bg-gray-100 rounded" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Blobs */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-400/10 rounded-full blur-[120px] -z-10" />
                            <div className="absolute -top-10 -right-10 px-6 py-4 bg-white rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-3 animate-bounce">
                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <CheckCircle size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase text-gray-400">Sold Today</p>
                                    <p className="font-bold text-gray-900">Calculus 101</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features section */}
                <section id="features" className="py-32 px-6 bg-gray-50/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Built for the Saudi Community</h2>
                            <p className="text-lg text-gray-500 font-medium">Everything you need to buy and sell books within your city or university.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<BookOpen size={30} />}
                                title="Vast Library"
                                desc="Access thousands of curriculum-specific textbooks and popular novels from verified sellers across the Kingdom."
                                color="blue"
                            />
                            <FeatureCard
                                icon={<ShieldCheck size={30} />}
                                title="Safe & Secure"
                                desc="Chat internally without sharing your phone number. Verified profiles and moderation ensure a safe marketplace."
                                color="emerald"
                            />
                            <FeatureCard
                                icon={<Smartphone size={30} />}
                                title="Mobile First"
                                desc="Snap a photo, set a price, and list. Buying is just as easy with our location-based search and filters."
                                color="orange"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2 text-blue-600">
                            <BookOpen size={24} />
                            <span className="font-black text-xl tracking-tighter text-gray-900">ReBookz</span>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Giving books a second life in Saudi Arabia.</p>
                    </div>

                    <div className="flex gap-10 text-sm font-bold text-gray-500">
                        <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            <Star size={18} fill="currentColor" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                            <Smartphone size={18} />
                        </div>
                    </div>
                </div>
                <div className="text-center mt-20 text-gray-300 text-xs font-bold uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} ReBookz Saudi. Made with ❤️ for readers.
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, color }: any) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        orange: 'bg-orange-50 text-orange-600 border-orange-100',
    }
    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-2 transition-all duration-300 group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border transition-transform group-hover:scale-110 ${colors[color]}`}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

export default LandingPage;
