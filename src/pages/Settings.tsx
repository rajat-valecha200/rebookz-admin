import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Settings, Lock, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const [appSettings, setAppSettings] = useState<{ regions: any[], versionControls: any[], forceUpdate?: any, allowedRegions?: any }>({ 
        regions: [], 
        versionControls: [],
        forceUpdate: { ios: { requiredVersion: '', storeUrl: '' }, android: { requiredVersion: '', storeUrl: '' } },
        allowedRegions: { android: [], ios: [] }
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    // New Version Control form state
    const [newVersion, setNewVersion] = useState({ os: 'ios', version: '', allowDummy: false });

    // Password Reset State
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [resetLoading, setResetLoading] = useState(false);

    const isSuperAdmin = user?.email === 'rajatvalecha@rebookz.com';

    const fetchAllSettings = async () => {
        try {
            const { data } = await api.get('/config/app-settings');
            // The backend needs to return the full versionControls array for the admin to manage it.
            setAppSettings({
                regions: data.regions || [],
                versionControls: data.versionControls || [],
                forceUpdate: data.forceUpdate || { ios: { requiredVersion: '', storeUrl: '' }, android: { requiredVersion: '', storeUrl: '' } },
                allowedRegions: data.allowedRegions || { android: [], ios: [] }
            });
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSettings();
    }, []);

    const handleUpdateSettings = async (newSettings: any) => {
        setSaving(true);
        try {
            await api.put('/config/app-settings', newSettings);
            setAppSettings(newSettings);
            alert('Settings updated successfully!');
        } catch (error) {
            alert('Failed to update app settings');
        } finally {
            setSaving(false);
        }
    };

    const handleToggleRegion = (countryCode: string) => {
        const updatedRegions = appSettings.regions.map(r => 
            r.countryCode === countryCode ? { ...r, isActive: !r.isActive } : r
        );
        handleUpdateSettings({ ...appSettings, regions: updatedRegions });
    };

    const handleTogglePlatformAccess = (platform: 'android' | 'ios', countryCode: string) => {
        const currentAllowed = appSettings.allowedRegions[platform] || [];
        let updatedAllowed;
        if (currentAllowed.includes(countryCode)) {
            updatedAllowed = currentAllowed.filter((c: string) => c !== countryCode);
        } else {
            updatedAllowed = [...currentAllowed, countryCode];
        }
        
        const updatedAllowedRegions = {
            ...appSettings.allowedRegions,
            [platform]: updatedAllowed
        };
        
        handleUpdateSettings({ ...appSettings, allowedRegions: updatedAllowedRegions });
    };

    const handleAddVersion = () => {
        if (!newVersion.version) return;
        const updatedVersions = [...appSettings.versionControls, newVersion];
        handleUpdateSettings({ ...appSettings, versionControls: updatedVersions });
        setNewVersion({ os: 'ios', version: '', allowDummy: false });
    };

    const handleRemoveVersion = (index: number) => {
        const updatedVersions = appSettings.versionControls.filter((_, i) => i !== index);
        handleUpdateSettings({ ...appSettings, versionControls: updatedVersions });
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
                {isSuperAdmin && (
                    <div className="space-y-6 md:col-span-2">
                        {/* Region Access Control */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">Region Access Control</h2>
                                    <p className="text-xs text-gray-500">Enable or disable app access for specific regions.</p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                {appSettings.regions?.map((region: any) => (
                                    <div key={region.countryCode} className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                        <div className="flex-1">
                                            <span className="font-semibold text-gray-700">{region.name} ({region.countryCode})</span>
                                            <p className="text-xs text-gray-500">Currency: {region.currencySymbol}</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Android</span>
                                                <button
                                                    onClick={() => handleTogglePlatformAccess('android', region.countryCode)}
                                                    disabled={saving}
                                                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${appSettings.allowedRegions?.android?.includes(region.countryCode) ? 'bg-green-500' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${appSettings.allowedRegions?.android?.includes(region.countryCode) ? 'translate-x-5.5' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">iOS</span>
                                                <button
                                                    onClick={() => handleTogglePlatformAccess('ios', region.countryCode)}
                                                    disabled={saving}
                                                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${appSettings.allowedRegions?.ios?.includes(region.countryCode) ? 'bg-blue-500' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${appSettings.allowedRegions?.ios?.includes(region.countryCode) ? 'translate-x-5.5' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 ml-4 border-l pl-4">
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">Global</span>
                                                <button
                                                    onClick={() => handleToggleRegion(region.countryCode)}
                                                    disabled={saving}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${region.isActive ? 'bg-[#2CB5A0]' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${region.isActive ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Version Control Dummy Login */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Settings size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">Dummy Login Version Rules</h2>
                                    <p className="text-xs text-gray-500">Toggle dummy login for specific OS versions (useful during review).</p>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                                <div className="flex gap-2 mb-2 items-end">
                                    <div className="flex-1">
                                        <label className="text-xs font-bold text-gray-500">OS</label>
                                        <select value={newVersion.os} onChange={e => setNewVersion({...newVersion, os: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm bg-white">
                                            <option value="ios">iOS</option>
                                            <option value="android">Android</option>
                                        </select>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-xs font-bold text-gray-500">Version</label>
                                        <input type="text" placeholder="e.g. 1.0.2" value={newVersion.version} onChange={e => setNewVersion({...newVersion, version: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2 ml-4">
                                        <input type="checkbox" id="dummyCheck" checked={newVersion.allowDummy} onChange={e => setNewVersion({...newVersion, allowDummy: e.target.checked})} className="w-4 h-4 cursor-pointer" />
                                        <label htmlFor="dummyCheck" className="text-xs font-bold text-gray-600 cursor-pointer">Allow</label>
                                    </div>
                                    <button onClick={handleAddVersion} disabled={saving} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold ml-4">Add Rule</button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {appSettings.versionControls?.map((rule: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                                        <span className="text-sm font-semibold text-gray-700 uppercase">{rule.os} {rule.version}</span>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${rule.allowDummy ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {rule.allowDummy ? 'Allowed' : 'Blocked'}
                                            </span>
                                            <button onClick={() => handleRemoveVersion(index)} className="text-red-500 text-xs font-bold hover:underline py-1">Remove</button>
                                        </div>
                                    </div>
                                ))}
                                {appSettings.versionControls?.length === 0 && <p className="text-xs text-gray-400">No version rules defined.</p>}
                            </div>
                        </div>

                        {/* Force Update Settings */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                                    <Smartphone size={20} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">Force Update Requirements</h2>
                                    <p className="text-xs text-gray-500">Force users to update the app if their version is below the required version.</p>
                                </div>
                            </div>

                            {appSettings.forceUpdate && (
                                <div className="space-y-4">
                                    {/* iOS Settings */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">iOS App</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">Required Version (e.g. 1.0.2)</label>
                                                <input 
                                                    type="text" 
                                                    value={appSettings.forceUpdate.ios.requiredVersion} 
                                                    onChange={e => setAppSettings({...appSettings, forceUpdate: { ...appSettings.forceUpdate, ios: { ...appSettings.forceUpdate.ios, requiredVersion: e.target.value } }})} 
                                                    className="w-full p-2 mt-1 border border-gray-200 rounded-lg text-sm outline-none" 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">App Store URL</label>
                                                <input 
                                                    type="url" 
                                                    value={appSettings.forceUpdate.ios.storeUrl} 
                                                    onChange={e => setAppSettings({...appSettings, forceUpdate: { ...appSettings.forceUpdate, ios: { ...appSettings.forceUpdate.ios, storeUrl: e.target.value } }})} 
                                                    className="w-full p-2 mt-1 border border-gray-200 rounded-lg text-sm outline-none" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Android Settings */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase">Android App</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">Required Version (e.g. 1.0.2)</label>
                                                <input 
                                                    type="text" 
                                                    value={appSettings.forceUpdate.android.requiredVersion} 
                                                    onChange={e => setAppSettings({...appSettings, forceUpdate: { ...appSettings.forceUpdate, android: { ...appSettings.forceUpdate.android, requiredVersion: e.target.value } }})} 
                                                    className="w-full p-2 mt-1 border border-gray-200 rounded-lg text-sm outline-none" 
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500">Play Store URL</label>
                                                <input 
                                                    type="url" 
                                                    value={appSettings.forceUpdate.android.storeUrl} 
                                                    onChange={e => setAppSettings({...appSettings, forceUpdate: { ...appSettings.forceUpdate, android: { ...appSettings.forceUpdate.android, storeUrl: e.target.value } }})} 
                                                    className="w-full p-2 mt-1 border border-gray-200 rounded-lg text-sm outline-none" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleUpdateSettings(appSettings)} 
                                        disabled={saving} 
                                        className="w-full bg-[#2CB5A0] text-white py-3 rounded-xl font-bold text-sm shadow-sm md:w-auto md:px-8 mt-4"
                                    >
                                        {saving ? 'Saving...' : 'Save Update Rules'}
                                    </button>
                                </div>
                            )}
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
