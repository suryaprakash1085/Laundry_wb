import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 1,
    name: "Regular Wash",
    price: "$15/kg",
    image: "👕",
    description: "Standard washing and drying for everyday clothes",
    features: ["Fast turnaround", "Gentle on fabrics", "Eco-friendly detergent"]
  },
  {
    id: 2,
    name: "Dry Cleaning",
    price: "$25/item",
    image: "✨",
    description: "Professional dry cleaning for delicate fabrics",
    features: ["Expert handling", "Stain removal", "Professional pressing"]
  },
  {
    id: 3,
    name: "Premium Ironing",
    price: "$20/item",
    image: "🧵",
    description: "Expert ironing with professional finishing",
    features: ["Professional finish", "Wrinkle-free", "Express service"]
  },
  {
    id: 4,
    name: "Bulk Service",
    price: "$12/kg",
    image: "🩳",
    description: "Perfect for large loads and families",
    features: ["Discounted rates", "Flexible scheduling", "Large volume"]
  },
  {
    id: 5,
    name: "Delicate Care",
    price: "$30/item",
    image: "💍",
    description: "Specialized care for valuable garments",
    features: ["Luxury treatment", "Special handling", "Premium results"]
  },
  {
    id: 6,
    name: "Express Service",
    price: "$35/kg",
    image: "⚡",
    description: "Same-day delivery available",
    features: ["24-hour service", "Priority handling", "Same-day delivery"]
  }
];

export default function Services() {
  const pageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Page enter animations
    gsap.from(titleRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    // Service cards animation
    gsap.from(".service-card-grid", {
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top center+=100",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="bg-background">
      <Navbar />

      <div ref={pageRef} className="pt-24 pb-20">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground"
            >
              Our Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              We offer comprehensive laundry and dry cleaning services tailored to meet your specific needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="service-card-grid bg-white rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                  {service.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-primary font-bold text-2xl mb-4">{service.price}</p>
                  <p className="text-muted-foreground mb-6">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/booking" className="btn-primary w-full text-center block">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Our Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "1", title: "Schedule", desc: "Book your pickup online in seconds" },
                { step: "2", title: "Pickup", desc: "We collect your clothes at your convenience" },
                { step: "3", title: "Clean", desc: "Professional care with premium products" },
                { step: "4", title: "Deliver", desc: "Fresh clothes delivered to your door" }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-xl p-6 text-center border border-border">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-primary -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
