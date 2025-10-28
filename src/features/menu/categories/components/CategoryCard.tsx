import type { MenuCategory } from "@/types";

interface CategoryCardProps {
    category: MenuCategory;
    onEdit: (category: MenuCategory) => void;
    onDelete: (id: number) => void;
}

export const CategoryCard = ({
    category,
    onEdit,
    onDelete,
}: CategoryCardProps) => {
    return (
        <div>
            <div>
                <h3>category.name</h3>
            </div>
            {category.description && <p>category.description</p>}

            <div>
                <Button>Editar</Button>
            </div>
            <div>
                <Button>Eliminar</Button>
            </div>
        </div>
    );
};
