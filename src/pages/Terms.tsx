import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle2, AlertTriangle, Scale, Mail } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const Terms: React.FC = () => {
    const terms = [
        {
            title: '1. Introduction & Acceptance',
            content: 'By accessing or using the ReBookz mobile application, you agree to be bound by these Terms and Conditions. ReBookz is a marketplace platform connecting users for the purpose of buying, selling, and donating pre-owned books.'
        },
        {
            title: '2. Marketplace Relationship',
            content: 'ReBookz acts solely as a facilitator. We do NOT own, inspect, or verify the condition of books listed. All agreements, payments, and delivery arrangements are made directly between the buyer and the seller at their own risk.'
        },
        {
            title: '3. User Responsibilities',
            content: 'Users are responsible for maintaining the confidentiality of their accounts. You agree to provide accurate information and refrain from listing prohibited, counterfeit, or copyrighted materials. Any communication via WhatsApp or Phone calls initiated through the app is the sole responsibility of the interacting users.'
        },
        {
            title: '4. WhatsApp & Communication Access',
            content: 'The app provides convenient shortcuts to WhatsApp and direct calling features to facilitate transactions. ReBookz is not responsible for the content of messages or calls outside its platform. We encourage users to follow safety guidelines and meet in public places for handovers.'
        },
        {
            title: '5. Account Suspension & Termination',
            content: 'We reserve the right to suspend or terminate any account that violates these terms, engages in fraudulent activity, or compromises the safety of other users.'
        },
        {
            title: '6. Limitation of Liability',
            content: 'To the maximum extent permitted by law, ReBookz shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to failed transactions, disputes between users, or inaccurate listings.'
        },
        {
            title: '7. Updates to Terms',
            content: 'We may modify these terms at any time. Continued use of the app after such changes constitutes acceptance of the updated terms.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-[#2CB5A0] font-bold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={20} />
                    Back to Home
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-[#1a1a1a] p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <img src={logoHorizontal} alt="ReBookz" className="h-10 brightness-0 invert mb-6" />
                            <h1 className="text-4xl font-black">Terms & Conditions</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Standard Marketplace Agreement</p>
                        </div>
                        <Scale size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        {terms.map((item, index) => (
                            <section key={index} className="space-y-4">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <CheckCircle2 className="text-[#2CB5A0]" size={24} />
                                    {item.title}
                                </h2>
                                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                    {item.content}
                                </p>
                            </section>
                        ))}

                        <section className="bg-orange-50 p-8 rounded-3xl border border-orange-100 space-y-4">
                            <h2 className="text-2xl font-black text-orange-900 flex items-center gap-3">
                                <AlertTriangle className="text-orange-500" />
                                Safety Warning
                            </h2>
                            <p className="text-orange-800 font-medium leading-relaxed">
                                Always prioritize your safety. Never share payment information or personal residential addresses within the app chat or external communication. Meet in secure, public locations for book handovers.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Mail className="text-[#2CB5A0]" />
                                Contact Us
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                For any questions regarding these terms, please contact our legal support at:
                                <br />
                                <span className="text-[#2CB5A0] font-black text-xl">info.rebookz@gmail.com</span>
                            </p>
                        </section>
                    </div>

                    <div className="bg-gray-50 p-10 border-t border-gray-100 text-center">
                        <p className="text-gray-400 font-bold text-sm">
                            &copy; {new Date().getFullYear()} ReBookz App. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;
