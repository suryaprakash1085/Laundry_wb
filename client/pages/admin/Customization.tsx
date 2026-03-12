import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminCustomization() {
  const [activeTab, setActiveTab] = useState("company");

  const [customization, setCustomization] = useState({
    logo: "",
    primaryColor: "#BD3EFF",
    secondaryColor: "#E0E7FF",
    footerText: "© 2024 CleanFlow",
    phone: "",
    email: "",
    address: ""
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Website Customization</h1>
        <p className="text-muted-foreground">
          Customize website appearance and settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2">
        <button
          onClick={() => setActiveTab("company")}
          className={`px-4 py-2 ${activeTab === "company" ? "border-b-2 border-primary font-semibold" : ""}`}
        >
          Company Details
        </button>

        <button
          onClick={() => setActiveTab("themes")}
          className={`px-4 py-2 ${activeTab === "themes" ? "border-b-2 border-primary font-semibold" : ""}`}
        >
          Themes
        </button>

        <button
          onClick={() => setActiveTab("create")}
          className={`px-4 py-2 ${activeTab === "create" ? "border-b-2 border-primary font-semibold" : ""}`}
        >
          Create
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white border rounded-xl p-6 max-w-2xl">

        {/* Company Details */}
        {activeTab === "company" && (
          <div className="space-y-4">

            <div>
              <label className="block text-sm font-semibold mb-2">Logo</label>
              <input type="file" className="w-full border rounded-lg px-4 py-2" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="text"
                value={customization.phone}
                onChange={(e) =>
                  setCustomization({ ...customization, phone: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={customization.email}
                onChange={(e) =>
                  setCustomization({ ...customization, email: e.target.value })
                }
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

          </div>
        )}

        {/* Themes */}
        {activeTab === "themes" && (
          <div className="space-y-4">

            <div>
              <label className="block text-sm font-semibold mb-2">Primary Color</label>
              <input
                type="color"
                value={customization.primaryColor}
                onChange={(e) =>
                  setCustomization({ ...customization, primaryColor: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Secondary Color</label>
              <input
                type="color"
                value={customization.secondaryColor}
                onChange={(e) =>
                  setCustomization({ ...customization, secondaryColor: e.target.value })
                }
              />
            </div>

          </div>
        )}

        {/* Create */}
        {activeTab === "create" && (
          <div>
            <p className="text-gray-600">
              Create new theme or additional settings here.
            </p>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-6">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg">
            <Save size={18} />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}