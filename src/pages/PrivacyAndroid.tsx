import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Smartphone, Database, Trash2, Mail, UserCheck, Shield, Camera, Phone } from 'lucide-react';
import logoHorizontal from '../assets/logo-horizontal.png';

const PrivacyAndroid: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/privacy" className="inline-flex items-center gap-2 text-[#2CB5A0] font-bold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={20} />
                    Back to Privacy Overview
                </Link>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-[#2CB5A0] p-10 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <img src={logoHorizontal} alt="ReBookz" className="h-10 brightness-0 invert mb-6" />
                            <h1 className="text-4xl font-black">Android Privacy Policy</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Compliance: Google Play Data Safety Policy</p>
                        </div>
                        <Smartphone size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-16">
                        {/* 1. Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <ShieldCheck className="text-[#2CB5A0]" />
                                1. Introduction
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                ReBookz ("we", "our", "us") operates the ReBookz marketplace. We value your trust and have implemented this policy to maintain transparency regarding how your data is collected, stored, and shared on our Android application. This document is specifically intended to satisfy Google Play's Data Safety requirements.
                            </p>
                            <p className="text-sm text-gray-400 font-bold uppercase">Effective Date: February 20, 2026</p>
                        </section>

                        {/* 2. Information We Collect */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Database className="text-[#2CB5A0]" />
                                2. Information We Collect
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.1 Personal Information</h3>
                                    <p className="text-gray-600 font-medium">To provide a safe marketplace, we collect:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2 ml-4">
                                        <li><strong>Personal Identifiers:</strong> Name and Email (via Google Sign-In)</li>
                                        <li><strong>Contact Data:</strong> Phone number (for secure seller interaction)</li>
                                        <li><strong>User-Generated Content:</strong> Book descriptions and images you upload</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.2 Device & Analytical Data</h3>
                                    <p className="text-gray-600 font-medium">Automatically collected for stability and security:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2 ml-4">
                                        <li>Device hardware details and Android OS version</li>
                                        <li>IP address and unique app install identifiers</li>
                                        <li>Crash logs and system performance metrics</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.3 Location Data (Discretionary)</h3>
                                    <p className="text-gray-600 font-medium">
                                        The app collects <strong>Approximate Location</strong> data ONLY to display books available near you. We do not track location when the app is in the background.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. How We Use Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <UserCheck className="text-[#2CB5A0]" />
                                3. Purpose Mapping
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <h4 className="font-black text-[#2CB5A0] mb-1">Service Functionality</h4>
                                    <p className="text-sm text-gray-500">Account management and marketplace matching.</p>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <h4 className="font-black text-[#2CB5A0] mb-1">Developer Communications</h4>
                                    <p className="text-sm text-gray-500">Push notifications and support updates.</p>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <h4 className="font-black text-[#2CB5A0] mb-1">Analytics</h4>
                                    <p className="text-sm text-gray-500">Improving app performance and user experience.</p>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                                    <h4 className="font-black text-[#2CB5A0] mb-1">Security</h4>
                                    <p className="text-sm text-gray-500">Protecting against fraudulent listings or bot accounts.</p>
                                </div>
                            </div>
                        </section>

                        {/* 4. Data Sharing & Third Parties */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Shield className="text-[#2CB5A0]" />
                                4. Third-Party Integrations
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                We utilize industry-leading services to ensure a robust experience:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium ml-4">
                                <li><strong>Firebase (Google):</strong> Cloud storage, real-time sync, and crash analytics.</li>
                                <li><strong>Google Sign-In:</strong> Secure authentication layer.</li>
                                <li><strong>WhatsApp API:</strong> Direct inquiry redirection.</li>
                            </ul>
                        </section>

                        {/* 5. Data Storage & Security */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Lock className="text-[#2CB5A0]" />
                                5. Security Protocols
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                Your data is encrypted in transit using <strong>TLS/HTTPS</strong>. We host our database on secure, ISO-compliant servers and use cryptographic <strong>hashing (bcrypt)</strong> for sensitive information.
                            </p>
                        </section>

                        {/* 8. Account Deletion (Google Requirement) */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-orange-600 flex items-center gap-3">
                                <Trash2 className="text-orange-500" />
                                6. Deletion & Retention Policy
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                ReBookz retains data only as long as an account exists. You can request account deletion at any time via the <strong>Profile</strong> section of the app. Once a request is processed, all personal identifiers and user-generated content are purged within 30 days.
                            </p>
                        </section>

                        {/* Hardware Access Disclosures */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Camera className="text-[#2CB5A0]" />
                                7. Hardware & Feature Access
                            </h2>
                            <div className="bg-[#2CB5A0]/5 p-8 rounded-3xl border border-[#2CB5A0]/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex gap-4">
                                    <Camera className="text-[#2CB5A0] shrink-0" />
                                    <p className="text-sm font-medium text-gray-700"><strong>Camera:</strong> Used only when you add a book photo. ReBookz does not access your gallery or use the camera in the background.</p>
                                </div>
                                <div className="flex gap-4">
                                    <Phone className="text-[#2CB5A0] shrink-0" />
                                    <p className="text-sm font-medium text-gray-700"><strong>WhatsApp/Call:</strong> Direct shortcuts provided for your convenience. ReBookz does not record or listen to these external interactions.</p>
                                </div>
                            </div>
                        </section>

                        {/* 14. Support Contact */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Mail className="text-[#2CB5A0]" />
                                8. Android Support & Data Safety
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                For any data safety concerns or Android-specific privacy queries, please contact:
                                <br />
                                <span className="text-[#2CB5A0] font-black text-2xl">info.rebookz@gmail.com</span>
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

export default PrivacyAndroid;
