import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminCustomization() {
  const [customization, setCustomization] = useState({
    logo: "placeholder",
    primaryColor: "#BD3EFF",
    secondaryColor: "#E0E7FF",
    footerText: "© 2024 CleanFlow. All rights reserved.",
    phone: "+1 (555) 123-4567",
    email: "info@cleanflow.com",
    address: "123 Clean Street, Fresh City, FC 12345"
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Website Customization</h1>
        <p className="text-muted-foreground">Customize website appearance and settings</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Logo Image</label>
          <input type="file" accept="image/*" className="w-full px-4 py-2 border border-border rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Primary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) => setCustomization({ ...customization, primaryColor: e.target.value })}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={customization.primaryColor}
                onChange={(e) => setCustomization({ ...customization, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Secondary Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) => setCustomization({ ...customization, secondaryColor: e.target.value })}
                className="w-12 h-10 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={customization.secondaryColor}
                onChange={(e) => setCustomization({ ...customization, secondaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border border-border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Footer Text</label>
          <input
            type="text"
            value={customization.footerText}
            onChange={(e) => setCustomization({ ...customization, footerText: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Phone</label>
          <input
            type="tel"
            value={customization.phone}
            onChange={(e) => setCustomization({ ...customization, phone: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={customization.email}
            onChange={(e) => setCustomization({ ...customization, email: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Address</label>
          <input
            type="text"
            value={customization.address}
            onChange={(e) => setCustomization({ ...customization, address: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
