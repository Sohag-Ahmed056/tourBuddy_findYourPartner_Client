import { Globe, Shield, Heart, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/public/heroTravel.jpg";
import travelersImage from "@/public/Travelers.jpg";
import coastalImage from "@/public/CoastalTravel.jpg";
import Image from "next/image";

const values = [
  {
    icon: Globe,
    title: "Explore Fearlessly",
    description:
      "Every destination is an opportunity. We encourage stepping outside comfort zones and embracing the unknown.",
    gradient: "bg-gradient-warm",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Verified profiles, community reviews, and 24/7 support ensure every journey is secure and worry-free.",
    gradient: "bg-gradient-ocean",
  },
  {
    icon: Heart,
    title: "Authentic Connections",
    description:
      "We match travelers based on interests, travel style, and personality—not just destinations.",
    gradient: "bg-gradient-sunset",
  },
  {
    icon: Users,
    title: "Community Spirit",
    description:
      "Our global community shares tips, stories, and support to make every trip unforgettable.",
    gradient: "bg-gradient-warm",
  },
];

const stats = [
  { number: "50K+", label: "Active Travelers" },
  { number: "120", label: "Countries Covered" },
  { number: "200K+", label: "Trips Matched" },
  { number: "98%", label: "Happy Adventurers" },
];

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <div className="absolute inset-0 bg-foreground/50" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Adventures Are Better
            <br />
            <span className="text-gradient-warm">Together</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            We connect wanderers, dreamers, and explorers from around the world
            to share unforgettable journeys and create lifelong friendships.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <Image
                  src={travelersImage}
                  alt="Group of happy travelers exploring together"
                  className="w-full h-auto object-cover aspect-square"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              <div className="absolute -bottom-6 -right-6 md:-right-10 bg-card p-6 rounded-xl shadow-warm">
                <p className="text-4xl font-display font-bold text-primary">
                  50K+
                </p>
                <p className="text-muted-foreground font-body">Travel Buddies</p>
              </div>
            </div>

            <div>
              <span className="text-primary font-medium font-body text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-6">
                Born from a Solo Journey,
                <br />
                <span className="text-primary">Built for Connection</span>
              </h2>

              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  In 2019, our founder sat alone at a cafe in Barcelona, watching
                  groups of friends laughing over tapas. That moment of loneliness
                  sparked an idea: what if solo travelers could easily find
                  companions who shared their wanderlust?
                </p>
                <p>
                  Today, TravelBuddy has connected over 50,000 adventurers across
                  120 countries. We've turned strangers into hiking partners, city
                  explorers into lifelong friends, and solo trips into group
                  adventures.
                </p>
                <p>
                  Because the best travel stories aren't about the places you
                  visit—they're about the people you meet along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-medium font-body text-sm uppercase tracking-wider">
              What We Believe
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
              Our Core Values
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="group">
                <div className="bg-card rounded-2xl p-8 h-full shadow-soft hover:shadow-elevated transition-shadow duration-300">
                  <div
                    className={`w-14 h-14 rounded-xl ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2">
                  {stat.number}
                </p>
                <p className="font-body text-primary-foreground/80 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${coastalImage.src})` }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Find Your
              <br />
              <span className="text-gradient-warm">Travel Buddy?</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-xl">
              Join our community of adventurers and never travel alone again.
              Your next great adventure—and friendship—is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-body group">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="font-body">
                Browse Destinations
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
