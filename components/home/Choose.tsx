import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, Globe, Heart, Zap, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Users,
      title: "Verified Community",
      description: "Connect with genuine travelers through our verified profile system, ensuring safe and authentic connections."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Advanced security measures and user verification to protect your journey and personal information."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Access to thousands of travelers worldwide, making it easy to find the perfect travel companion anywhere."
    },
    {
      icon: Heart,
      title: "Shared Interests",
      description: "Smart matching algorithm connects you with buddies who share your travel style and interests."
    },
    {
      icon: Zap,
      title: "Instant Matching",
      description: "Quick and easy connection process gets you paired with your ideal travel buddy in minutes."
    },
    {
      icon: Star,
      title: "Trusted Reviews",
      description: "Read genuine reviews from fellow travelers to make informed decisions about your travel partners."
    }
  ];

  return (
    <div className="w-full bg-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of travelers who have found their perfect adventure companions through our platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-cyan-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-background"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Active Travelers</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">120+</div>
            <div className="text-gray-600">Countries Covered</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.8★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}