import React from 'react';
import logoHorizontal from '../assets/logo-horizontal.png';
import appImage from '../assets/appImage.jpeg';
import { Link } from 'react-router-dom';
import { BookOpen, ShieldCheck, Smartphone, Globe, ArrowRight, Search, MessageCircle, Heart, Mail } from 'lucide-react';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Header / Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={logoHorizontal} alt="ReBookz" className="h-9 md:h-10 hover:opacity-80 transition-opacity" />
                    </div>

                    <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-500">
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-black text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95">
                            Download App
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="relative pt-32 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -z-10" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -z-10" />

                    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
                        <div className="flex-1 space-y-8 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-blue-600/5 text-blue-600 px-4 py-2 rounded-full text-xs font-black capitalize tracking-widest border border-blue-600/10 backdrop-blur-sm animate-fade-in">
                                <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                                <span>Where used books find new readers</span>
                            </div>

                            <h1 className="text-5xl font-black text-gray-900 leading-[1.05] tracking-tight">
                                A Trusted Platform to<br />
                                <span className="text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Buy, Sell & Donate</span><br />
                                Used Books
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed lg:pr-10">
                                Give your pre-loved books a new home. Buy, sell, and swap with students and book lovers everywhere.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                                <button className="flex items-center justify-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black shadow-2xl hover:bg-black group transition-all transform hover:-translate-y-1">
                                    <Smartphone size={24} />
                                    <div className="text-left">
                                        <p className="text-[10px] opacity-60 uppercase font-black tracking-tight">Download on the</p>
                                        <p className="text-lg leading-tight font-black">App Store</p>
                                    </div>
                                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform opacity-30 group-hover:opacity-100" />
                                </button>
                                <button className="flex items-center justify-center gap-4 bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-2xl font-black shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1">
                                    <Globe size={24} className="text-blue-600" />
                                    <div className="text-left">
                                        <p className="text-[10px] opacity-60 uppercase font-black tracking-tight">Available on</p>
                                        <p className="text-lg leading-tight font-black">Google Play</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 relative perspective-1000">
                            {/* Visual wrapper for depth */}
                            <div className="relative z-20 group">
                                <div className="absolute inset-0 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />

                                {/* Device Stand/Base Glow */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/10 blur-[30px] rounded-full" />

                                {/* Real App Screenshot with polished frame */}
                                <div className="relative w-full max-w-[280px] md:max-w-[320px] mx-auto aspect-[9/18.5] bg-gray-950 rounded-[3.5rem] p-3 border-[12px] border-gray-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transform hover:rotate-y-12 transition-transform duration-1000">
                                    <div className="absolute top-0 left-0 right-0 h-10 bg-transparent z-20 flex justify-center items-center">
                                        <div className="w-20 h-6 bg-gray-900 rounded-b-3xl" />
                                    </div>
                                    <img src={appImage} alt="App Interface" className="w-full h-full object-cover rounded-[2.5rem]" />

                                    {/* Glass reflection */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section id="how-it-works" className="py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">The 3-Step Success</h2>
                            <p className="text-lg md:text-xl text-gray-500 font-medium">Buying and selling should be as simple as turning a page. Here's how ReBookz makes it happen.</p>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-center relative">
                            {/* Decorative line for flow */}
                            <div className="hidden md:block absolute top-[45%] left-24 right-24 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent z-0" />

                            <StepCard
                                number="01"
                                icon={<Search className="text-white" size={32} />}
                                title="List Your Books"
                                desc="Snap a few photos, set your price, and list your pre-loved books in under a minute."
                                bgColor="bg-blue-600"
                                delay="0"
                            />
                            <StepCard
                                number="02"
                                icon={<MessageCircle className="text-white" size={32} />}
                                title="Connect Directly"
                                desc="Chat with buyers or sellers via WhatsApp or phone to finalize the deal and set a meetup."
                                bgColor="bg-emerald-500"
                                delay="100"
                            />
                            <StepCard
                                number="03"
                                icon={<Heart className="text-white" size={32} />}
                                title="Complete Transaction"
                                desc="Hand over the book, receive payment, and give your stories a new home."
                                bgColor="bg-orange-500"
                                delay="200"
                            />
                        </div>
                    </div>
                </section>

                {/* Features section with a modern Grid */}
                <section id="features" className="py-32 px-6 bg-gray-50/80 border-y border-gray-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 text-center lg:text-left">
                            <div className="max-w-2xl space-y-4">
                                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Tailored for Readers</h2>
                                <p className="text-lg text-gray-500 font-medium">Features designed to make local book commerce seamless and reliable.</p>
                            </div>
                            {/* <div className="hidden lg:block pb-2">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all cursor-pointer">
                                        <ArrowRight size={20} className="rotate-180" />
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 cursor-pointer">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<BookOpen size={30} />}
                                title="Wide Library"
                                desc="Access thousands of curriculum-specific textbooks and popular novels from verified sellers across the community."
                                color="blue"
                            />
                            <FeatureCard
                                icon={<ShieldCheck size={30} />}
                                title="Safe Messaging"
                                desc="Connect without sharing private contact info until you're ready. Our moderation keeps the community healthy."
                                color="emerald"
                            />
                            <FeatureCard
                                icon={<Smartphone size={30} />}
                                title="Instant Listings"
                                desc="The app is optimized for speed. Snap, describe, and share in seconds. Location-based search helps you find local deals."
                                color="orange"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer-gradient pt-32 pb-12 px-6 text-center md:text-left">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .footer-gradient {
                        background: linear-gradient(to bottom, #f9fafb, #ffffff);
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0); }
                        50% { transform: translateY(-10px); }
                    }
                    .animate-float { animation: float 4s ease-in-out infinite; }
                    .animate-float-delayed { animation: float 4s ease-in-out infinite 2s; }
                    .perspective-1000 { perspective: 1000px; }
                    .rotate-y-12 { transform: rotateY(12deg); }
                ` }} />

                <div className="max-w-7xl mx-auto space-y-20">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-1 space-y-6">
                            <img src={logoHorizontal} alt="ReBookz" className="h-8 mx-auto md:mx-0" />
                            <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                Empowering readers to share and discover books sustainably.
                            </p>
                            {/* <div className="flex gap-4 justify-center md:justify-start">
                                <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                                    <Star size={18} fill="currentColor" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">
                                    <Smartphone size={18} />
                                </a>
                            </div> */}
                        </div>

                        {/* Navigation Columns */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Platform</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                <li><a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a></li>
                                <li><a href="#features" className="hover:text-blue-600 transition-colors">Safety Features</a></li>
                                {/* <li><Link to="/login" className="hover:text-blue-600 transition-colors">Admin Dashboard</Link></li> */}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Legal</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                                {/* <li><a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a></li> */}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Support</h4>
                            <ul className="space-y-4 text-sm font-bold text-gray-500">
                                <li><a href="mailto:info.rebookz@gmail.com" className="flex items-center gap-3 justify-center md:justify-start hover:text-blue-600 transition-colors">
                                    <Mail size={18} /> info.rebookz@gmail.com
                                </a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-gray-400 text-xs font-black uppercase tracking-widest">
                            &copy; {new Date().getFullYear()} ReBookz. All rights reserved.
                        </p>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> for the community.
                        </p>
                    </div>
                </div>
            </footer>
        </div >
    );
};

const FeatureCard = ({ icon, title, desc, color }: any) => {
    const colors: any = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600',
        orange: 'bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600',
    }
    return (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-transparent hover:border-gray-100 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 border transition-all duration-500 ${colors[color]}`}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

const StepCard = ({ number, icon, title, desc, bgColor, delay }: any) => (
    <div className={`relative z-10 w-full max-w-[320px] bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 group group-hover:-translate-y-2`} style={{ transitionDelay: `${delay}ms` }}>
        <div className="space-y-8">
            <div className={`w-20 h-20 rounded-[1.5rem] ${bgColor} flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 text-white`}>
                {icon}
            </div>
            <div className="space-y-3">
                <span className="text-blue-600 font-black tracking-[0.2em] text-xs uppercase opacity-40">{number}</span>
                <h3 className="text-2xl font-black text-gray-900">{title}</h3>
                <p className="text-gray-500 text-base font-medium leading-relaxed">{desc}</p>
            </div>
        </div>

        {/* Glow effect on hover */}
        <div className={`absolute inset-0 rounded-[2.5rem] ${bgColor} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
    </div>
);

export default LandingPage;
