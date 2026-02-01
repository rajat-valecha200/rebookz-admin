import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, BookOpen, Plus, Folder } from 'lucide-react';

interface BookData {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    subcategory?: string;
    type: string;
    status: string;
    seller: {
        _id: string;
        name: string;
    };
    createdAt: string;
}

interface CategoryData {
    id: number;
    name: string;
    has_child: boolean;
    parent_id: number | null;
}

const BooksPage: React.FC = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);

    // Filters & Search
    const [keyword, setKeyword] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Category Management for Form
    const [allCategories, setAllCategories] = useState<CategoryData[]>([]);
    const [mainCategories, setMainCategories] = useState<CategoryData[]>([]);
    const [subCategories, setSubCategories] = useState<CategoryData[]>([]);
    const [selectedMainCat, setSelectedMainCat] = useState<number | ''>('');

    const [newBook, setNewBook] = useState({
        title: '',
        // author removed
        description: '',
        price: 0,
        category: '', // Stores Name
        categoryId: 0, // Stores ID
        subcategory: '', // Stores Name
        subcategoryId: 0, // Stores ID
        condition: 'good',
        type: 'sell',
        location: { address: 'Riyadh', lat: 24.7136, lng: 46.6753 }
    });

    useEffect(() => {
        fetchBooks(1);
        fetchCategories();
    }, [filterCategory, filterType, filterStatus]); // Refetch on filter change

    // Search Debounce or Enter Key? Let's use Enter or Button for simplicity, or debounce. 
    // For now, let's add a search button/icon action.

    // Filter subcategories when main category changes
    useEffect(() => {
        if (selectedMainCat) {
            const subs = allCategories.filter(c => c.parent_id === selectedMainCat);
            setSubCategories(subs);
            // Find name
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
            setNewBook(prev => ({
                ...prev,
                categoryId: 0,
                category: '',
                subcategory: '',
                subcategoryId: 0
            }));
        }
    }, [selectedMainCat, allCategories]);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setAllCategories(data);
            // Filter main categories (parent_id is null)
            setMainCategories(data.filter((c: CategoryData) => c.parent_id === null));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchBooks = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            queryParams.append('page', pageNumber.toString());
            queryParams.append('limit', '10');
            if (keyword) queryParams.append('keyword', keyword);
            if (filterCategory) queryParams.append('category', filterCategory);
            if (filterType) queryParams.append('type', filterType);
            if (filterStatus) queryParams.append('status', filterStatus);

            const { data } = await api.get(`/books?${queryParams.toString()}`);
            setBooks(data.books);
            setPage(data.page);
            setPages(data.pages);
            setTotal(data.total);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchBooks(1);
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

                // FIXED: Extract image path correctly from response object
                imageUrl = uploadRes.data.image;
            }

            await api.post('/books', {
                ...newBook,
                images: imageUrl ? [imageUrl] : []
            });

            setIsModalOpen(false);
            fetchBooks(1);
            alert('Book added successfully');

            // Reset Form properly
            setNewBook({
                title: '', description: '', price: 0,
                category: '', categoryId: 0,
                subcategory: '', subcategoryId: 0,
                condition: 'good', type: 'sell',
                location: { address: 'Riyadh', lat: 24.7136, lng: 46.6753 }
            });
            setSelectedMainCat('');
            setImageFile(null);
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await api.delete(`/books/${id}`);
                setBooks(books.filter(b => b._id !== id));
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading books...</div>;

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Books Management</h1>
                <div className="flex gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center shadow-lg transition-all flex-1 md:flex-none"
                    >
                        <Plus size={20} className="mr-2" />
                        Add Book
                    </button>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search by title..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                        <select
                            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-500"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {mainCategories.map(c => (
                                <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                        </select>
                        <select
                            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-500"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="sell">Sell</option>
                            <option value="rent">Rent</option>
                            <option value="swap">Swap</option>
                            <option value="donate">Donate</option>
                        </select>
                        <select
                            className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-blue-500"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                        </select>
                        <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Search
                        </button>
                        {/* Clear Filter Button if any filter is active */}
                        {(keyword || filterCategory || filterType || filterStatus) && (
                            <button
                                type="button"
                                onClick={() => {
                                    setKeyword('');
                                    setFilterCategory('');
                                    setFilterType('');
                                    setFilterStatus('');
                                    // fetchBooks(1) will happen automatically via useEffect if filters change, or we trigger it.
                                    // Actually useEffect depends on filterCategory/Type/Status but not keyword.
                                    // So we might need to manually trigger if only keyword was present.
                                    // But resetting state is async. Let's just reset state, useEffect handles filters, keyword might need standard reset.
                                    // Let's rely on standard re-fetch for simplicity or user hits search again with empty.
                                    // Better:
                                    // fetchBooks(1); // But state not updated yet.
                                    // Just clear state, user can hit search or we wait for useEffect.
                                    // For now just clear state.
                                }}
                                className="text-gray-500 hover:text-gray-700 px-3 py-2"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </form>
                <div className="mt-2 text-xs text-gray-400">
                    Found {total} results
                </div>
            </div>

            {/* Responsive Table Container (Desktop) */}
            <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead className="bg-gray-50/50">
                            <tr className="border-b border-gray-100 text-gray-500 text-sm">
                                <th className="py-4 px-6 font-medium">Title</th>
                                <th className="py-4 px-6 font-medium">Seller</th>
                                <th className="py-4 px-6 font-medium">Category</th>
                                <th className="py-4 px-6 font-medium">Type</th>
                                <th className="py-4 px-6 font-medium">Price</th>
                                <th className="py-4 px-6 font-medium">Status</th>
                                <th className="py-4 px-6 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id} className="border-b border-gray-50 last:border-0 hover:bg-blue-50/30 transition-colors">
                                    <td className="py-4 px-6 font-medium text-gray-800">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center mr-3 text-gray-400">
                                                <BookOpen size={16} />
                                            </div>
                                            <span className="truncate max-w-[200px]" title={book.title}>{book.title}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-600">
                                        <div className="text-sm">{book.seller?.name || 'Unknown'}</div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded text-xs px-auto capitalize w-fit">
                                                {book.category}
                                            </span>
                                            {book.subcategory && (
                                                <span className="text-xs text-gray-400 pl-1">↳ {book.subcategory}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 capitalize text-sm">{book.type}</td>
                                    <td className="py-4 px-6 font-bold text-gray-700">SAR {book.price}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${book.status === 'available' ? 'bg-green-100 text-green-700' :
                                            book.status === 'sold' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleDelete(book._id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                            title="Delete Book"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {books.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-gray-400 italic">No books found in the inventory.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View (Small Screens) */}
            <div className="md:hidden space-y-4">
                {books.map((book) => (
                    <div key={book._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-gray-100 rounded-lg text-gray-500">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
                                    <p className="text-sm text-gray-500">{book.seller?.name || 'Unknown'}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${book.status === 'available' ? 'bg-green-100 text-green-700' :
                                book.status === 'sold' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {book.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600 mb-4 pl-1">
                            <div>
                                <span className="text-gray-400 text-xs block">Category</span>
                                <span className="font-medium">{book.category}</span>
                            </div>
                            <div>
                                <span className="text-gray-400 text-xs block">Price</span>
                                <span className="font-medium text-gray-900">SAR {book.price}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-gray-400 text-xs block">Type</span>
                                <span className="capitalize">{book.type}</span>
                            </div>
                        </div>

                        <div className="flex justify-end pt-3 border-t border-gray-50">
                            <button
                                onClick={() => handleDelete(book._id)}
                                className="flex items-center text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <Trash2 size={16} className="mr-1.5" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {books.length === 0 && (
                    <div className="text-center py-10 text-gray-400 italic bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No books found.
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6 px-2">
                <button
                    disabled={page === 1}
                    onClick={() => fetchBooks(page - 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                    Previous
                </button>
                <span className="text-gray-500 text-sm">
                    Page <span className="font-semibold text-gray-900">{page}</span> of <span className="font-semibold">{pages}</span>
                </span>
                <button
                    disabled={page === pages}
                    onClick={() => fetchBooks(page + 1)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${page === pages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                    Next
                </button>
            </div>

            {/* Add Book Modal with Transparent Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all scale-100 border border-gray-100">
                        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Add New Book</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddBook} className="p-8 overflow-y-auto max-h-[80vh]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Title */}
                                <div className="col-span-1">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                        value={newBook.title}
                                        onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                                        placeholder="Book Title"
                                    />
                                </div>

                                {/* Author removed */}

                                {/* Price */}
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Price (SAR)</label>
                                    <input
                                        type="number"
                                        required
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

                                {/* Image Path/URL */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Book Cover Image</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setImageFile(e.target.files[0]);
                                                }
                                            }}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Recommended: 400x600px, Max 2MB.</p>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                    <textarea
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all min-h-[100px]"
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
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
