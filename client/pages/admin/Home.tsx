import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminHome() {
  const [content, setContent] = useState({
    heroTitle: "Fresh & Clean, Delivered Right",
    heroSubtitle: "Professional laundry services with pickup and delivery",
    bannerImage: "placeholder",
    featuredServices: "Regular Wash, Dry Cleaning, Premium Ironing",
    testimonials: "Enabled"
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page CMS</h1>
        <p className="text-muted-foreground">Edit homepage content</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Hero Title</label>
          <input
            type="text"
            value={content.heroTitle}
            onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Hero Subtitle</label>
          <textarea
            value={content.heroSubtitle}
            onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Banner Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-2 border border-border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Featured Services</label>
          <textarea
            value={content.featuredServices}
            onChange={(e) => setContent({ ...content, featuredServices: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Show Testimonials</label>
          <select
            value={content.testimonials}
            onChange={(e) => setContent({ ...content, testimonials: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>

        <button className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
          <Save size={20} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
