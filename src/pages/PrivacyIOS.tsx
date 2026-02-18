import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, Smartphone, Database, Trash2, Mail, Bell, Globe, UserCheck, Shield, Camera, Phone } from 'lucide-react';
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
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Compliance: Apple App Store Guideline 5.1.1</p>
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
                                ReBookz ("we", "our", "us") is dedicated to providing a safe and transparent marketplace for the exchange of pre-owned books. This Privacy Policy outlines our procedures regarding the collection, use, and disclosure of data when you utilize our iOS application. We prioritize user privacy and comply with Apple's stringent data safety standards.
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
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.1 Personal Information (User Provided)</h3>
                                    <p className="text-gray-600 font-medium">Data you provide during account creation and marketplace activity:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2 ml-4">
                                        <li><strong>Identity:</strong> Name and Email (via Sign in with Apple)</li>
                                        <li><strong>Contact:</strong> Phone number (for user-to-user marketplace communication)</li>
                                        <li><strong>Media:</strong> Photos of books you list and your profile picture</li>
                                        <li><strong>Communication:</strong> Messages sent within our platform</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.2 Automatically Collected Information</h3>
                                    <p className="text-gray-600 font-medium">To optimize iOS performance and ensure security:</p>
                                    <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2 ml-4">
                                        <li>Device Model (e.g., iPhone 15) and iOS Version</li>
                                        <li>IP address and anonymous device identifiers</li>
                                        <li>Crash logs and diagnostic statistics</li>
                                        <li>Session duration and feature engagement metrics</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">2.3 Location Information</h3>
                                    <p className="text-gray-600 font-medium">
                                        We request <strong>Approximate Location</strong> access only when the app is active. This is used solely to display relevant book listings in your vicinity. We do NOT track or store your precise background location history.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 3. How We Use Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <UserCheck className="text-[#2CB5A0]" />
                                3. How We Use Your Data
                            </h2>
                            <p className="text-gray-600 font-medium text-lg leading-relaxed">
                                Your data is mapped strictly to the following essential app functions:
                            </p>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 font-medium">
                                <li className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#2CB5A0]" />
                                    Account & Authentication
                                </li>
                                <li className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#2CB5A0]" />
                                    Marketplace Matching
                                </li>
                                <li className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#2CB5A0]" />
                                    Push Notification Alerts
                                </li>
                                <li className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#2CB5A0]" />
                                    Fraud & Security Monitoring
                                </li>
                            </ul>
                        </section>

                        {/* 4. Data Sharing & Third Parties */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Shield className="text-[#2CB5A0]" />
                                4. Data Sharing & Third Parties
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                We do NOT sell your personal data. We share only necessary information with trusted partners to operate the platform:
                            </p>
                            <ul className="list-disc list-inside space-y-2 text-gray-600 font-medium ml-4">
                                <li><strong>Firebase (Google):</strong> For real-time database, cloud hosting, and crash analytics.</li>
                                <li><strong>WhatsApp API:</strong> To facilitate user-to-user book inquiries.</li>
                                <li><strong>Apple:</strong> To verify authentication credentials.</li>
                            </ul>
                        </section>

                        {/* Special Features & Permissions */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Camera className="text-[#2CB5A0]" />
                                5. Hardware Access & Features
                            </h2>
                            <div className="p-8 bg-[#2CB5A0]/5 rounded-[2rem] border border-[#2CB5A0]/10 space-y-4">
                                <div className="flex items-start gap-4">
                                    <Camera className="text-[#2CB5A0] mt-1 shrink-0" />
                                    <p className="text-gray-700 font-medium"><strong>Camera Access:</strong> Used ONLY when you click "Add Photo" for a book listing. ReBookz does not access your private photo library or use the camera in the background.</p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="text-[#2CB5A0] mt-1 shrink-0" />
                                    <p className="text-gray-700 font-medium"><strong>Call & WhatsApp:</strong> You may initiate calls or WhatsApp threads directly from the app. ReBookz does NOT record, monitor, or listen to these external communications.</p>
                                </div>
                            </div>
                        </section>

                        {/* 6. Data Storage & Retention */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Lock className="text-[#2CB5A0]" />
                                6. Security & Retention
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                All data is transmitted via <strong>HTTPS (TLS)</strong> encryption. We retain your information as long as your account is active. If you de-activate your account, your public data is removed immediately.
                            </p>
                        </section>

                        {/* 8. Account Deletion (Apple Requirement) */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-red-600 flex items-center gap-3">
                                <Trash2 className="text-red-500" />
                                7. Account Deletion Policy
                            </h2>
                            <div className="bg-red-50 p-10 rounded-[2.5rem] border border-red-100">
                                <h4 className="text-red-900 font-black mb-4 uppercase text-sm tracking-widest">Mandatory Disclosure</h4>
                                <p className="text-red-800 font-medium leading-relaxed text-lg">
                                    Users can delete their entire account and all associated data (listings, history, profile) directly within the iOS app under <strong>Settings &gt; Delete Account</strong>. This process is irreversible, and all server-side records are purged within a 30-day window.
                                </p>
                            </div>
                        </section>

                        {/* 9. Children's Privacy */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Globe className="text-[#2CB5A0]" />
                                8. Children's Privacy
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                ReBookz is not intended for children under 13 years of age. We do not knowingly collect or solicit personal data from minors. If we detect data belonging to a minor, it is deleted immediately.
                            </p>
                        </section>

                        {/* 14. Contact Information */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Mail className="text-[#2CB5A0]" />
                                9. Contact & Legal Updates
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                We may update this policy periodically. Your continued use of the app constitutes acceptance of any changes. For privacy support, please email:
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

export default PrivacyIOS;
