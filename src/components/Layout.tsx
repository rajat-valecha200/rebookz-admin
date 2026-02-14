import React, { useState } from 'react';
import logoHorizontal from '../assets/logo-horizontal.png';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Users, LogOut, Tags, Moon, Sun, MessageSquare, Bell, TrendingUp } from 'lucide-react';

const Layout: React.FC = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // App Theme Colors
    const colors = {
        primary: '#2CB5A0', // Green/Teal
        accent: '#F4A261',  // Orange
    };

    const toggleTheme = () => setIsDarkMode(!isDarkMode);

    const menuItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/books', icon: <BookOpen size={20} />, label: 'Books' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/admin/categories', icon: <Tags size={20} />, label: 'Categories' },
        { path: '/admin/requests', icon: <Bell size={20} />, label: 'Requested Books' },
        { path: '/admin/support', icon: <MessageSquare size={20} />, label: 'Support' },
        { path: '/admin/feedback', icon: <TrendingUp size={20} />, label: 'Feedback' },
    ];


    const mainBg = isDarkMode ? 'bg-[#111]' : 'bg-gray-50';

    return (
        <div className={`flex h-screen w-full transition-colors duration-300 ${mainBg}`}>
            {/* Desktop Sidebar */}
            <aside className={`hidden md:flex flex-col w-64 shadow-lg z-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-r border-gray-800' : 'bg-white border-r border-gray-100'}`}>
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <img src={logoHorizontal} alt="ReBookz" className="h-10 mb-1" />
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Admin Panel</p>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                            ? 'font-medium shadow-sm'
                                            : isDarkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        style={isActive ? { backgroundColor: `${colors.primary}15`, color: colors.primary } : {}}
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                    <div className="flex items-center justify-between mb-6 px-2">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Theme</span>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                    </div>

                    <div className={`flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                        <div className="rounded-full w-8 h-8 flex items-center justify-center font-bold text-white shadow-sm" style={{ backgroundColor: colors.accent }}>
                            {user?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} truncate`}>{user?.name}</p>
                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'} truncate`}>{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center justify-center space-x-2 px-4 py-2 w-full text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors mt-2"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className={`md:hidden fixed top-0 w-full h-16 z-40 px-4 flex items-center justify-between shadow-sm transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-b border-gray-800' : 'bg-white border-b border-gray-100'}`}>
                <div className="flex items-center gap-2">
                    <img src={logoHorizontal} alt="ReBookz" className="h-8" />
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm" style={{ backgroundColor: colors.accent }}>
                        {user?.name?.charAt(0) || 'A'}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className={`flex-1 overflow-auto w-full transition-colors duration-300 ${mainBg}`}>
                <div className="p-4 md:p-8 pt-20 pb-24 md:pt-8 md:pb-8">
                    {/* Pass isDarkMode to context if needed, or children can inspect local storage/context yourself. 
                         For now, we just style the Layout container. If pages need dark mode, they should use transparent backgrounds or text colors that adapt.
                     */}
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className={`md:hidden fixed bottom-0 w-full h-16 z-40 px-6 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300 ${isDarkMode ? 'bg-[#1a1a1a] border-t border-gray-800' : 'bg-white border-t border-gray-100'}`}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${isActive ? 'transform scale-110' : 'text-gray-400'
                                }`}
                            style={{ color: isActive ? colors.primary : undefined }}
                        >
                            {React.cloneElement(item.icon as React.ReactElement<any>, { size: 24, strokeWidth: isActive ? 2.5 : 2 })}
                            {/* <span className="text-[10px] font-medium mt-1">{item.label}</span>  Optional: Hide labels for cleaner look */}
                        </Link>
                    );
                })}
                <button
                    onClick={logout}
                    className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <LogOut size={24} />
                </button>
            </nav>
        </div>
    );
};

export default Layout;
