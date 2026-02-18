import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, UserCheck, Trash2, Mail } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const PrivacyIOS: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/privacy" className="inline-flex items-center gap-2 text-[#2CB5A0] font-bold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={20} />
                    Back to Privacy Overview
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-[#1a1a1a] p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <img src={logoHorizontal} alt="ReBookz" className="h-10 brightness-0 invert mb-6" />
                            <h1 className="text-4xl font-black">Privacy Policy (iOS)</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Compliance: Apple App Store Guidelines</p>
                        </div>
                        <ShieldCheck size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <UserCheck className="text-[#2CB5A0]" />
                                1. Data Collection Disclosure
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                ReBookz collects the following data to provide a functional marketplace for book enthusiasts:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium ml-4">
                                <li><strong>Identity Data</strong>: Name and email address (provided via Sign in with Apple or Google).</li>
                                <li><strong>Contact Data</strong>: Phone number (required for user-to-user marketplace communication).</li>
                                <li><strong>Location Data</strong>: Coordinates are used only when the app is in use to show relevant book listings nearby.</li>
                                <li><strong>User Content</strong>: Photos and descriptions of books you list for sale or donation.</li>
                            </ul>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <ShieldCheck className="text-[#2CB5A0]" />
                                2. Authentication & Third Parties
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                We utilize Apple's secure authentication system. When you use "Sign in with Apple," we only receive the data you authorize. We do not sell this data to third-party advertisers or brokers. Your contact information is only visible to other users when you initiate a marketplace interaction.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Trash2 className="text-red-500" />
                                3. Account & Data Deletion
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                In compliance with Apple's requirements, you have full control over your data. You can delete your account and all associated data (listings, profile info, favorites) directly within the app under <strong>Settings &gt; Delete Account</strong>. This action is immediate and non-reversible.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Mail className="text-[#2CB5A0]" />
                                4. Contact Information
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                For any data privacy inquiries or to exercise your data rights, please contact us at:
                                <br />
                                <span className="text-[#2CB5A0] font-bold">privacy@rebookz.com</span>
                            </p>
                        </section>
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

export default PrivacyIOS;
