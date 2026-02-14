import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Clock, MessageSquare, Send, X, CheckCircle } from 'lucide-react';

interface Ticket {
    _id: string;
    category: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
    adminResponse?: string;
    contactEmail?: string;
    contactPhone?: string;
    user?: {
        name: string;
        email: string;
        phone: string;
    };
    createdAt: string;
}

const SupportPage: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [adminReply, setAdminReply] = useState('');
    const [replyStatus, setReplyStatus] = useState<'open' | 'in_progress' | 'closed'>('closed');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const { data } = await api.get('/support');
            setTickets(data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenReply = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setAdminReply(ticket.adminResponse || '');
        setReplyStatus(ticket.status);
    };

    const handleSendReply = async () => {
        if (!selectedTicket) return;
        setIsSubmitting(true);
        try {
            await api.put(`/support/${selectedTicket._id}/reply`, {
                adminResponse: adminReply,
                status: replyStatus
            });
            await fetchTickets();
            setSelectedTicket(null);
        } catch (error) {
            console.error('Error sending reply:', error);
            alert('Failed to send reply');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-black text-gray-800">Support Tickets</h1>
                <div className="flex gap-2">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold">
                        {tickets.filter(t => t.status === 'open').length} Open
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
                        {tickets.filter(t => t.status === 'in_progress').length} In Progress
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hidden md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50/50 text-gray-500 text-[10px] uppercase font-black tracking-widest">
                            <tr className="border-b border-gray-50">
                                <th className="py-5 px-6">User / Contact</th>
                                <th className="py-5 px-6">Category</th>
                                <th className="py-5 px-6">Description</th>
                                <th className="py-5 px-6">Status</th>
                                <th className="py-5 px-6">Admin Reply</th>
                                <th className="py-5 px-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-blue-600">
                                                {(ticket.user?.name || 'G').charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{ticket.user?.name || 'Guest'}</div>
                                                <div className="text-xs text-gray-400">
                                                    {ticket.contactEmail || ticket.user?.email || 'No email'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="text-xs font-black text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                            {ticket.category}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="text-sm text-gray-600 max-w-xs truncate" title={ticket.description}>
                                            {ticket.description}
                                        </div>
                                        <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                                            <Clock size={10} /> {new Date(ticket.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <StatusBadge status={ticket.status} />
                                    </td>
                                    <td className="py-5 px-6">
                                        {ticket.adminResponse ? (
                                            <div className="flex items-center gap-2 text-xs text-green-600 font-bold">
                                                <CheckCircle size={14} /> Replied
                                            </div>
                                        ) : (
                                            <div className="text-[10px] text-gray-300 font-black uppercase tracking-wider">Pending</div>
                                        )}
                                    </td>
                                    <td className="py-5 px-6 text-right">
                                        <button
                                            onClick={() => handleOpenReply(ticket)}
                                            className="bg-white border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600 p-2 rounded-xl transition-all shadow-sm group-hover:shadow-md"
                                        >
                                            <MessageSquare size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 space-y-4">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black text-blue-600">
                                    {(ticket.user?.name || 'G').charAt(0).toUpperCase()}
                                </div>
                                <div className="space-y-0.5">
                                    <div className="font-bold text-gray-800 text-sm leading-tight">{ticket.user?.name || 'Guest'}</div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{ticket.category}</div>
                                </div>
                            </div>
                            <StatusBadge status={ticket.status} />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                {ticket.description}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <Clock size={10} /> {new Date(ticket.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                            <div>
                                {ticket.adminResponse ? (
                                    <div className="flex items-center gap-1.5 text-[10px] text-green-600 font-black uppercase tracking-widest">
                                        <CheckCircle size={12} /> Replied
                                    </div>
                                ) : (
                                    <div className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Pending Response</div>
                                )}
                            </div>
                            <button
                                onClick={() => handleOpenReply(ticket)}
                                className="flex items-center gap-2 bg-blue-600 text-white text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
                            >
                                <MessageSquare size={14} /> Reply
                            </button>
                        </div>
                    </div>
                ))}
                {tickets.length === 0 && (
                    <div className="py-20 text-center text-gray-400 italic font-medium">
                        No support tickets found
                    </div>
                )}
            </div>

            {/* Reply Modal */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-300">
                        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <h2 className="text-xl font-black text-gray-800">Reply to Ticket</h2>
                                <p className="text-xs text-gray-400 font-bold mt-0.5 uppercase tracking-wider">Ref: {selectedTicket._id.slice(-6)}</p>
                            </div>
                            <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-white rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">Original Message</p>
                                <p className="text-sm text-gray-700 leading-relaxed italic">"{selectedTicket.description}"</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Admin Response</label>
                                    <textarea
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all text-sm min-h-[120px] resize-none"
                                        value={adminReply}
                                        onChange={(e) => setAdminReply(e.target.value)}
                                        placeholder="Type your response here..."
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Ticket Status</label>
                                    <div className="flex gap-2">
                                        {(['in_progress', 'closed'] as const).map((s) => (
                                            <button
                                                key={s}
                                                type="button"
                                                onClick={() => setReplyStatus(s)}
                                                className={`flex-1 py-3 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all ${replyStatus === s
                                                    ? 'bg-gray-900 border-gray-900 text-white shadow-lg'
                                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                                                    }`}
                                            >
                                                {s.replace('_', ' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-8 pb-8 pt-2 flex gap-3">
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="flex-1 py-4 rounded-2xl text-sm font-black text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSendReply}
                                disabled={isSubmitting || !adminReply}
                                className="flex-[2] py-4 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><Send size={18} /> Send & Update</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        open: 'bg-red-50 text-red-600 border-red-100',
        in_progress: 'bg-orange-50 text-orange-600 border-orange-100',
        closed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles[status] || 'bg-gray-50 text-gray-400 border-gray-100'}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

export default SupportPage;
