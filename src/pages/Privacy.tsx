import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const Privacy: React.FC = () => {
    const sections = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide directly to us when you create an account, list a book, or communicate with other users. This includes your name, email address, phone number, and location preferences.'
        },
        {
            title: '2. How We Use Your Information',
            content: 'We use the information we collect to facilitate transactions between users, improve our platform, and send you technical notices or support messages.'
        },
        {
            title: '3. Data Sharing & Marketplace Flow',
            content: 'ReBookz only shares your contact information (phone number/email) with other users when you explicitly initiate contact (e.g., clicking the Chat or Call button on a listing). We do not sell your personal data to third parties.'
        },
        {
            title: '4. Data Security',
            content: 'We take reasonable measures to protect your information from loss, theft, misuse, and unauthorized access. However, as an open marketplace, users are also encouraged to protect their own personal and financial information during interactions.'
        },
        {
            title: '5. Your Choices',
            content: 'You may update your account information or delete your account at any time through the application settings. Deleting your account will remove your active listings from the marketplace.'
        },
        {
            title: '6. Kingdom of Saudi Arabia Compliance',
            content: 'This Privacy Policy is governed by the laws and data protection regulations of the Kingdom of Saudi Arabia.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-blue-100/50 border border-gray-100 overflow-hidden">
                    <div className="bg-indigo-600 p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <img src={logoHorizontal} alt="ReBookz" className="h-10 brightness-0 invert mb-6" />
                            <h1 className="text-4xl font-black">Privacy Policy</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Last Updated: February 2026</p>
                        </div>
                        <Lock size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        {sections.map((item, index) => (
                            <section key={index} className="space-y-4">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="text-indigo-600 opacity-20 text-4xl leading-none">#</span>
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                    {item.content}
                                </p>
                            </section>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-10 border-t border-gray-100 text-center">
                        <p className="text-gray-400 font-bold text-sm">
                            &copy; {new Date().getFullYear()} ReBookz Saudi Marketplace. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
