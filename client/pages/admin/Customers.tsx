import { useState } from "react";
import { Edit2, Trash2, Plus, Eye } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";

interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  orders: number;
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "John Doe", phone: "+1 555-0101", address: "123 Main St", orders: 12 },
    { id: 2, name: "Jane Smith", phone: "+1 555-0102", address: "456 Oak Ave", orders: 8 },
    { id: 3, name: "Mike Johnson", phone: "+1 555-0103", address: "789 Pine Rd", orders: 15 }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const openModal = (mode: "add" | "edit" | "view", customer?: Customer) => {
    setModalMode(mode);
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        name: customer.name,
        phone: customer.phone,
        address: customer.address
      });
    } else {
      setFormData({
        name: "",
        phone: "",
        address: ""
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSave = async () => {
    if (modalMode === "add") {
      const newCustomer: Customer = {
        id: Math.max(...customers.map(c => c.id), 0) + 1,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        orders: 0
      };
      setCustomers([...customers, newCustomer]);
    } else if (modalMode === "edit" && selectedCustomer) {
      setCustomers(
        customers.map(c =>
          c.id === selectedCustomer.id
            ? {
                ...c,
                name: formData.name,
                phone: formData.phone,
                address: formData.address
              }
            : c
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const modalTitle = {
    add: "New Customer",
    edit: "Edit Customer",
    view: "View Customer"
  }[modalMode];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage customer information</p>
        </div>
        <Button size="lg" onClick={() => openModal("add")}>
          <Plus size={20} />
          Add Customer
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Phone</th>
              <th className="text-left py-3 px-4">Address</th>
              <th className="text-left py-3 px-4">Orders</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-border hover:bg-gray-50">
                <td className="py-3 px-4 font-semibold">{customer.name}</td>
                <td className="py-3 px-4">{customer.phone}</td>
                <td className="py-3 px-4">{customer.address}</td>
                <td className="py-3 px-4">{customer.orders}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal("view", customer)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openModal("edit", customer)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer.id)}
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

          <FormInput
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={modalMode === "view"}
            required
          />
        </div>
      </Modal>
    </div>
  );
}
