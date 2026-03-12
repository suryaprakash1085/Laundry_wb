import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  UserCog,
  Shirt,
  Home,
  Info,
  Palette,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/users", label: "Users", icon: UserCog },
  { to: "/admin/services", label: "Services", icon: Shirt },
  { to: "/admin/home", label: "Home CMS", icon: Home },
  { to: "/admin/about", label: "About CMS", icon: Info },
  { to: "/admin/customization", label: "Customization", icon: Palette },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    gsap.from(sidebarRef.current, {
      x: -80,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white border-r shadow-sm flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <link.icon size={20} />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <Home size={20} />
            {!collapsed && <span>Back to Site</span>}
          </NavLink>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}