import "dotenv/config";
import express, { RequestHandler } from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// In-memory storage (replace with database later)
const bookings: any[] = [];
const messages: any[] = [];

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Booking routes
  app.post("/api/bookings", ((req, res) => {
    const { name, phone, address, service, weight, pickupDate, delivery } = req.body;
    
    // Validation
    if (!name || !phone || !address || !service || !weight || !pickupDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = {
      id: bookings.length + 1,
      name,
      phone,
      address,
      service,
      weight,
      pickupDate,
      delivery,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    res.status(201).json({ success: true, booking });
  }) as RequestHandler);

  app.get("/api/bookings", ((req, res) => {
    res.json({ bookings });
  }) as RequestHandler);

  app.put("/api/bookings/:id", ((req, res) => {
    const { id } = req.params;
    const bookingIndex = bookings.findIndex(b => b.id === parseInt(id));
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookings[bookingIndex] = { ...bookings[bookingIndex], ...req.body };
    res.json({ success: true, booking: bookings[bookingIndex] });
  }) as RequestHandler);

  app.delete("/api/bookings/:id", ((req, res) => {
    const { id } = req.params;
    const bookingIndex = bookings.findIndex(b => b.id === parseInt(id));
    
    if (bookingIndex === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const deleted = bookings.splice(bookingIndex, 1);
    res.json({ success: true, booking: deleted[0] });
  }) as RequestHandler);

  // Message routes
  app.post("/api/messages", ((req, res) => {
    const { name, email, message } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const msg = {
      id: messages.length + 1,
      name,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    messages.push(msg);
    res.status(201).json({ success: true, message: msg });
  }) as RequestHandler);

  app.get("/api/messages", ((req, res) => {
    res.json({ messages });
  }) as RequestHandler);

  app.delete("/api/messages/:id", ((req, res) => {
    const { id } = req.params;
    const messageIndex = messages.findIndex(m => m.id === parseInt(id));
    
    if (messageIndex === -1) {
      return res.status(404).json({ error: "Message not found" });
    }

    const deleted = messages.splice(messageIndex, 1);
    res.json({ success: true, message: deleted[0] });
  }) as RequestHandler);

  return app;
}
