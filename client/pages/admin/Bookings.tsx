import { useState } from "react";
import { Edit2, Trash2, Plus, Eye } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

interface Booking {
  id: number;
  customer: string;
  phone: string;
  service: string;
  date: string;
  status: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, customer: "John Doe", phone: "+1 555-0101", service: "Regular Wash", date: "2024-03-15", status: "Completed" },
    { id: 2, customer: "Jane Smith", phone: "+1 555-0102", service: "Dry Cleaning", date: "2024-03-16", status: "In Progress" },
    { id: 3, customer: "Mike Johnson", phone: "+1 555-0103", service: "Premium Ironing", date: "2024-03-17", status: "Pending" }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    service: "regular-wash",
    date: "",
    status: "Pending"
  });

  const openModal = (mode: "add" | "edit" | "view", booking?: Booking) => {
    setModalMode(mode);
    if (booking) {
      setSelectedBooking(booking);
      setFormData({
        customer: booking.customer,
        phone: booking.phone,
        service: booking.service.toLowerCase().replace(" ", "-"),
        date: booking.date,
        status: booking.status
      });
    } else {
      setFormData({
        customer: "",
        phone: "",
        service: "regular-wash",
        date: "",
        status: "Pending"
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBooking(null);
  };

  const handleSave = async () => {
    if (modalMode === "add") {
      const newBooking: Booking = {
        id: Math.max(...bookings.map(b => b.id), 0) + 1,
        customer: formData.customer,
        phone: formData.phone,
        service: formData.service.replace("-", " ").toUpperCase(),
        date: formData.date,
        status: formData.status
      };
      setBookings([...bookings, newBooking]);
    } else if (modalMode === "edit" && selectedBooking) {
      setBookings(
        bookings.map(b =>
          b.id === selectedBooking.id
            ? {
                ...b,
                customer: formData.customer,
                phone: formData.phone,
                service: formData.service.replace("-", " ").toUpperCase(),
                date: formData.date,
                status: formData.status
              }
            : b
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const modalTitle = {
    add: "New Booking",
    edit: "Edit Booking",
    view: "View Booking"
  }[modalMode];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground">Manage all customer bookings</p>
        </div>
        <Button size="lg" onClick={() => openModal("add")}>
          <Plus size={20} />
          New Booking
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Phone</th>
              <th className="text-left py-3 px-4">Service</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-b border-border hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">BK{booking.id.toString().padStart(3, "0")}</td>
                <td className="py-3 px-4">{booking.customer}</td>
                <td className="py-3 px-4">{booking.phone}</td>
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
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal("view", booking)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openModal("edit", booking)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        onClose={closeModal}
        size="md"
        footer={
          modalMode !== "view" && (
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Customer Name"
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            disabled={modalMode === "view"}
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={modalMode === "view"}
            required
          />

          <FormSelect
            label="Service"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            disabled={modalMode === "view"}
            options={[
              { value: "regular-wash", label: "Regular Wash" },
              { value: "dry-cleaning", label: "Dry Cleaning" },
              { value: "premium-ironing", label: "Premium Ironing" },
              { value: "bulk-service", label: "Bulk Service" }
            ]}
          />

          <FormInput
            label="Pickup Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            disabled={modalMode === "view"}
            required
          />

          <FormSelect
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            disabled={modalMode === "view"}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
              { value: "Cancelled", label: "Cancelled" }
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
