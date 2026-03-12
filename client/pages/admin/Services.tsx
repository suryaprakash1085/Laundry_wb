import { useState } from "react";
import { Edit2, Trash2, Plus, Eye, Shirt } from "lucide-react";
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

  /* Service Stats */

  const totalServices = services.length;

  const premiumServices = services.filter(
    s => s.name.toLowerCase().includes("premium")
  ).length;

  const mostExpensive =
    services.length > 0
      ? services.reduce((prev, current) =>
          parseInt(prev.price.replace(/\D/g, "")) >
          parseInt(current.price.replace(/\D/g, ""))
            ? prev
            : current
        )
      : null;

  /* Modal Functions */

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

  const handleSave = () => {

    if (modalMode === "add") {

      const newService: Service = {
        id: Math.max(...services.map(s => s.id), 0) + 1,
        name: formData.name,
        price: formData.price,
        description: formData.description
      };

      setServices([...services, newService]);

    }

    else if (modalMode === "edit" && selectedService) {

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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">
            Edit, add, or delete laundry services
          </p>
        </div>

        <Button size="lg" onClick={() => openModal("add")}>
          <Plus size={20} />
          New Service
        </Button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Total */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Shirt className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Services</p>
            <h2 className="text-2xl font-bold">{totalServices}</h2>
          </div>

        </div>

        {/* Premium */}

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">Premium Services</p>
          <h2 className="text-2xl font-bold">{premiumServices}</h2>

        </div>

        {/* Expensive */}

        <div className="bg-white border rounded-xl p-5 shadow-sm">

          <p className="text-sm text-gray-500">Highest Price</p>

          <h2 className="text-lg font-semibold">
            {mostExpensive?.name || "N/A"}
          </h2>

          <p className="text-primary font-bold">
            {mostExpensive?.price}
          </p>

        </div>

      </div>

      {/* Services Table */}

      <div className="bg-white rounded-xl border border-border p-6 overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-border">

              <th className="text-left py-3 px-4">Service</th>
              <th className="text-left py-3 px-4">Price</th>
              <th className="text-left py-3 px-4">Description</th>
              <th className="text-left py-3 px-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {services.map((service) => (

              <tr
                key={service.id}
                className="border-b border-border hover:bg-gray-50"
              >

                <td className="py-3 px-4 font-semibold">
                  {service.name}
                </td>

                <td className="py-3 px-4 text-primary font-semibold">
                  {service.price}
                </td>

                <td className="py-3 px-4">
                  {service.description}
                </td>

                <td className="py-3 px-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => openModal("view", service)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => openModal("edit", service)}
                      className="p-2 hover:bg-green-100 text-green-600 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg"
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
            label="Service Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            disabled={modalMode === "view"}
          />

          <FormInput
            label="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="$15/kg"
            disabled={modalMode === "view"}
          />

          <FormTextarea
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={3}
            disabled={modalMode === "view"}
          />

        </div>

      </Modal>

    </div>
  );
}