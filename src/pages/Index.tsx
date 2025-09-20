import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Smartphone, Globe, Bell, Heart, Users, Stethoscope, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Stethoscope,
      title: "AI Symptom Screening",
      description: "Advanced AI algorithms analyze symptoms and provide instant health assessments"
    },
    {
      icon: Heart,
      title: "First Aid Guidance with Photo Detection",
      description: "Get immediate first aid instructions with AI-powered image analysis"
    },
    {
      icon: Smartphone,
      title: "Offline & USSD Support",
      description: "Access healthcare guidance even without internet via USSD codes"
    },
    {
      icon: Bell,
      title: "Real-Time Alerts & Notifications",
      description: "Stay informed with push notifications about health alerts in your area"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-primary rounded-full shadow-medical">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Kinga
            </span>
            <br />
            <span className="text-foreground">
              Your AI-Powered Shield Against Outbreaks
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Harness the power of artificial intelligence to detect, prevent, and respond to health outbreaks. 
            Protect your community with real-time monitoring and expert guidance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 shadow-medical">
               <Link to="/NotFound.tsx">Reports</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to="/blog">View Outbreak Data</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Comprehensive Health Protection
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI-powered platform provides multiple layers of protection for individuals and communities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medical transition-all duration-300 bg-gradient-card">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-muted-foreground">AI Monitoring</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">95%</div>
              <div className="text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">1M+</div>
              <div className="text-muted-foreground">Lives Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Protect Your Community?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of communities already using Kinga for outbreak detection and prevention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4 shadow-medical">
              Get Started Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
