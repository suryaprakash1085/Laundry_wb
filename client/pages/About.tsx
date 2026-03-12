import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Leaf, Award, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const titleRef = useRef(null);
  const storyRef = useRef(null);

  useEffect(() => {
    gsap.from(titleRef.current, {
      y: -40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    });

    gsap.from(".about-card", {
      scrollTrigger: {
        trigger: storyRef.current,
        start: "top center+=100",
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  return (
    <div className="bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        {/* Header */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h1
              ref={titleRef}
              className="text-4xl md:text-5xl font-display font-bold mb-4 text-foreground"
            >
              About CleanFlow
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Redefining laundry service with care, convenience, and quality
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section ref={storyRef} className="section-padding container-max">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="about-card">
              <h2 className="text-3xl font-display font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2018, CleanFlow started with a simple mission: to make professional laundry care accessible and convenient for everyone.
              </p>
              <p className="text-muted-foreground mb-4">
                What began as a small local service has grown into a trusted brand serving over 10,000 customers across the city. We've built our reputation on quality, reliability, and exceptional customer service.
              </p>
              <p className="text-muted-foreground">
                Today, we continue to innovate, using eco-friendly practices and the latest technology to deliver the best results for your clothes.
              </p>
            </div>
            <div className="about-card h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-7xl">
              📜
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="about-card bg-white rounded-xl p-6 border border-border text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
              <p className="text-sm text-muted-foreground">Make professional laundry care convenient and affordable for everyone</p>
            </div>
            <div className="about-card bg-white rounded-xl p-6 border border-border text-center">
              <Leaf className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
              <p className="text-sm text-muted-foreground">100% eco-friendly products and sustainable practices</p>
            </div>
            <div className="about-card bg-white rounded-xl p-6 border border-border text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Quality</h3>
              <p className="text-sm text-muted-foreground">Premium care for every garment with expert attention</p>
            </div>
            <div className="about-card bg-white rounded-xl p-6 border border-border text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">Building lasting relationships with our customers</p>
            </div>
          </div>
        </section>

        {/* Laundry Process */}
        <section className="section-padding bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container-max">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
              Our Laundry Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: "1",
                  title: "Inspection",
                  desc: "Detailed inspection of all garments and pockets",
                  icon: "🔍"
                },
                {
                  step: "2",
                  title: "Sorting",
                  desc: "Careful sorting by color, fabric type, and care level",
                  icon: "🧵"
                },
                {
                  step: "3",
                  title: "Washing",
                  desc: "Professional washing with eco-friendly products",
                  icon: "💧"
                },
                {
                  step: "4",
                  title: "Drying",
                  desc: "Temperature-controlled drying for fabric safety",
                  icon: "🌬️"
                },
                {
                  step: "5",
                  title: "Finishing",
                  desc: "Expert ironing and quality assurance",
                  icon: "✨"
                }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="bg-white rounded-xl p-4 text-center border border-border h-full">
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section-padding container-max">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Michael Chen",
                role: "Founder & CEO",
                image: "👨‍💼"
              },
              {
                name: "Sarah Martinez",
                role: "Operations Manager",
                image: "👩‍💼"
              },
              {
                name: "James Wilson",
                role: "Quality Assurance Lead",
                image: "👨‍🔧"
              }
            ].map((member, i) => (
              <div key={i} className="about-card bg-white rounded-xl border border-border overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                  {member.image}
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="section-padding bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container-max">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <p className="text-sm opacity-90">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-sm opacity-90">Garments Cleaned</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">6 Years</div>
                <p className="text-sm opacity-90">In Business</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <p className="text-sm opacity-90">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
