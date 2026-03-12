import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

const ADMIN_MENU = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Bookings", path: "/admin/bookings", icon: "📦" },
  { name: "Customers", path: "/admin/customers", icon: "👥" },
  { name: "Users", path: "/admin/users", icon: "👤" },
  { name: "Services", path: "/admin/services", icon: "🧺" },
  { name: "Home CMS", path: "/admin/home", icon: "🏠" },
  { name: "About CMS", path: "/admin/about", icon: "ℹ️" },
  { name: "Customization", path: "/admin/customization", icon: "🎨" },
  { name: "Messages", path: "/admin/messages", icon: "💬" },
  { name: "Reports", path: "/admin/reports", icon: "📈" }
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-foreground text-white transition-all duration-300 overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          {sidebarOpen && <h1 className="font-display text-xl font-bold">✨ Admin</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hover:bg-sidebar-accent rounded-lg p-2"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {ADMIN_MENU.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path || location.pathname.startsWith(item.path + "/")
                  ? "bg-primary text-white"
                  : "hover:bg-sidebar-accent"
              }`}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 border-t border-sidebar-border pt-4">
          <button className="flex items-center gap-4 w-full px-4 py-3 hover:bg-sidebar-accent rounded-lg transition-colors">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Admin Dashboard</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
