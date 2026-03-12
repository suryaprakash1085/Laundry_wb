import { useState } from "react";
import { Edit2, Trash2, Plus, Eye } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";

interface Service {
  id: number;
  name: string;
  price: string;
  description: string;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Regular Wash", price: "$15/kg", description: "Standard washing and drying" },
    { id: 2, name: "Dry Cleaning", price: "$25/item", description: "Professional dry cleaning" },
    { id: 3, name: "Premium Ironing", price: "$20/item", description: "Expert ironing service" }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: ""
  });

  const openModal = (mode: "add" | "edit" | "view", service?: Service) => {
    setModalMode(mode);
    if (service) {
      setSelectedService(service);
      setFormData({
        name: service.name,
        price: service.price,
        description: service.description
      });
    } else {
      setFormData({
        name: "",
        price: "",
        description: ""
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  const handleSave = async () => {
    if (modalMode === "add") {
      const newService: Service = {
        id: Math.max(...services.map(s => s.id), 0) + 1,
        name: formData.name,
        price: formData.price,
        description: formData.description
      };
      setServices([...services, newService]);
    } else if (modalMode === "edit" && selectedService) {
      setServices(
        services.map(s =>
          s.id === selectedService.id
            ? {
                ...s,
                name: formData.name,
                price: formData.price,
                description: formData.description
              }
            : s
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const modalTitle = {
    add: "New Service",
    edit: "Edit Service",
    view: "View Service"
  }[modalMode];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Edit, add, or delete laundry services</p>
        </div>
        <Button size="lg" onClick={() => openModal("add")}>
          <Plus size={20} />
          New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <p className="text-primary font-semibold text-2xl mb-2">{service.price}</p>
            <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => openModal("view", service)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => openModal("edit", service)}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-100 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-semibold"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-semibold"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
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
            label="Service Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={modalMode === "view"}
            required
          />

          <FormInput
            label="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="$15/kg"
            disabled={modalMode === "view"}
            required
          />

          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={modalMode === "view"}
            rows={3}
            required
          />
        </div>
      </Modal>
    </div>
  );
}
