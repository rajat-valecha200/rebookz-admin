import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, BookOpen, ShoppingBag, TrendingUp, MessageSquare, Clock, PlusCircle, LayoutGrid, ArrowRight, Calendar, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    const [greeting, setGreeting] = useState('');

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

        const hours = new Date().getHours();
        if (hours < 12) setGreeting('Good Morning');
        else if (hours < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');

        fetchStats();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    const quickActions = [
        { title: 'Add New Book', icon: <PlusCircle size={20} />, link: 'books', color: 'bg-blue-500', hover: 'hover:bg-blue-600' },
        { title: 'Manage Users', icon: <Users size={20} />, link: 'users', color: 'bg-emerald-500', hover: 'hover:bg-emerald-600' },
        { title: 'Support Tickets', icon: <MessageSquare size={20} />, link: 'support', color: 'bg-purple-500', hover: 'hover:bg-purple-600' },
        { title: 'Categories', icon: <LayoutGrid size={20} />, link: 'categories', color: 'bg-orange-500', hover: 'hover:bg-orange-600' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Hero Welcome Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-200">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2 opacity-90">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
                            {greeting}, <span className="text-blue-200">Admin</span>
                        </h1>
                        <p className="text-blue-100/80 text-lg font-medium max-w-md">
                            Welcome back to ReBookz. Here's what's happening in your community today.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[100px]">
                            <p className="text-3xl font-black">{stats?.totalBooks || 0}</p>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-60">Total Books</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[100px]">
                            <p className="text-3xl font-black">{stats?.totalUsers || 0}</p>
                            <p className="text-xs font-bold uppercase tracking-wider opacity-60">Total Users</p>
                        </div>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {quickActions.map((action, idx) => (
                    <Link
                        key={idx}
                        to={action.link}
                        className="group bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start gap-4 hover:shadow-xl hover:shadow-blue-50 hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`${action.color} p-3 rounded-xl text-white shadow-lg transition-transform group-hover:scale-110`}>
                            {action.icon}
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <span className="font-bold text-gray-800 text-sm md:text-base">{action.title}</span>
                            <ArrowRight size={16} className="text-gray-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Stats Cards Grid - Enhanced UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Platform Activity"
                    value={stats?.totalUsers || 0}
                    label="Active Users"
                    icon={<Users size={22} />}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                    progress={75}
                />
                <StatCard
                    title="Inventory"
                    value={stats?.totalBooks || 0}
                    label="Books Listed"
                    icon={<BookOpen size={22} />}
                    color="text-emerald-600"
                    bgColor="bg-emerald-50"
                    progress={stats?.totalBooks ? Math.min((stats.totalBooks / 500) * 100, 100) : 0}
                />
                <StatCard
                    title="Market Success"
                    value={stats?.totalSold || 0}
                    label="Items Sold"
                    icon={<ShoppingBag size={22} />}
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                    progress={stats?.totalBooks ? (stats.totalSold / stats.totalBooks) * 100 : 0}
                />
                <StatCard
                    title="Pending Tasks"
                    value={stats?.totalRequests || 0}
                    label="Unread Issues"
                    icon={<MessageSquare size={22} />}
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                    progress={20}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-8">

                {/* Recent Books (Takes 2 columns on large screens) */}
                <div className="xl:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <BookOpen size={20} className="text-blue-500" /> Recent Listings
                        </h2>
                        <Link to="books" className="text-blue-600 text-sm font-bold hover:underline py-1 px-2">View All</Link>
                    </div>
                    <div className="overflow-x-auto p-2">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="py-4 px-4">Title</th>
                                    <th className="py-4 px-4">Price</th>
                                    <th className="py-4 px-4">Status</th>
                                    <th className="py-4 px-4 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats?.recentBooks?.map((book: any) => (
                                    <tr key={book._id} className="hover:bg-blue-50/40 transition-colors group cursor-pointer">
                                        <td className="py-4 px-4">
                                            <div className="font-bold text-gray-800 truncate max-w-[200px]" title={book.title}>
                                                {book.title}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                                                <Users size={12} className="opacity-50" /> {book.seller?.name || 'Anonymous'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-black text-gray-900">SAR {book.price}</span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <StatusBadge status={book.status} />
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                                                {new Date(book.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {!stats?.recentBooks?.length && <EmptyRow colSpan={4} message="No books listed yet." />}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar Column: New Users */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-lg font-black text-gray-800 flex items-center gap-2">
                                <Users size={18} className="text-emerald-500" /> New Users
                            </h2>
                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">New</span>
                        </div>
                        <div className="p-4 space-y-4">
                            {stats?.recentUsers?.map((user: any) => (
                                <div key={user._id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm shadow-inner">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm leading-none mb-1">{user.name}</p>
                                            <p className="text-[11px] text-gray-400 font-medium truncate w-32">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-gray-300 flex items-center gap-1">
                                        <Clock size={10} />
                                        {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                </div>
                            ))}
                            {!stats?.recentUsers?.length && <div className="py-8 text-center text-gray-400 italic text-sm">No new signups</div>}
                        </div>
                        <Link to="users" className="block text-center py-4 text-xs font-black text-emerald-600 bg-emerald-50/50 hover:bg-emerald-50 transition-colors uppercase tracking-widest mt-auto border-t border-emerald-100/50">
                            See All Users
                        </Link>
                    </div>

                    {/* Mini Notifications / Info card */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h4 className="font-black text-lg mb-1">Support Active</h4>
                            <p className="text-indigo-100 text-sm mb-4 opacity-80">There are {stats?.totalRequests || 0} unanswered messages requiring attention.</p>
                            <Link to="support" className="inline-flex items-center gap-2 bg-white text-indigo-600 rounded-xl px-4 py-2 text-xs font-black hover:bg-indigo-50 transition-all group-hover:gap-3 shadow-lg">
                                Manage Requests <ArrowRight size={14} />
                            </Link>
                        </div>
                        <Bell className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, label, icon, color, bgColor, progress }: any) => (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all group">
        <div className="flex items-center justify-between mb-4">
            <div className={`${bgColor} ${color} p-3 rounded-2xl shadow-inner transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <TrendingUp size={16} className="text-gray-200" />
        </div>
        <div className="mb-4">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                <span className="text-[10px] font-bold text-gray-400">{label}</span>
            </div>
        </div>

        {/* Progress Bar / Mini Meta */}
        <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden mt-2 border border-gray-100">
            <div
                className={`h-full rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`}
                style={{ width: `${progress}%` }}
            />
        </div>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        available: 'bg-green-100 text-green-700 border-green-200',
        sold: 'bg-blue-100 text-blue-700 border-blue-200',
        active: 'bg-green-100 text-green-700 border-green-200',
        inactive: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles[status] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
            {status}
        </span>
    );
};

const EmptyRow = ({ colSpan, message }: { colSpan: number, message: string }) => (
    <tr>
        <td colSpan={colSpan} className="py-12 text-center text-gray-400 font-medium italic">
            {message}
        </td>
    </tr>
);

export default Dashboard;
