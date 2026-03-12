/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Booking interface
 */
export interface Booking {
  id?: number;
  name: string;
  phone: string;
  address: string;
  service: string;
  weight: string;
  pickupDate: string;
  delivery: "home" | "pickup";
  status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdAt?: string;
}

/**
 * Message interface
 */
export interface Message {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

/**
 * Service interface
 */
export interface Service {
  id?: number;
  name: string;
  price: string;
  description: string;
  image?: string;
}

/**
 * Customer interface
 */
export interface Customer {
  id?: number;
  name: string;
  phone: string;
  address: string;
  email?: string;
  createdAt?: string;
}

/**
 * User interface
 */
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: "Admin" | "Manager" | "Staff" | "Customer";
  status: "Active" | "Inactive";
  createdAt?: string;
}
