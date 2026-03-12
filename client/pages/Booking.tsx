import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, User, Phone, MapPin, Shirt, Truck } from "lucide-react";

export default function Booking() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "regular-wash",
    weight: "",
    pickupDate: "",
    delivery: "home"
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.from(formRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        gsap.to(formRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.5
        });
        setTimeout(() => {
          setFormData({
            name: "",
            phone: "",
            address: "",
            service: "regular-wash",
            weight: "",
            pickupDate: "",
            delivery: "home"
          });
          setSubmitted(false);
          gsap.to(formRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <div className="bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground">
              Book Your Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Schedule a pickup and we'll handle the rest
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="section-padding container-max">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
                <p className="text-green-700 mb-4">
                  Your pickup has been scheduled. You'll receive a confirmation SMS shortly.
                </p>
                <p className="text-sm text-green-600">
                  Redirecting to home page...
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl border border-border p-8 space-y-6"
              >
                <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-muted-foreground" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-muted-foreground" size={20} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main St, City, State 12345"
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Service Type *</label>
                  <div className="relative">
                    <Shirt className="absolute left-3 top-3 text-muted-foreground pointer-events-none" size={20} />
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option value="regular-wash">Regular Wash - $15/kg</option>
                      <option value="dry-cleaning">Dry Cleaning - $25/item</option>
                      <option value="premium-ironing">Premium Ironing - $20/item</option>
                      <option value="bulk-service">Bulk Service - $12/kg</option>
                      <option value="delicate-care">Delicate Care - $30/item</option>
                      <option value="express-service">Express Service - $35/kg</option>
                    </select>
                  </div>
                </div>

                {/* Cloth Weight */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Estimated Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="5"
                    step="0.5"
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Preferred Pickup Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-muted-foreground pointer-events-none" size={20} />
                    <input
                      type="date"
                      name="pickupDate"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Delivery Option */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Delivery Option *</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value="home"
                        checked={formData.delivery === "home"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <Truck size={20} className="text-primary" />
                      <span>Home Delivery (Free)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={formData.delivery === "pickup"}
                        onChange={handleChange}
                        className="w-4 h-4"
                      />
                      <MapPin size={20} className="text-primary" />
                      <span>Store Pickup (Save $5)</span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary py-3"
                >
                  Confirm Booking
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By booking, you agree to our terms of service
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Info Section */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Schedule Pickup</h3>
                <p className="text-muted-foreground">Choose your preferred pickup date and time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">We Pick Up</h3>
                <p className="text-muted-foreground">We collect your clothes at your location</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Delivered Fresh</h3>
                <p className="text-muted-foreground">Receive clean, fresh clothes at your door</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
