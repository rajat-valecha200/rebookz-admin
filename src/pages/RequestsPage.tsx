import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Clock, CheckCircle, XCircle, User, Book as BookIcon } from 'lucide-react';

interface CategoryData {
    id: number;
    name: string;
    has_child: boolean;
    parent_id: number | null;
}

interface BookRequest {
    _id: string;
    title: string;
    description: string;
    category: string;
    user: {
        name: string;
        profileImage: string;
        phone?: string;
    };
    status: 'active' | 'fulfilled' | 'cancelled';
    createdAt: string;
}

const RequestsPage: React.FC = () => {
    const [requests, setRequests] = useState<BookRequest[]>([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [activeRequestId, setActiveRequestId] = useState<string | null>(null);

    // Categories
    const [allCategories, setAllCategories] = useState<CategoryData[]>([]);
    const [mainCategories, setMainCategories] = useState<CategoryData[]>([]);
    const [subCategories, setSubCategories] = useState<CategoryData[]>([]);
    const [selectedMainCat, setSelectedMainCat] = useState<number | ''>('');

    const [newBook, setNewBook] = useState({
        title: '',
        description: '',
        price: 0,
        category: '',
        categoryId: 0,
        subcategory: '',
        subcategoryId: 0,
        condition: 'good',
        type: 'sell',
        location: { address: 'Riyadh', lat: 24.7136, lng: 46.6753 },
        school: '',
        classLevel: '',
        sellerPhone: ''
    });

    useEffect(() => {
        fetchRequests();
        fetchCategories();
    }, []);

    // Filter subcategories when main category changes
    useEffect(() => {
        if (selectedMainCat) {
            const subs = allCategories.filter(c => c.parent_id === selectedMainCat);
            setSubCategories(subs);
            const mainName = allCategories.find(c => c.id === selectedMainCat)?.name || '';
            setNewBook(prev => ({
                ...prev,
                categoryId: Number(selectedMainCat),
                category: mainName,
                subcategory: '',
                subcategoryId: 0
            }));
        } else {
            setSubCategories([]);
        }
    }, [selectedMainCat, allCategories]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setAllCategories(data);
            setMainCategories(data.filter((c: CategoryData) => c.parent_id === null));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchRequests = async () => {
        try {
            const { data } = await api.get('/requests');
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: 'fulfilled' | 'cancelled') => {
        try {
            await api.put(`/requests/${id}`, { status });
            setRequests(requests.map(r => r._id === id ? { ...r, status } : r));
        } catch (error) {
            console.error('Error updating request:', error);
            alert('Failed to update request');
        }
    };

    const openFulfillModal = (request: BookRequest) => {
        // Find category if possible
        const matchedCat = allCategories.find(c => c.name.toLowerCase() === request.category.toLowerCase());

        setNewBook({
            title: request.title,
            description: request.description || '',
            price: 0,
            category: matchedCat ? matchedCat.name : request.category,
            categoryId: matchedCat ? matchedCat.id : 0,
            subcategory: '',
            subcategoryId: 0,
            condition: 'good',
            type: 'sell',
            location: { address: 'Riyadh', lat: 24.7136, lng: 46.6753 },
            school: '',
            classLevel: '',
            sellerPhone: ''
        });

        if (matchedCat) {
            setSelectedMainCat(matchedCat.id);
        } else {
            setSelectedMainCat('');
        }

        setActiveRequestId(request._id);
        setIsModalOpen(true);
    };

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let imageUrl = '';
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);
                const uploadRes = await api.post('/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                imageUrl = uploadRes.data.image;
            }

            await api.post('/books', {
                ...newBook,
                images: imageUrl ? [imageUrl] : []
            });

            if (!imageFile) {
                alert('Please upload a book cover image');
                return;
            }

            if (activeRequestId) {
                await handleUpdateStatus(activeRequestId, 'fulfilled');
            }

            setIsModalOpen(false);
            alert('Book added and request fulfilled successfully');

            // Reset
            setNewBook({
                title: '', description: '', price: 0,
                category: '', categoryId: 0,
                subcategory: '', subcategoryId: 0,
                condition: 'good', type: 'sell',
                location: { address: 'Riyadh', lat: 24.7136, lng: 46.6753 },
                school: '', classLevel: '',
                sellerPhone: ''
            });
            setSelectedMainCat('');
            setImageFile(null);
            setActiveRequestId(null);
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to fulfill request');
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">Book Requests</h1>
                    <p className="text-gray-500 font-medium">Manage books requested by users</p>
                </div>
                <div className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                        {requests.filter(r => r.status === 'active').length} Active
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((request) => (
                    <div key={request._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-xl hover:shadow-emerald-50 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-emerald-50 text-emerald-600 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                <BookIcon size={24} />
                            </div>
                            <StatusBadge status={request.status} />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={request.title}>
                            {request.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                            {request.description || "No description provided."}
                        </p>

                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                                <span className="bg-gray-100 px-2 py-0.5 rounded-md">{request.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User size={16} className="text-gray-400" />
                                <span className="font-bold">{request.user?.name || 'Unknown'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <Clock size={14} />
                                {new Date(request.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        {request.status === 'active' ? (
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                                <button
                                    onClick={() => openFulfillModal(request)}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-black text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                                >
                                    <CheckCircle size={14} /> Fulfill
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus(request._id, 'cancelled')}
                                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-100 text-gray-400 font-black text-xs hover:bg-gray-50 transition-all"
                                >
                                    <XCircle size={14} /> Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-50 text-center">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${request.status === 'fulfilled' ? 'text-emerald-500' : 'text-gray-400'
                                    }`}>
                                    Request {request.status}
                                </span>
                            </div>
                        )}
                    </div>
                ))}

                {requests.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                        No book requests found.
                    </div>
                )}
            </div>

            {/* Fulfill Request Modal (Exactly same as Books.tsx) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all scale-100 border border-gray-100">
                        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-800">Fulfill Request</h2>
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1">Listing this book will notify the requesting user</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                                <XCircle size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddBook} className="p-8 overflow-y-auto max-h-[75vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="col-span-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Book Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                        value={newBook.title}
                                        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                                        placeholder="Book Title"
                                    />
                                </div>

                                {/* Price */}
                                <div className={newBook.type === 'swap' || newBook.type === 'donate' ? 'opacity-50' : ''}>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price (SAR)</label>
                                    <input
                                        type="number"
                                        required={newBook.type === 'sell' || newBook.type === 'rent'}
                                        disabled={newBook.type === 'swap' || newBook.type === 'donate'}
                                        min="0"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                        value={newBook.price}
                                        onChange={e => setNewBook({ ...newBook, price: Number(e.target.value) })}
                                    />
                                </div>

                                {/* Condition */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Condition</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all bg-white"
                                        value={newBook.condition}
                                        onChange={e => setNewBook({ ...newBook, condition: e.target.value })}
                                    >
                                        <option value="new">New</option>
                                        <option value="like_new">Like New</option>
                                        <option value="good">Good</option>
                                        <option value="fair">Fair</option>
                                        <option value="poor">Poor</option>
                                    </select>
                                </div>

                                {/* Listing Type */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Listing Type</label>
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all bg-white"
                                        value={newBook.type}
                                        onChange={e => setNewBook({ ...newBook, type: e.target.value })}
                                    >
                                        <option value="sell">Sell</option>
                                        <option value="rent">Rent</option>
                                        <option value="swap">Swap</option>
                                        <option value="donate">Donate</option>
                                    </select>
                                </div>

                                {/* Category Selection */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                    <select
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all bg-white"
                                        value={selectedMainCat}
                                        onChange={e => setSelectedMainCat(Number(e.target.value))}
                                    >
                                        <option value="">Select Category</option>
                                        {mainCategories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Subcategory Selection */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Subcategory</label>
                                    <select
                                        className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all bg-white ${!selectedMainCat ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        value={newBook.subcategoryId || ''}
                                        disabled={!selectedMainCat}
                                        onChange={e => {
                                            const subId = Number(e.target.value);
                                            const subName = subCategories.find(s => s.id === subId)?.name || '';
                                            setNewBook({ ...newBook, subcategoryId: subId, subcategory: subName });
                                        }}
                                    >
                                        <option value="">Select Subcategory (Optional)</option>
                                        {subCategories.map(sub => (
                                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* School/Textbook Details */}
                                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-5 mt-2">
                                    <div className="col-span-2 text-sm font-bold text-gray-800 mb-1">School / Textbook Details (Optional)</div>
                                    <div>
                                        <label className="block text-gray-700 text-xs font-bold mb-2">School/Board</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                                            value={newBook.school}
                                            onChange={e => setNewBook({ ...newBook, school: e.target.value })}
                                            placeholder="e.g. DPS Riyadh"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-xs font-bold mb-2">Class/Level</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                                            value={newBook.classLevel}
                                            onChange={e => setNewBook({ ...newBook, classLevel: e.target.value })}
                                            placeholder="e.g. Grade 10"
                                        />
                                    </div>
                                </div>

                                {/* Book Cover */}
                                <div className="col-span-2 border-t border-gray-100 pt-5 mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Book Cover Image *</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            required
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageFile(e.target.files[0]);
                                                }
                                            }}
                                            className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Custom Seller Phone */}
                                <div className="col-span-2 border-t border-gray-100 pt-5 mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Custom Seller Phone (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none"
                                        value={newBook.sellerPhone}
                                        onChange={e => setNewBook({ ...newBook, sellerPhone: e.target.value })}
                                        placeholder="e.g. +96650XXXXXXX"
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">Leave blank to use default admin info</p>
                                </div>

                                {/* Description */}
                                <div className="col-span-2 border-t border-gray-100 pt-5 mt-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 outline-none min-h-[100px]"
                                        rows={4}
                                        value={newBook.description}
                                        onChange={e => setNewBook({ ...newBook, description: e.target.value })}
                                        placeholder="Detailed description of the book..."
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5"
                                >
                                    Fulfill & List Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        active: 'bg-blue-50 text-blue-600 border-blue-100',
        fulfilled: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        cancelled: 'bg-gray-50 text-gray-400 border-gray-100',
    };
    return (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
            {status}
        </span>
    );
};

export default RequestsPage;
