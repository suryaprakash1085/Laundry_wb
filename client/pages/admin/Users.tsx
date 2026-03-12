import { useState } from "react";
import { Edit2, Trash2, Plus, Eye, Users, UserCheck, UserX } from "lucide-react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function AdminUsers() {

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Admin User", email: "admin@cleanflow.com", role: "Admin", status: "Active" },
    { id: 2, name: "John Manager", email: "john@cleanflow.com", role: "Manager", status: "Active" },
    { id: 3, name: "Sarah Staff", email: "sarah@cleanflow.com", role: "Staff", status: "Inactive" }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "Active"
  });

  /* User Stats */

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (u) => u.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (u) => u.status === "Inactive"
  ).length;

  /* Modal */

  const openModal = (mode: "add" | "edit" | "view", user?: User) => {

    setModalMode(mode);

    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "Staff",
        status: "Active"
      });
    }

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = () => {

    if (modalMode === "add") {

      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status
      };

      setUsers([...users, newUser]);
    }

    else if (modalMode === "edit" && selectedUser) {

      setUsers(
        users.map(u =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                status: formData.status
              }
            : u
        )
      );

    }

    closeModal();
  };

  const handleDelete = (id: number) => {

    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }

  };

  const modalTitle = {
    add: "New User",
    edit: "Edit User",
    view: "View User"
  }[modalMode];

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Manage website users and permissions
          </p>
        </div>

        <Button size="lg" onClick={() => openModal("add")}>
          <Plus size={20} />
          Add User
        </Button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Users */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Users className="text-blue-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">{totalUsers}</h2>
          </div>

        </div>

        {/* Active Users */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="bg-green-100 p-3 rounded-lg">
            <UserCheck className="text-green-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Active Users</p>
            <h2 className="text-2xl font-bold">{activeUsers}</h2>
          </div>

        </div>

        {/* Inactive Users */}

        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center gap-4">

          <div className="bg-red-100 p-3 rounded-lg">
            <UserX className="text-red-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Inactive Users</p>
            <h2 className="text-2xl font-bold">{inactiveUsers}</h2>
          </div>

        </div>

      </div>

      {/* Users Table */}

      <div className="bg-white rounded-xl border border-border p-6 overflow-x-auto">

        <table className="w-full text-sm">

          <thead>

            <tr className="border-b border-border">

              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b border-border hover:bg-gray-50"
              >

                <td className="py-3 px-4 font-semibold">
                  {user.name}
                </td>

                <td className="py-3 px-4">{user.email}</td>

                <td className="py-3 px-4">

                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {user.role}
                  </span>

                </td>

                <td className="py-3 px-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>

                </td>

                <td className="py-3 px-4">

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => openModal("view", user)}
                      className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => openModal("edit", user)}
                      className="p-2 hover:bg-green-100 text-green-600 rounded-lg"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
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
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            disabled={modalMode === "view"}
          />

          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={modalMode === "view"}
          />

          <FormSelect
            label="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            options={[
              { value: "Admin", label: "Admin" },
              { value: "Manager", label: "Manager" },
              { value: "Staff", label: "Staff" }
            ]}
            disabled={modalMode === "view"}
          />

          <FormSelect
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            options={[
              { value: "Active", label: "Active" },
              { value: "Inactive", label: "Inactive" }
            ]}
            disabled={modalMode === "view"}
          />

        </div>

      </Modal>

    </div>
  );
}