import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Settings, Lock, Smartphone, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [config, setConfig] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Password Reset State
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [resetLoading, setResetLoading] = useState(false);

    const isSuperAdmin = user?.email === 'rajatvalecha@rebookz.com';

    const fetchConfig = async () => {
        try {
            const { data } = await api.get('/admin/config');
            setConfig(data);
        } catch (error) {
            console.error('Error fetching config:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    const handleToggleDummyLogin = async (currentValue: boolean) => {
        if (!isSuperAdmin) return;

        setSaving(true);
        try {
            await api.put('/admin/config', { key: 'showDummyLogin', value: !currentValue });
            setConfig({ ...config, showDummyLogin: !currentValue });
        } catch (error) {
            alert('Failed to update setting');
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert('New passwords do not match');
            return;
        }

        setResetLoading(true);
        try {
            await api.put('/admin/reset-password', { newPassword: passwords.new });
            setPasswords({ current: '', new: '', confirm: '' });
            alert('Password reset successfully');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error resetting password');
        } finally {
            setResetLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading settings...</div>;

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="text-[#2CB5A0]" />
                    System Settings
                </h1>
                <p className="text-gray-500 text-sm mt-1">Configure global application behavior and manage your security.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mobile App Settings (Super Admin Only) */}
                {isSuperAdmin && (
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Smartphone size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Mobile App Control</h2>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-700">Demo Mode Login</span>
                                    <button
                                        onClick={() => handleToggleDummyLogin(config.showDummyLogin)}
                                        disabled={saving}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${config.showDummyLogin ? 'bg-[#2CB5A0]' : 'bg-gray-300'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.showDummyLogin ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    When enabled, the "Continue as Dummy User" button is visible on the mobile login screen. Turn this off after App Store review is complete.
                                </p>
                            </div>
                        </div>

                        <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 className="text-[#2CB5A0] mt-1" size={18} />
                                <div>
                                    <h3 className="font-bold text-teal-800 text-sm">Review Ready</h3>
                                    <p className="text-xs text-teal-700 mt-1 leading-relaxed">
                                        Your app is configured for store review. Providing a dummy login flow ensures reviewers can test all features without social credentials.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Settings */}
                <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${!isSuperAdmin ? 'md:col-span-2 max-w-2xl mx-auto w-full' : ''}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Lock size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-800">Security & Password</h2>
                    </div>

                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">New Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2CB5A0]/20 focus:border-[#2CB5A0] outline-none transition-all text-sm"
                                placeholder="At least 6 characters"
                                value={passwords.new}
                                onChange={e => setPasswords({ ...passwords, new: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2CB5A0]/20 focus:border-[#2CB5A0] outline-none transition-all text-sm"
                                placeholder="Repeat new password"
                                value={passwords.confirm}
                                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={resetLoading}
                            className={`w-full py-3 mt-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${resetLoading ? 'bg-gray-100 text-gray-400' : 'bg-gray-800 text-white hover:bg-black active:scale-95 shadow-md hover:shadow-lg'}`}
                        >
                            {resetLoading ? 'Processing...' : 'Reset My Password'}
                        </button>
                    </form>

                    <p className="text-[10px] text-gray-400 mt-6 text-center">
                        Changing your password will take effect immediately.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
