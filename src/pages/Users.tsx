import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, User } from 'lucide-react';

interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    isSuspended: boolean;
    createdAt: string;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchUsers = async (pageNumber = 1) => {
        try {
            const { data } = await api.get(`/users?page=${pageNumber}&limit=10`);
            setUsers(data.users);
            setPage(data.page);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleSuspend = async (id: string, currentStatus: boolean) => {
        if (window.confirm(`Are you sure you want to ${currentStatus ? 'ACTIVATE' : 'SUSPEND'} this user?`)) {
            try {
                const { data } = await api.put(`/users/${id}/suspend`, { isSuspended: !currentStatus });
                setUsers(users.map(u => u._id === id ? { ...u, isSuspended: data.isSuspended } : u));
            } catch (error) {
                console.error('Error suspending user:', error);
                alert('Failed to update suspension status');
            }
        }
    };

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/users', newUser);
            setShowCreateModal(false);
            setNewUser({ name: '', email: '', phone: '', password: '', role: 'user' });
            fetchUsers(1);
            alert('User created successfully');
        } catch (error: any) {
            console.error('Error creating user:', error);
            alert(error.response?.data?.message || 'Failed to create user');
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                        + Add User
                    </button>
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold flex-1 md:flex-none text-center">
                        Total: {total}
                    </div>
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                            <tr className="border-b border-gray-50">
                                <th className="py-3 px-4 rounded-l-lg">Name</th>
                                <th className="py-3 px-4">Contact</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Joined Date</th>
                                <th className="py-3 px-4 rounded-r-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs mr-3">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-800">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">
                                        <div className="text-sm text-gray-800 font-medium">{user.phone || 'N/A'}</div>
                                        <div className="text-xs text-gray-400">{user.email}</div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 text-xs">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 flex items-center gap-2">
                                        <button
                                            onClick={() => handleSuspend(user._id, user.isSuspended)}
                                            className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all ${user.isSuspended ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' : 'bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100'}`}
                                            title={user.isSuspended ? "Activate User" : "Suspend User"}
                                        >
                                            {user.isSuspended ? "Activate" : "Suspend"}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                            title="Delete User"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400 italic bg-gray-50/30 rounded-lg m-4">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View (Small Screens) */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <div key={user._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800">{user.name}</h3>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleSuspend(user._id, user.isSuspended)}
                                    className={`p-2 rounded-lg border transition-all ${user.isSuspended ? 'bg-green-50 text-green-600 border-green-200' : 'bg-orange-50 text-orange-600 border-orange-200'}`}
                                    title={user.isSuspended ? "Activate User" : "Suspend User"}
                                >
                                    <User size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg border border-gray-100 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-gray-50">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-bold uppercase">Mobile</span>
                                <span className="text-sm font-medium text-gray-800">{user.phone || 'N/A'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-bold uppercase">Email</span>
                                <span className="text-sm font-medium text-gray-600">{user.email}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-bold uppercase">Joined</span>
                                <span className="text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-2">
                <button
                    disabled={page === 1}
                    onClick={() => fetchUsers(page - 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                    Previous
                </button>
                <span className="text-gray-500 text-sm">
                    Page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold">{pages}</span>
                </span>
                <button
                    disabled={page === pages}
                    onClick={() => fetchUsers(page + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                    Next
                </button>
            </div>

            {/* Create User Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">Create New User</h2>
                        <form onSubmit={handleCreateUser} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newUser.phone}
                                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newUser.role}
                                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    placeholder="Default: 123456"
                                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={newUser.password}
                                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
