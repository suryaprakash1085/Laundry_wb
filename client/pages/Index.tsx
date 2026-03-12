import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Zap, Shield, Truck, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const heroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroImageRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline();
    
    heroTl.from(heroTitleRef.current, {
      y: -60,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(heroSubRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .from(heroImageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");

    // Service cards scroll animation
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top center+=100",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Testimonial cards scroll animation
    gsap.from(".testimonial-card", {
      scrollTrigger: {
        trigger: testimonialsRef.current,
        start: "top center+=100",
      },
      x: (i) => (i % 2 === 0 ? -60 : 60),
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Introduction section scroll animation
    gsap.from(".intro-content", {
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top center+=100",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-background">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-cyan-50 pt-20 px-4 md:px-6">
        <div className="container-max w-full">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1
                ref={heroTitleRef}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4"
              >
                Fresh & Clean, Delivered Right
              </h1>
              <p
                ref={heroSubRef}
                className="text-lg md:text-xl text-muted-foreground mb-8"
              >
                Professional laundry services with pickup and delivery. We make your life easier while keeping your clothes perfect.
              </p>
              <div className="flex gap-4 flex-col sm:flex-row">
                <Link to="/booking" className="btn-primary">
                  Book Pickup Now
                </Link>
                <Link to="/services" className="btn-outline">
                  View Services
                </Link>
              </div>
            </div>

            <div
              ref={heroImageRef}
              className="hidden md:block"
            >
              <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-7xl">🧺</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="intro-section section-padding bg-white">
        <div className="container-max">
          <div className="intro-content max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose CleanFlow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              CleanFlow has been serving thousands of satisfied customers with premium laundry care. Our expert team uses eco-friendly products and the latest technology to ensure your clothes are treated with utmost care.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <Zap className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Fast Service</h3>
                <p className="text-sm text-muted-foreground">48-hour turnaround on most services</p>
              </div>
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">100% biodegradable products</p>
              </div>
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <Truck className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Free Delivery</h3>
                <p className="text-sm text-muted-foreground">Pickup and delivery included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section ref={servicesRef} className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Featured Services
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We offer a complete range of professional laundry services tailored to your needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "👕",
                name: "Regular Wash",
                price: "$15/kg",
                desc: "Standard washing and drying for everyday clothes"
              },
              {
                icon: "✨",
                name: "Dry Cleaning",
                price: "$25/item",
                desc: "Professional dry cleaning for delicate fabrics"
              },
              {
                icon: "🧵",
                name: "Premium Ironing",
                price: "$20/item",
                desc: "Expert ironing with professional finishing"
              },
              {
                icon: "🩳",
                name: "Bulk Service",
                price: "$12/kg",
                desc: "Perfect for large loads and families"
              },
              {
                icon: "💍",
                name: "Delicate Care",
                price: "$30/item",
                desc: "Specialized care for valuable garments"
              },
              {
                icon: "⚡",
                name: "Express Service",
                price: "$35/kg",
                desc: "Same-day delivery available"
              }
            ].map((service, i) => (
              <div
                key={i}
                className="service-card bg-white rounded-xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-primary font-bold text-2xl mb-3">{service.price}</p>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="section-padding bg-white">
        <div className="container-max">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            What Our Customers Say
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Join thousands of happy customers
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Johnson",
                role: "Business Owner",
                text: "CleanFlow has been a game-changer for my dry cleaning needs. Always on time, always perfect!",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Working Professional",
                text: "The convenience of pickup and delivery is unmatched. Best laundry service I've used.",
                rating: 5
              },
              {
                name: "Emma Davis",
                role: "Homemaker",
                text: "My delicate clothes have never looked better. Highly recommend their premium service!",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-border">
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating).fill(0).map((_, j) => (
                    <Star key={j} size={16} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Experience Premium Care?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Book your first pickup today and get 10% off your initial order
          </p>
          <Link
            to="/booking"
            className="inline-block px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Your Pickup
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
