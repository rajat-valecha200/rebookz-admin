import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/admin');
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-100/40 rounded-full blur-[100px] animate-pulse delay-700" />

            <div className="w-full max-w-md p-4 relative z-10 animate-in fade-in zoom-in duration-500">
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-800 p-10 text-center text-white relative h-40 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                            <div className="grid grid-cols-4 gap-4 rotate-12 -translate-y-10">
                                {[...Array(12)].map((_, i) => (
                                    <BookOpen key={i} size={40} className="text-white" />
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md mb-4 inline-block shadow-lg border border-white/30">
                            <BookOpen size={36} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight">System Admin</h1>
                        <p className="text-blue-100/80 text-xs font-bold uppercase tracking-[0.2em] mt-1">ReBookz Portal</p>
                    </div>

                    {/* Form Container */}
                    <div className="p-10">
                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-black text-gray-800">Welcome Back</h2>
                            <p className="text-gray-400 text-sm font-medium mt-1">Enter your credentials to continue</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="block text-gray-700 text-xs font-black uppercase tracking-wider ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-800 placeholder-gray-300"
                                        placeholder="admin@rebookz.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-gray-700 text-xs font-black uppercase tracking-wider ml-1">Secure Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                    <input
                                        type="password"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-800 placeholder-gray-300"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs py-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input type="checkbox" className="w-4 h-4 rounded-md border-gray-200 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer" />
                                    <span className="text-gray-500 font-bold group-hover:text-gray-700 transition-colors">Keep me signed in</span>
                                </label>
                                <a href="#" className="text-blue-600 font-black hover:underline tracking-tight">Forgot Keys?</a>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:shadow-xl hover:shadow-blue-200 text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 group"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Authorize Session</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center mt-8 text-gray-400 text-[10px] font-black uppercase tracking-widest px-4">
                    Secure Admin Access Protected by ReBookz Security Systems Inc.
                </p>
            </div>
        </div>
    );
};

export default Login;
