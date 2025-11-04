import { Bell, Search } from "lucide-react";

export function TopBar() {
    return (
        <div className="h-16 bg-white border-b border-neutral-100 flex items-center justify-between px-10">
            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar Mesas, Órdenes, Menú..."
                        className="w-full pl-12 pr-4 py-2.5 bg-neutral-50 border border-neutral-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-e-primary-500 focus:bg-white transition-all text-[15px] placeholder:text-neutral-400 placeholder:font-light"
                    />
                </div>
            </div>

            {/* Right Section  */}
            <div className="flex items-center gap-4">
                <button className="relative p-2.5 text-neutral-600 hover:bg-neutral-50 rounded-xl transition-colors ">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full"></span>
                </button>
            </div>
        </div>
    );
}
