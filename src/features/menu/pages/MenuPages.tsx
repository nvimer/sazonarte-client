import { type MenuItem, type MenuCategory } from "@/types";
import { useState } from "react";
import { useCategories, useDeleteCategory } from "../categories/hooks";
import { CategoryForm } from "../categories/components/CategoryForm";
import { CategoryCard } from "../categories/components/CategoryCard";
import { Button } from "@/components";

type Tab = "categories" | "items";

export function MenuPage() {
    const [activeTab, setActiveTab] = useState<Tab>("categories");
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<
        MenuCategory | undefined
    >();
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
    const [filterCategory, setFilterCategory] = useState<string>("");

    // Categories
    const { data: categories, isLoading } = useCategories();
    const { mutate: deleteCategory, isPending: isPending } = useDeleteCategory();

    const handleEditCategory = (category: MenuCategory) => {
        setEditingCategory(category);
        setShowCategoryForm(true);
    };

    const handleDeleteCategory = (id: number) => {
        if (confirm("¿Estás seguro de eliminar esta categoría?")) {
            deleteCategory(id);
        }
    };

    const handleCategorySuccess = () => {
        setShowCategoryForm(false);
        setEditingItem(undefined);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-screen-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Gestión de Menú</h1>
                    <p className="text-gray-600 mt-1">
                        Administra categorías e items del menú
                    </p>
                </div>
                {/* Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="flex gap-4">
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setActiveTab("items")}
                        >
                            Items
                        </Button>
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setActiveTab("categories")}
                        >
                            Categorías
                        </Button>
                    </nav>
                </div>

                {/* TAB: Categories */}
                {activeTab === "categories" && (
                    <div>
                        {/* Form */}
                        {showCategoryForm && (
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
                                </h2>
                                <CategoryForm
                                    category={editingCategory}
                                    onSuccess={handleCategorySuccess}
                                    onCancel={() => {
                                        setShowCategoryForm(false);
                                        setEditingItem(undefined);
                                    }}
                                />
                            </div>
                        )}
                        {/* Button: New Category  */}
                        {!showCategoryForm && (
                            <div>
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => setShowCategoryForm(true)}
                                >
                                    Nueva Categoría
                                </Button>
                            </div>
                        )}
                        {/* List all Categories */}
                        {isLoading ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Cargando Categorías...</p>
                            </div>
                        ) : categories?.data.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 py-8">No hay Categorías creadas </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {categories?.data.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        onEdit={handleEditCategory}
                                        onDelete={handleDeleteCategory}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
