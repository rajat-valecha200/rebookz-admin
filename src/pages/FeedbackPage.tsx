import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Star, MessageCircle, Trash2 } from 'lucide-react';

interface Feedback {
    _id: string;
    type?: string;
    content: string;
    rating?: number;
    comment?: string;
    user?: {
        name: string;
        email: string;
    };
    createdAt: string;
}

const FeedbackPage: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        try {
            const { data } = await api.get('/feedback');
            setFeedbacks(data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this feedback?')) {
            try {
                await api.delete(`/feedback/${id}`);
                setFeedbacks(feedbacks.filter(f => f._id !== id));
            } catch (error) {
                console.error('Error deleting feedback:', error);
            }
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
    );

    const ratedFeedbacks = feedbacks.filter(f => f.rating !== undefined);
    const averageRating = ratedFeedbacks.length > 0
        ? (ratedFeedbacks.reduce((acc, curr) => acc + (curr.rating || 0), 0) / ratedFeedbacks.length).toFixed(1)
        : 0;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">User Feedback</h1>
                    <p className="text-gray-500 font-medium">What our community thinks about ReBookz</p>
                </div>

                <div className="bg-amber-50 rounded-[2rem] p-6 border border-amber-100 flex items-center gap-6">
                    <div>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Average Rating</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-amber-600">{averageRating}</span>
                            <span className="text-amber-400 font-bold">/ 5.0</span>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-amber-200" />
                    <div>
                        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Total Reviews</p>
                        <p className="text-2xl font-black text-amber-700">{feedbacks.length}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                {feedbacks.map((f) => (
                    <div key={f._id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-amber-50 transition-all flex flex-col relative group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex flex-col gap-2">
                                {f.type && (
                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest w-fit ${f.type === 'bug' ? 'bg-red-100 text-red-600' :
                                            f.type === 'suggestion' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {f.type}
                                    </span>
                                )}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star
                                            key={s}
                                            size={16}
                                            className={s <= (f.rating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-100"}
                                        />
                                    ))}
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{new Date(f.createdAt).toLocaleDateString()}</span>
                        </div>

                        <p className="text-gray-700 font-medium leading-relaxed mb-6 italic">
                            "{f.content || f.comment}"
                        </p>

                        <div className="mt-auto flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-black text-blue-600">
                                    {f.user?.name?.charAt(0) || 'U'}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 text-sm">{f.user?.name || 'Anonymous'}</p>
                                    <p className="text-xs text-gray-400">{f.user?.email || 'No email'}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(f._id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {feedbacks.length === 0 && (
                    <div className="col-span-full py-24 text-center text-gray-400 italic bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-100">
                        <MessageCircle size={48} className="mx-auto mb-4 opacity-20" />
                        No feedback items found yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;
