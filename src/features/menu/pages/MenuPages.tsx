import { type MenuItem, type MenuCategory } from "@/types";
import { useState } from "react";
import { useCategories, useDeleteCategory } from "../categories/hooks";
import { CategoryForm } from "../categories/components/CategoryForm";
import { CategoryCard } from "../categories/components/CategoryCard";
import { Button } from "@/components";
import { useItems } from "../items/hooks/useItems";
import { useDeleteItem } from "../items/hooks/useDeleteItem";
import { MenuItemCard } from "../items/components/MenuItemCard";
import { MenuItemForm } from "../items/components/MenuItemForm";

type Tab = "categories" | "items";

export function MenuPage() {
    const [activeTab, setActiveTab] = useState<Tab>("items");
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<
        MenuCategory | undefined
    >();
    const [showItemForm, setShowItemForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | undefined>();
    const [filterCategory, setFilterCategory] = useState<string>("");

    // Categories
    const { data: categories, isLoading: loadingCategories } = useCategories();
    const { mutate: deleteCategory, isPending: isPending } = useDeleteCategory();

    // Items
    const { data: items, isLoading: loadingItems } = useItems();
    const { mutate: deleteItem } = useDeleteItem();

    // Filter Items by Category
    const filteredItems = filterCategory
        ? items?.filter((item) => String(item.categoryId) === filterCategory)
        : items;

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
        setEditingCategory(undefined);
    };

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setShowItemForm(true);
    };

    const handleDeleteItem = (id: number) => {
        if (confirm("¿Estás seguro de eliminar este elemento?")) {
            deleteItem(id);
        }
    };

    const handleItemSuccess = () => {
        setShowItemForm(false);
        setEditingItem(undefined);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
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
                                        setEditingCategory(undefined);
                                    }}
                                />
                            </div>
                        )}

                        {/* Button: New Category  */}
                        {!showCategoryForm && (
                            <div className="mb-6">
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
                        {loadingCategories ? (
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

                {/* TAB: Items */}
                {activeTab === "items" && (
                    <div>
                        {/* Form */}
                        {showItemForm && (
                            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    {editingItem ? "Editar Producto" : "Nuevo Producto"}
                                </h2>
                                <MenuItemForm
                                    item={editingItem}
                                    onSuccess={handleItemSuccess}
                                    onCancel={() => {
                                        setShowItemForm(false);
                                        setEditingItem(undefined);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Controls */}
                <div className="flex gap-4 mb-6">
                    {!showItemForm && (
                        <Button onClick={() => setShowItemForm(true)}>
                            Nuevo Producto
                        </Button>
                    )}
                </div>

                {/* Filter By Category */}
                <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                    <option value="">Todas las Categorías</option>
                    {categories?.data.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Items List  */}
                {loadingItems ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">Cargando Items...</p>
                    </div>
                ) : filteredItems?.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">
                            {filterCategory
                                ? "No hay Items en esta categoría."
                                : "No hay items creados"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems?.map((item) => (
                            <MenuItemCard
                                key={item.id}
                                item={item}
                                onEdit={handleEditItem}
                                onDelete={handleDeleteItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
