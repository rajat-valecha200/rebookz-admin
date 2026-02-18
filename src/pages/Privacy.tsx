import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Smartphone, ShieldCheck, Mail, Database, Trash2, HelpCircle } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const Privacy: React.FC = () => {
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
                            <h1 className="text-4xl font-black">Privacy Policy</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Comprehensive User Privacy & Data Safety</p>
                        </div>
                        <Lock size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 bg-indigo-50/50 border-b border-indigo-100 flex flex-col md:flex-row gap-4 items-center justify-center">
                        <Link to="/privacy/ios" className="px-6 py-2 bg-white border border-indigo-200 rounded-full text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2">
                            <Smartphone size={18} />
                            Apple iOS Version
                        </Link>
                        <Link to="/privacy/android" className="px-6 py-2 bg-white border border-indigo-200 rounded-full text-indigo-700 font-bold hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center gap-2">
                            <Smartphone size={18} />
                            Google Android Version
                        </Link>
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        {/* Summary Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <ShieldCheck className="text-[#2CB5A0]" />
                                1. Introduction
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                This Privacy Policy describes how ReBookz ("we", "our", "us") collects, uses, and protects information when you use the ReBookz mobile application and related services. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
                            </p>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Effective Date: February 20, 2026</p>
                        </section>

                        {/* Information Collection */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Database className="text-[#2CB5A0]" />
                                2. Information We Collect
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.1 Personal Information (User Provided)</h3>
                                    <p className="text-gray-600 font-medium">We collect information you provide when creating an account or using the app, including:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1 ml-4">
                                        <li>Name and Email address (via Sign in with Apple or Google)</li>
                                        <li>Phone number (required for user-to-user marketplace interactions)</li>
                                        <li>Profile photo and book images you upload</li>
                                        <li>Messages and communication within the app</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.2 Automatically Collected Information</h3>
                                    <p className="text-gray-600 font-medium">To improve performance and security, we automatically collect:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1 ml-4">
                                        <li>Device model, OS version, and App version</li>
                                        <li>IP address and unique device identifiers</li>
                                        <li>Crash logs and usage analytics (via Firebase)</li>
                                        <li>Session duration and interaction history</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.3 Location Information</h3>
                                    <p className="text-gray-600 font-medium">
                                        We collect <strong>approximate location</strong> data only when the app is in use to filter and show book listings nearby. We do not track your location in the background.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Purpose Mapping */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <HelpCircle className="text-[#2CB5A0]" />
                                3. How We Use Information
                            </h2>
                            <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-600 font-bold text-sm">
                                        <tr>
                                            <th className="p-4 border-b">Data Category</th>
                                            <th className="p-4 border-b">Purpose of Use</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 font-medium">
                                        <tr className="border-b">
                                            <td className="p-4">Identity (Name/Email)</td>
                                            <td className="p-4">Account creation and authentication.</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-4">Contact (Phone)</td>
                                            <td className="p-4">Facilitating marketplace communication.</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="p-4">Location (Approximate)</td>
                                            <td className="p-4">Displaying nearby listings and filters.</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">Usage & Device Data</td>
                                            <td className="p-4">App performance, security, and analytics.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Account Deletion */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Trash2 className="text-red-500" />
                                4. Account & Data Deletion
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                You have the absolute right to delete your account and all associated data at any time. You can initiate this directly within the mobile app under <strong>Profile Settings &gt; Delete Account</strong>. Upon confirmation, all your personal data, active listings, and favorites will be permanently erased from our servers within 30 days, except where retention is required by law.
                            </p>
                        </section>

                        {/* Support Info */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Mail className="text-[#2CB5A0]" />
                                5. Contact & Support
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                For any privacy-related questions or if you need assistance with your data, please reach out to us:
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

export default Privacy;
