import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, BookOpen, ShoppingBag, TrendingUp } from 'lucide-react';

interface Stats {
    totalUsers: number;
    totalBooks: number;
    totalSold: number;
    recentBooks: any[];
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

    if (loading) return <div>Loading stats...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Users"
                    value={stats?.totalUsers || 0}
                    icon={<Users className="text-blue-500" size={24} />}
                    bg="bg-blue-50"
                />
                <StatCard
                    title="Total Books"
                    value={stats?.totalBooks || 0}
                    icon={<BookOpen className="text-green-500" size={24} />}
                    bg="bg-green-50"
                />
                <StatCard
                    title="Sold Books"
                    value={stats?.totalSold || 0}
                    icon={<ShoppingBag className="text-purple-500" size={24} />}
                    bg="bg-purple-50"
                />
                <StatCard
                    title="Active Listings"
                    value={(stats?.totalBooks || 0) - (stats?.totalSold || 0)}
                    icon={<TrendingUp className="text-orange-500" size={24} />}
                    bg="bg-orange-50"
                />
            </div>

            {/* Recent Activity / Recent Books */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Recent Listings</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-gray-500 text-sm">
                                <th className="pb-3 px-4">Title</th>
                                <th className="pb-3 px-4">Seller</th>
                                <th className="pb-3 px-4">Price</th>
                                <th className="pb-3 px-4">Status</th>
                                <th className="pb-3 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats?.recentBooks?.map((book: any) => (
                                <tr key={book._id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium text-gray-800">{book.title}</td>
                                    <td className="py-3 px-4 text-gray-600">{book.seller?.name || 'Unknown'}</td>
                                    <td className="py-3 px-4 font-bold text-gray-700">SAR {book.price}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${book.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 text-sm">
                                        {new Date(book.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {(!stats?.recentBooks || stats.recentBooks.length === 0) && (
                                <tr>
                                    <td colSpan={5} className="py-4 text-center text-gray-500">No books found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, bg }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-3 rounded-full ${bg}`}>
            {icon}
        </div>
    </div>
);

export default Dashboard;
