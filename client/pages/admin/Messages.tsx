import { useState } from "react";
import { Eye, Trash2, Mail, MessageSquare } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
}

export default function AdminMessages() {
  const [messages] = useState<Message[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      message: "Great service! I love your laundry service.",
      date: "2024-03-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Can you provide information about express service?",
      date: "2024-03-14"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      message: "I want to know about bulk discounts.",
      date: "2024-03-13"
    }
  ]);

  // Stats for cards
  const totalMessages = messages.length;
  const recentMessage = messages[0]; // assuming first is most recent
  const emailsCount = messages.map(m => m.email).filter((v,i,a)=>a.indexOf(v)===i).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">View and manage contact form submissions</p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <MessageSquare className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Messages</p>
            <h2 className="text-2xl font-bold">{totalMessages}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <Mail className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Unique Emails</p>
            <h2 className="text-2xl font-bold">{emailsCount}</h2>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <Eye className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Most Recent</p>
            <h2 className="text-lg font-semibold">{recentMessage?.name || "N/A"}</h2>
            <p className="text-sm text-gray-400 truncate">{recentMessage?.message || ""}</p>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-xl border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Message</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-b border-border hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{msg.name}</td>
                <td className="py-3 px-4">{msg.email}</td>
                <td className="py-3 px-4 truncate">{msg.message}</td>
                <td className="py-3 px-4">{msg.date}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-green-100 text-green-600 rounded-lg">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}