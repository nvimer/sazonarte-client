import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    BarChart3,
    ChefHat,
    ClipboardList,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    Table2,
    type LucideIcon,
} from "lucide-react";
import { useAuth } from "@/hooks";

interface NavItem {
    name: string;
    path: string;
    icon: LucideIcon;
}

const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Mesas", path: "/tables", icon: Table2 },
    { name: "Menú", path: "/menu", icon: Menu },
    { name: "Órdenes", path: "/dashboard", icon: ClipboardList },
    { name: "Reportes", path: "/dashboard", icon: BarChart3 },
    { name: "Configuración", path: "/dashboard", icon: Settings },
];

export function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-neutral-100">
            {/* Logo */}
            <div className="p-8 border-b border-neutral-50">
                <Link to="/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                        <div className="text-lg font-semibold text-neutral-900 tracking-tight">
                            Sazonarte
                        </div>
                        <div className="text-xs text-neutral-500 font-light">
                            Restaurante
                        </div>
                    </div>
                </Link>
            </div>

            {/* Navigation  */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? "bg-primary-50 text-primary-600 font-medium" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[15px]">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-neutral-50">
                <div className="flex items-center gap-3 mb-4 p-3 bg-neutral-50 rounded-xl">
                    <div className="w-10 h-10 bg-primary-100  rounded-full flex items-center justify-center">
                        <span className="text-primary-700 font-medium text-sm">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-neutral-900 truncate">
                            {user?.name}
                        </div>
                        <div className="text-xs text-neutral-500 truncate font-light">
                            {user?.email}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm font-medium"
                >
                    <LogOut />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
}
