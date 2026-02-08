import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const Terms: React.FC = () => {
    const terms = [
        {
            title: '1. Marketplace Role',
            content: 'ReBookz is a technology platform that operates solely as an online marketplace enabling users to list, buy, sell, or donate used books. ReBookz does not act as a buyer, seller, donor, recipient, agent, broker, or representative in any transaction conducted through the App.'
        },
        {
            title: '2. Transactions & Communications',
            content: 'ReBookz is not a party to any transaction or agreement between users. All transactions, communications, payments, delivery arrangements, pickups, and handovers are conducted directly between users and at their sole risk.'
        },
        {
            title: '3. Listings & Items',
            content: 'ReBookz does not own, possess, inspect, store, package, ship, verify, or deliver any items listed on the App and makes no representations or warranties regarding the quality, condition, safety, authenticity, legality, or accuracy of any listings or user-provided information.'
        },
        {
            title: '4. User Verification & Risks',
            content: 'ReBookz does not verify the identity, credibility, or conduct of users and does not guarantee that transactions will be completed. Users acknowledge that the use of an open marketplace involves inherent risks, including fraud, misrepresentation, non-delivery, or disputes.'
        },
        {
            title: '5. User Responsibilities',
            content: [
                'Verifying the identity and reliability of other users',
                'Inspecting items prior to completing a transaction',
                'Protecting their personal and financial information',
                'Complying with applicable laws and regulations'
            ]
        },
        {
            title: '6. Limitation of Liability',
            content: 'ReBookz shall not be liable for any loss, damage, injury, delay, dispute, fraud, misrepresentation, counterfeit items, non-delivery, payment failure, or claim arising from or related to standard interactions, use/misuse of items, or failure to perform transactions.'
        },
        {
            title: '7. Disputes',
            content: 'All disputes arising from or relating to transactions conducted through the App shall be resolved exclusively between the users involved. ReBookz has no obligation to mediate disputes or enforce agreements between users.'
        },
        {
            title: '8. Indemnification',
            content: 'To the maximum extent permitted by applicable law, users agree to release, indemnify, and hold harmless ReBookz, its owners, directors, officers, employees, and affiliates from any and all claims, liabilities, damages (direct or indirect), losses, costs, or expenses arising out of or related to user transactions, user misconduct, item condition, or delivery arrangements.'
        },
        {
            title: '9. Account Security',
            content: 'ReBookz reserves the right, but assumes no obligation, to suspend, restrict, or terminate user accounts that are suspected of fraudulent, abusive, or unlawful activity.'
        },
        {
            title: '10. Governing Law',
            content: 'These Terms and any disputes arising from or in connection with the App shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia.'
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
                    <div className="bg-blue-600 p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <img src={logoHorizontal} alt="ReBookz" className="h-10 brightness-0 invert mb-6" />
                            <h1 className="text-4xl font-black">Terms & Conditions</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Last Updated: February 2026</p>
                        </div>
                        <Shield size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        {terms.map((item, index) => (
                            <section key={index} className="space-y-4">
                                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="text-blue-600 opacity-20 text-4xl leading-none">#</span>
                                    {item.title}
                                </h2>
                                {Array.isArray(item.content) ? (
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium pl-4">
                                        {item.content.map((bullet, i) => (
                                            <li key={i} className="leading-relaxed">{bullet}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                        {item.content}
                                    </p>
                                )}
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

export default Terms;
