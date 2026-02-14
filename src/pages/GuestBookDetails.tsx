import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { SERVER_URL } from '../services/api';
import logoHorizontal from '../assets/logo-horizontal.png';
import { Smartphone, BookOpen, Calendar, Download } from 'lucide-react';

interface Book {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    type: string;
    images: string[];
    condition: string;
    createdAt: string;
    seller?: {
        name: string;
    };
}

const GuestBookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await api.get(`/books/${id}`);
                setBook(data);
            } catch (err: any) {
                console.error('Error fetching book:', err);
                setError(err.response?.data?.message || 'Failed to load book details');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBook();
    }, [id]);

    const handleOpenInApp = () => {
        if (book) {
            window.location.href = `rebookzapp://book/${book._id}`;
            // Optional: Fallback to app store if not opened within 2 seconds
            /*
            setTimeout(() => {
                window.location.href = 'https://rebookz.com/download';
            }, 2000);
            */
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mb-6">
                    <BookOpen size={40} />
                </div>
                <h1 className="text-2xl font-black text-gray-800 mb-2">Book Not Found</h1>
                <p className="text-gray-500 mb-8 max-w-xs">{error || "The book you're looking for might have been sold or removed."}</p>
                <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all">
                    Go to Homepage
                </Link>
            </div>
        );
    }

    const bookImage = book.images && book.images.length > 0
        ? (book.images[0].startsWith('http') ? book.images[0] : `${SERVER_URL}${book.images[0]}`)
        : null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Minimal Header */}
            <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logoHorizontal} alt="ReBookz" className="h-7 hover:opacity-80 transition-opacity" />
                    </Link>
                    <button
                        onClick={handleOpenInApp}
                        className="bg-blue-600 text-white px-4 py-2 rounded-xl font-black text-xs shadow-lg shadow-blue-100 flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        <Download size={14} /> Open in App
                    </button>
                </div>
            </nav>

            <main className="flex-1 max-w-5xl mx-auto w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Left: Image Section */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100 aspect-square flex items-center justify-center p-4">
                        {bookImage ? (
                            <img
                                src={bookImage}
                                alt={book.title}
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        ) : (
                            <div className="flex flex-col items-center text-gray-300">
                                <BookOpen size={80} />
                                <span className="mt-4 font-bold uppercase tracking-widest text-xs">No Image Available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Info Section */}
                <div className="flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${book.type === 'sell' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                book.type === 'rent' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                    'bg-emerald-50 text-emerald-600 border-emerald-100'
                                }`}>
                                {book.type === 'sell' ? 'Buy' : book.type.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{book.category}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                            {book.title}
                        </h1>
                        <p className="text-2xl font-black text-blue-600">
                            {book.price > 0 ? `SAR ${book.price}` : 'FREE'}
                        </p>
                    </div>

                    <div className="space-y-4 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 text-gray-600 group">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                <Smartphone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Seller</p>
                                <p className="font-bold text-gray-800">{book.seller?.name || 'Community Member'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 group">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Condition</p>
                                <p className="font-bold text-gray-800 capitalize">{book.condition.replace('_', ' ')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <p className="text-gray-500 font-medium leading-relaxed">
                            {book.description}
                        </p>
                    </div>

                    <div className="pt-8">
                        <button
                            onClick={handleOpenInApp}
                            className="w-full bg-gray-950 text-white py-5 rounded-2xl font-black text-lg shadow-2xl flex items-center justify-center gap-3 hover:bg-black transform hover:-translate-y-1 transition-all active:scale-95"
                        >
                            <Smartphone size={24} /> Get Offer in ReBookz App
                        </button>
                        <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                            Available on iOS and Android
                        </p>
                    </div>
                </div>
            </main>

            <footer className="py-12 px-6 border-t border-gray-100 mt-20 text-center">
                <img src={logoHorizontal} alt="ReBookz" className="h-6 mx-auto mb-6 opacity-30 grayscale" />
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">&copy; {new Date().getFullYear()} ReBookz Saudi. Made for the Community.</p>
            </footer>
        </div>
    );
};

export default GuestBookDetails;
