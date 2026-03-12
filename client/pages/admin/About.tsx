import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminAbout() {
  const [content, setContent] = useState({
    companyStory: "Founded in 2018, CleanFlow started with a simple mission...",
    process: "1. Inspection, 2. Sorting, 3. Washing, 4. Drying, 5. Finishing",
    teamMembers: "Michael Chen, Sarah Martinez, James Wilson"
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page CMS</h1>
        <p className="text-muted-foreground">Edit about page content</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Company Story</label>
          <textarea
            value={content.companyStory}
            onChange={(e) => setContent({ ...content, companyStory: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Laundry Process</label>
          <textarea
            value={content.process}
            onChange={(e) => setContent({ ...content, process: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Team Members</label>
          <textarea
            value={content.teamMembers}
            onChange={(e) => setContent({ ...content, teamMembers: e.target.value })}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
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
