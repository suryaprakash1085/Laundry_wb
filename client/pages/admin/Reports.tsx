export default function AdminReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">View business analytics and reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Daily Bookings</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center text-muted-foreground">
            📊 Chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Monthly Revenue</h2>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center text-muted-foreground">
            📊 Chart placeholder
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Popular Services</h2>
          <div className="space-y-4">
            {[
              { name: "Regular Wash", count: 450, percent: 35 },
              { name: "Dry Cleaning", count: 320, percent: 25 },
              { name: "Premium Ironing", count: 280, percent: 22 },
              { name: "Express Service", count: 200, percent: 18 }
            ].map((service) => (
              <div key={service.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-sm">{service.name}</span>
                  <span className="text-sm text-muted-foreground">{service.count} orders ({service.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${service.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Average Rating</span>
              <span className="font-bold text-2xl">4.8/5</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">Customer Satisfaction</span>
              <span className="font-bold text-2xl">98%</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-muted-foreground">On-Time Delivery</span>
              <span className="font-bold text-2xl">99.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Repeat Customers</span>
              <span className="font-bold text-2xl">76%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold mb-4">Monthly Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Month</th>
                <th className="text-right py-3 px-4">Bookings</th>
                <th className="text-right py-3 px-4">Revenue</th>
                <th className="text-right py-3 px-4">Customers</th>
                <th className="text-right py-3 px-4">Avg Order</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: "January", bookings: 450, revenue: "$6,750", customers: 285, avg: "$15.00" },
                { month: "February", bookings: 520, revenue: "$7,800", customers: 312, avg: "$15.00" },
                { month: "March", bookings: 580, revenue: "$8,700", customers: 335, avg: "$15.00" }
              ].map((row) => (
                <tr key={row.month} className="border-b border-border hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold">{row.month}</td>
                  <td className="py-3 px-4 text-right">{row.bookings}</td>
                  <td className="py-3 px-4 text-right">{row.revenue}</td>
                  <td className="py-3 px-4 text-right">{row.customers}</td>
                  <td className="py-3 px-4 text-right">{row.avg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
