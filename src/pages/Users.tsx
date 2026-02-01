import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, User } from 'lucide-react';

interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold flex-1 md:flex-none text-center">
                    Total Users: {total}
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-gray-50/50">
                            <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                <th className="py-4 px-6 font-medium">Name</th>
                                <th className="py-4 px-6 font-medium">Contact</th>
                                <th className="py-4 px-6 font-medium">Role</th>
                                <th className="py-4 px-6 font-medium">Joined Date</th>
                                <th className="py-4 px-6 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            <div className="bg-gray-100 rounded-full p-2 mr-3 text-gray-400">
                                                <User size={18} />
                                            </div>
                                            <span className="font-medium text-gray-800">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        <div className="text-sm text-gray-800 font-medium">{user.phone || 'N/A'}</div>
                                        <div className="text-xs text-gray-400">{user.email}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-gray-500 text-sm">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                            title="Delete User"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400 italic">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {users.map((user) => (
                    <div key={user._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
                                    <User size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">{user.name}</h3>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                {user.role}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4 pl-1">
                            <div>
                                <span className="text-gray-400 text-xs block">Phone</span>
                                <span className="font-medium">{user.phone || 'N/A'}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 text-xs block">Joined</span>
                                <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-gray-50">
                            <button
                                onClick={() => handleDelete(user._id)}
                                className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16} className="mr-1.5" />
                                Remove User
                            </button>
                        </div>
                    </div>
                ))}
                {users.length === 0 && (
                    <div className="text-center py-10 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No users found.
                    </div>
                )}
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
        </div >
    );
};

export default UsersPage;
