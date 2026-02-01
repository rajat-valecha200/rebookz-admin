import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Trash2, Plus, Folder, ChevronRight, Check } from 'lucide-react';
// Import Ionicons from react-icons
import {
    IoBookOutline, IoLibraryOutline, IoSchoolOutline, IoBriefcaseOutline,
    IoCodeSlashOutline, IoFlaskOutline, IoEarthOutline, IoColorPaletteOutline,
    IoFitnessOutline, IoRestaurantOutline, IoMedkitOutline, IoCarOutline,
    IoGameControllerOutline, IoJournalOutline, IoLocateOutline, IoLogoElectron,
    IoCalculatorOutline, IoGlobeOutline, IoBusinessOutline, IoSettingsOutline,
    IoBookmarkOutline, IoDocumentTextOutline, IoLeafOutline, IoHeartOutline,
    IoSearchOutline, IoStarOutline, IoRocketOutline, IoHardwareChipOutline,
    IoShirtOutline, IoImageOutline, IoHappyOutline, IoChatbubbleEllipsesOutline,
    IoFolderOutline
} from 'react-icons/io5';

// Map of visual components
const ICON_MAP: { [key: string]: React.ElementType } = {
    'book': IoBookOutline,
    'library': IoLibraryOutline,
    'school': IoSchoolOutline,
    'business': IoBriefcaseOutline,
    'code': IoCodeSlashOutline,
    'flask': IoFlaskOutline,
    'earth': IoEarthOutline,
    'color-palette': IoColorPaletteOutline,
    'fitness': IoFitnessOutline,
    'restaurant': IoRestaurantOutline,
    'medical': IoMedkitOutline,
    'car': IoCarOutline,
    'game-controller': IoGameControllerOutline,
    'notebook': IoJournalOutline,
    'target': IoLocateOutline,
    'graduation-cap': IoSchoolOutline, // reuse
    'atom': IoLogoElectron,
    'calculator': IoCalculatorOutline,
    'globe': IoGlobeOutline,
    'government': IoBusinessOutline,
    'gear': IoSettingsOutline,
    'bookmark': IoBookmarkOutline,
    'file-text': IoDocumentTextOutline,
    'feather': IoLeafOutline,
    'heart': IoHeartOutline,
    'search': IoSearchOutline,
    'sparkles': IoStarOutline,
    'rocket': IoRocketOutline,
    'cpu': IoHardwareChipOutline,
    'shirt': IoShirtOutline,
    'briefcase': IoBriefcaseOutline, // reuse
    'image': IoImageOutline,
    'smile': IoHappyOutline,
    'comic': IoChatbubbleEllipsesOutline
};

const ICON_KEYS = Object.keys(ICON_MAP);

interface CategoryData {
    _id: string; // Mongo ID
    id: number;  // User ID
    name: string;
    description?: string;
    icon_name: string;
    parent_id: number | null;
    has_child: boolean;
    is_active: boolean;
}

