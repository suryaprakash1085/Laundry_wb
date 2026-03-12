import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TrendingUp, Users, ShoppingCart, Zap } from "lucide-react";

export default function AdminDashboard() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      gsap.from(cardsRef.current.querySelectorAll(".stat-card"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, []);

  const stats = [
    {
      title: "Total Bookings",
      value: "2,547",
      icon: ShoppingCart,
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Customers",
      value: "1,203",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      title: "Total Services",
      value: "6",
      icon: Zap,
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      title: "Revenue (Month)",
      value: "$18,450",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
        <p className="text-muted-foreground">Here's what's happening with your laundry service today</p>
      </div>

      {/* Statistics Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="stat-card bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-muted-foreground font-semibold">{stat.title}</h3>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`${stat.color}`} size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Bookings Trend</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center text-muted-foreground">
            📊 Chart placeholder - Connect to database for real data
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Popular Services</h2>
          <div className="space-y-4">
            {[
              { name: "Regular Wash", count: 450 },
              { name: "Dry Cleaning", count: 320 },
              { name: "Premium Ironing", count: 280 },
              { name: "Express Service", count: 200 }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm font-semibold">{service.name}</span>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(service.count / 450) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">{service.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Booking ID</th>
                <th className="text-left py-3 px-4">Customer</th>
                <th className="text-left py-3 px-4">Service</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "BK001", customer: "John Doe", service: "Regular Wash", date: "Today", status: "Completed" },
                { id: "BK002", customer: "Jane Smith", service: "Dry Cleaning", date: "Yesterday", status: "In Progress" },
                { id: "BK003", customer: "Mike Johnson", service: "Premium Ironing", date: "2 days ago", status: "Pending" }
              ].map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{booking.id}</td>
                  <td className="py-3 px-4">{booking.customer}</td>
                  <td className="py-3 px-4">{booking.service}</td>
                  <td className="py-3 px-4">{booking.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "In Progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
