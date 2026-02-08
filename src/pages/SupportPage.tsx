import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Clock } from 'lucide-react';

interface Ticket {
    _id: string;
    category: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
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

    if (loading) return <div className="p-8 text-center text-gray-500">Loading tickets...</div>;

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Support Tickets</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-medium">
                            <tr className="border-b border-gray-50">
                                <th className="py-3 px-4 rounded-l-lg">User / Contact</th>
                                <th className="py-3 px-4">Category</th>
                                <th className="py-3 px-4">Description</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 rounded-r-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-red-50/30 transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="font-medium text-gray-800">{ticket.user?.name || 'Guest'}</div>
                                        <div className="text-xs text-gray-400">
                                            {ticket.contactEmail || ticket.user?.email || 'No email'}
                                        </div>
                                        <div className="text-[10px] text-blue-600 font-bold mt-1">
                                            {ticket.contactPhone || ticket.user?.phone || 'No phone'}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 font-medium">
                                        {ticket.category}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm text-gray-600 max-w-xs truncate" title={ticket.description}>
                                            {ticket.description}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                                            ticket.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {ticket.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-gray-400 text-xs">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tickets.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-gray-400 italic bg-gray-50/30 rounded-lg m-4">No support tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SupportPage;