const CategoriesPage: React.FC = () => {
    const [allCategories, setAllCategories] = useState<CategoryData[]>([]);
    const [displayCategories, setDisplayCategories] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(true);

    // Navigation State
    const [currentParentId, setCurrentParentId] = useState<number | null>(null);
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: number, name: string }[]>([]);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState({
        name: '',
        icon_name: 'book',
        description: '',
        has_child: false
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        filterCategories();
    }, [allCategories, currentParentId]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const { data } = await api.get('/categories');
            setAllCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterCategories = () => {
        const filtered = allCategories.filter(cat => {
            if (currentParentId === null) {
                return cat.parent_id === null || cat.parent_id === undefined;
            }
            return cat.parent_id === currentParentId;
        });
        setDisplayCategories(filtered);
    };

    const handleCategoryClick = (category: CategoryData) => {
        if (category.has_child) {
            setCurrentParentId(category.id);
            setBreadcrumbs([...breadcrumbs, { id: category.id, name: category.name }]);
        }
    };

    const handleBreadcrumbClick = (index: number) => {
        if (index === -1) {
            setCurrentParentId(null);
            setBreadcrumbs([]);
        } else {
            const target = breadcrumbs[index];
            setCurrentParentId(target.id);
            setBreadcrumbs(breadcrumbs.slice(0, index + 1));
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await api.delete(`/categories/${id}`);
                setAllCategories(allCategories.filter(c => c._id !== id));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                name: newCategory.name,
                icon_name: newCategory.icon_name,
                description: newCategory.description,
                parent_id: currentParentId,
                has_child: newCategory.has_child
            };

            const { data } = await api.post('/categories', payload);

            setAllCategories([...allCategories, data]);

            if (currentParentId) {
                setAllCategories(prev => prev.map(c =>
                    c.id === currentParentId ? { ...c, has_child: true } : c
                ));
            }

            setIsModalOpen(false);
            setNewCategory({ name: '', icon_name: 'book', description: '', has_child: false });
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category.');
        }
    };

    // Helper to render icon
    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = ICON_MAP[iconName] || IoFolderOutline;
        return <IconComponent className={className} size={24} />;
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center shadow-sm transition-colors"
                    >
                        <Plus size={20} className="mr-2" />
                        Add {currentParentId ? 'Subcategory' : 'Category'}
                    </button>
                </div>

                <div className="flex items-center text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                    <button
                        onClick={() => handleBreadcrumbClick(-1)}
                        className={`hover:text-blue-600 transition-colors ${breadcrumbs.length === 0 ? 'font-bold text-gray-900' : ''}`}
                    >
                        Root
                    </button>
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.id}>
                            <ChevronRight size={16} className="mx-2 text-gray-400" />
                            <button
                                onClick={() => handleBreadcrumbClick(index)}
                                className={`hover:text-blue-600 transition-colors ${index === breadcrumbs.length - 1 ? 'font-bold text-gray-900' : ''}`}
                            >
                                {crumb.name}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayCategories.length > 0 ? displayCategories.map((category) => (
                    <div
                        key={category._id}
                        onClick={() => handleCategoryClick(category)}
                        className={`bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex justify-between items-center group hover:shadow-md hover:border-blue-200 transition-all ${category.has_child ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        <div className="flex items-center">
                            <div className="bg-blue-50 p-3 rounded-full mr-4 group-hover:bg-blue-100 transition-colors text-blue-500">
                                {renderIcon(category.icon_name)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800">{category.name}</h3>
                                {category.description && (
                                    <p className="text-xs text-gray-400 truncate max-w-[150px]">{category.description}</p>
                                )}
                                {category.has_child && (
                                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full mt-2 inline-block">
                                        Subcategories &gt;
                                    </span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={(e) => handleDelete(category._id, e)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Delete"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                )) : (
                    <div className="col-span-3 text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        No categories found in this level.
                    </div>
                )}
            </div>

            {/* Enhanced Modal with Transparent Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all scale-100 border border-gray-100">
                        <div className="px-8 py-5 border-b border-gray-100 bg-gray-50/80 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">
                                {currentParentId ? 'Add Subcategory' : 'Create New Category'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full">✕</button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                        placeholder="e.g. Science Fiction"
                                        required
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Description <span className="text-gray-400 font-normal">(Optional)</span></label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={newCategory.description}
                                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                        placeholder="Short description..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Icon</label>
                                    <div className="h-40 overflow-y-auto border border-gray-200 rounded-lg p-3 grid grid-cols-6 gap-2 bg-gray-50/50">
                                        {ICON_KEYS.map(iconKey => {
                                            const Icon = ICON_MAP[iconKey];
                                            return (
                                                <div
                                                    key={iconKey}
                                                    onClick={() => setNewCategory({ ...newCategory, icon_name: iconKey })}
                                                    className={`cursor-pointer aspect-square rounded-lg flex items-center justify-center transition-all ${newCategory.icon_name === iconKey ? 'bg-blue-500 text-white shadow-md transform scale-105' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
                                                    title={iconKey}
                                                >
                                                    <Icon size={20} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Selected: <span className="font-semibold text-blue-600 capitalize">{newCategory.icon_name}</span></p>
                                </div>

                                <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex-1">
                                        <label className="block text-gray-800 font-semibold mb-1 text-sm">Has Subcategories?</label>
                                        <p className="text-xs text-gray-500">Enable this if you plan to add children to this category.</p>
                                    </div>
                                    <div className="relative inline-block w-12 ml-4 align-middle select-none transition duration-200 ease-in">
                                        <input
                                            type="checkbox"
                                            name="toggle"
                                            id="toggle"
                                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                                            checked={newCategory.has_child}
                                            onChange={(e) => setNewCategory({ ...newCategory, has_child: e.target.checked })}
                                            style={{
                                                right: newCategory.has_child ? '0' : 'auto',
                                                left: newCategory.has_child ? 'auto' : '0',
                                                borderColor: newCategory.has_child ? '#3B82F6' : '#E5E7EB'
                                            }}
                                        />
                                        <label
                                            htmlFor="toggle"
                                            className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${newCategory.has_child ? 'bg-blue-500' : 'bg-gray-300'}`}
                                        ></label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-50">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5"
                                >
                                    Create Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
