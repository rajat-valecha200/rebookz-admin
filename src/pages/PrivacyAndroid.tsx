import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Smartphone, Database, HelpCircle } from 'lucide-react';
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
                            <h1 className="text-4xl font-black">Privacy Policy (Android)</h1>
                            <p className="mt-2 opacity-80 font-medium text-lg uppercase tracking-wider">Compliance: Google Play Developer Policy</p>
                        </div>
                        <Smartphone size={200} className="absolute -right-10 -bottom-10 opacity-10 rotate-12" />
                    </div>

                    <div className="p-10 md:p-16 space-y-12">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Database className="text-[#2CB5A0]" />
                                1. Data Safety & Collection
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                ReBookz is committed to transparency in our data practices. We collect and share data as follows:
                            </p>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                <div>
                                    <h4 className="font-bold text-gray-800">Personal Information</h4>
                                    <p className="text-sm text-gray-500">Collected: Name, Email address, Phone number. Used for account management and marketplace communication.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Approximate Location</h4>
                                    <p className="text-sm text-gray-500">Collected: Used only when the app is active to filter listings within your geographical vicinity.</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">Photos & Videos</h4>
                                    <p className="text-sm text-gray-500">Collected: Book images you upload for listings. These are visible to other users of the marketplace.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Shield className="text-[#2CB5A0]" />
                                2. Data Security & Permissions
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                We utilize industry-standard encryption to protect your data during transit. The app requests permissions only when necessary (e.g., Camera permission only when you add a book photo, Location permission only when browsing nearby items). We do not share your location history with third parties.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <HelpCircle className="text-[#2CB5A0]" />
                                3. Your Data Rights
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                You have the right to access, update, and request the deletion of your personal data at any time. Our app provides an easy-to-use <strong>Account Deletion</strong> feature in the Profile settings that wipes all user-specific data from our servers.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                <Smartphone className="text-[#2CB5A0]" />
                                4. Google Play Policy Compliance
                            </h2>
                            <p className="text-gray-600 font-medium leading-relaxed text-lg">
                                This policy is designed to meet Google Play's Data Safety requirements. For more information or technical support, please contact us at:
                                <br />
                                <span className="text-[#2CB5A0] font-bold">android-support@rebookz.com</span>
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

export default PrivacyAndroid;
