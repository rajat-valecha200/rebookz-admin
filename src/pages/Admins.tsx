import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { ShieldCheck, UserPlus, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminData {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

const AdminsPage: React.FC = () => {
    const [admins, setAdmins] = useState<AdminData[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '' });
    const { } = useAuth();

    const fetchAdmins = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/admin/create', newAdmin);
            setShowModal(false);
            setNewAdmin({ name: '', email: '', password: '' });
            fetchAdmins();
            alert('Admin created successfully');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error creating admin');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading admins...</div>;

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <ShieldCheck className="text-[#2CB5A0]" />
                        Admin Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">Manage platform administrators and their access levels.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#2CB5A0] hover:bg-[#249e8b] text-white px-4 py-2 rounded-xl font-medium transition-all shadow-sm"
                >
                    <UserPlus size={18} />
                    Add New Admin
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Email</th>
                            <th className="py-4 px-6">Joined Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {admins.map((admin) => (
                            <tr key={admin._id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-teal-50 text-[#2CB5A0] flex items-center justify-center font-bold text-sm">
                                            {admin.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-gray-800">{admin.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-gray-600">{admin.email}</td>
                                <td className="py-4 px-6 text-gray-500 text-sm flex items-center gap-2">
                                    <Clock size={14} />
                                    {new Date(admin.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 transform transition-all">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Create New Administrator</h2>
                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2CB5A0]/20 focus:border-[#2CB5A0] outline-none transition-all"
                                    placeholder="John Doe"
                                    value={newAdmin.name}
                                    onChange={e => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2CB5A0]/20 focus:border-[#2CB5A0] outline-none transition-all"
                                    placeholder="admin@rebookz.com"
                                    value={newAdmin.email}
                                    onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Temporary Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2CB5A0]/20 focus:border-[#2CB5A0] outline-none transition-all"
                                    placeholder="Minimum 6 characters"
                                    value={newAdmin.password}
                                    onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#2CB5A0] hover:bg-[#249e8b] text-white rounded-xl font-medium shadow-md transition-all active:scale-95"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminsPage;
