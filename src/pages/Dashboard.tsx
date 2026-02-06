import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, BookOpen, ShoppingBag, TrendingUp, MessageSquare, Clock } from 'lucide-react';

interface Stats {
    totalUsers: number;
    totalBooks: number;
    totalSold: number;
    totalRequests: number;
    recentBooks: any[];
    recentRequests: any[];
    recentUsers: any[];
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

            {/* Stats Cards Grid - Enhanced UI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={<Users className="text-white" size={24} />}
                    color="bg-gradient-to-r from-blue-500 to-blue-600"
                />
                <StatCard
                    title="Total Books"
                    value={stats?.totalBooks || 0}
                    icon={<BookOpen className="text-white" size={24} />}
                    color="bg-gradient-to-r from-emerald-500 to-emerald-600"
                />
                <StatCard
                    title="Sold Books"
                    value={stats?.totalSold || 0}
                    icon={<ShoppingBag className="text-white" size={24} />}
                    color="bg-gradient-to-r from-purple-500 to-purple-600"
                />
                <StatCard
                    title="Active Requests"
                    value={stats?.totalRequests || 0}
                    icon={<MessageSquare className="text-white" size={24} />}
                    color="bg-gradient-to-r from-orange-500 to-orange-600"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Recent Books Column */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={18} className="text-blue-500" /> Recent Listings
                        </h2>
                    </div>
                    <div className="overflow-x-auto flex-1 p-2">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                                <tr>
                                    <th className="py-3 px-4 rounded-l-lg">Title</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4 rounded-r-lg">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats?.recentBooks?.map((book: any) => (
                                    <tr key={book._id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-800 truncate max-w-[180px]" title={book.title}>
                                                {book.title}
                                            </div>
                                            <div className="text-xs text-gray-400">{book.seller?.name || 'Unknown'}</div>
                                        </td>
                                        <td className="py-3 px-4 font-semibold text-gray-700">SAR {book.price}</td>
                                        <td className="py-3 px-4">
                                            <StatusBadge status={book.status} />
                                        </td>
                                        <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">
                                            {new Date(book.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {!stats?.recentBooks?.length && <EmptyRow colSpan={4} message="No books listed yet." />}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: User Activity & Requests */}
                <div className="flex flex-col gap-8">

                    {/* User Activity (Recent Signups) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <Users size={18} className="text-emerald-500" /> New Users
                            </h2>
                        </div>
                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="py-3 px-4 rounded-l-lg">User</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4 rounded-r-lg">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats?.recentUsers?.map((user: any) => (
                                        <tr key={user._id} className="hover:bg-emerald-50/30 transition-colors">
                                            <td className="py-3 px-4 font-medium text-gray-800 flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                                                    {user.name?.charAt(0).toUpperCase()}
                                                </div>
                                                {user.name}
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-500 truncate max-w-[150px]">{user.email}</td>
                                            <td className="py-3 px-4 text-xs text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {!stats?.recentUsers?.length && <EmptyRow colSpan={3} message="No new users." />}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Requests */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                                <MessageSquare size={18} className="text-orange-500" /> Recent Requests
                            </h2>
                        </div>
                        <div className="overflow-x-auto p-2">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                                    <tr>
                                        <th className="py-3 px-4 rounded-l-lg">Book Title</th>
                                        <th className="py-3 px-4">Requested By</th>
                                        <th className="py-3 px-4 rounded-r-lg">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {stats?.recentRequests?.map((req: any) => (
                                        <tr key={req._id} className="hover:bg-orange-50/30 transition-colors">
                                            <td className="py-3 px-4 font-medium text-gray-800 truncate max-w-[200px]">{req.title}</td>
                                            <td className="py-3 px-4 text-sm text-gray-500">{req.user?.name || 'Unknown'}</td>
                                            <td className="py-3 px-4 text-xs text-gray-400">
                                                {new Date(req.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {!stats?.recentRequests?.length && <EmptyRow colSpan={3} message="No requests found." />}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-4 rounded-xl shadow-lg ${color}`}>
            {icon}
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        available: 'bg-green-100 text-green-700',
        sold: 'bg-blue-100 text-blue-700',
        active: 'bg-green-100 text-green-700',
        inactive: 'bg-gray-100 text-gray-600',
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
            {status}
        </span>
    );
};

const EmptyRow = ({ colSpan, message }: { colSpan: number, message: string }) => (
    <tr>
        <td colSpan={colSpan} className="py-8 text-center text-gray-400 italic bg-gray-50/30 rounded-lg m-2">
            {message}
        </td>
    </tr>
);

export default Dashboard;
