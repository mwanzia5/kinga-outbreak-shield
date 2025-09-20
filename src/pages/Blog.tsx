import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Shield, Heart, Users, AlertTriangle, Thermometer, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Mock outbreak data
const outbreakData = [
  { area: "Makueni", cases: 12, recovered: 10, deaths: 1 },
  { area: "Kisumu", cases: 15, recovered: 13, deaths: 1 },
  { area: "Nairobi", cases: 23, recovered: 18, deaths: 2 },
  { area: "Mombasa", cases: 35, recovered: 28, deaths: 3 },
  { area: "Nakuru", cases: 28, recovered: 25, deaths: 2 },
  { area: "Kajiado", cases: 18, recovered: 17, deaths: 1 },
  { area: "Magadi", cases: 12, recovered: 11, deaths: 0 },
];

const preventionTips = [
  {
    id: 1,
    title: "Hand Hygiene Best Practices",
    icon: Heart,
    description: "Proper handwashing techniques to prevent disease transmission",
    content: "Regular handwashing with soap and water for at least 20 seconds is one of the most effective ways to prevent the spread of infectious diseases. Use alcohol-based hand sanitizer when soap isn't available.",
    category: "Prevention"
  },
  {
    id: 2,
    title: "Recognizing Early Symptoms",
    icon: Thermometer,
    description: "Key warning signs to watch for during outbreak seasons",
    content: "Early detection is crucial. Watch for fever, unusual fatigue, persistent cough, or other symptoms that persist beyond normal illness patterns. Report unusual clusters of symptoms in your community.",
    category: "Detection"
  },
  {
    id: 3,
    title: "Community Health Monitoring",
    icon: Users,
    description: "How communities can work together to track health trends",
    content: "Community-based surveillance involves tracking health patterns at the local level. Report unusual health trends to local health authorities and participate in community health initiatives.",
    category: "Community"
  },
  {
    id: 4,
    title: "Emergency Response Protocols",
    icon: AlertTriangle,
    description: "What to do when an outbreak is detected in your area",
    content: "Know your local emergency contacts, follow public health guidelines, maintain emergency supplies, and stay informed through official channels. Avoid panic and help share accurate information.",
    category: "Response"
  },
  {
    id: 5,
    title: "Digital Health Tools",
    icon: Stethoscope,
    description: "Using technology for health monitoring and reporting",
    content: "Leverage mobile apps and digital platforms for symptom tracking, health education, and communication with healthcare providers. These tools can help identify patterns and provide early warnings.",
    category: "Technology"
  },
  {
    id: 6,
    title: "Rural Health Access",
    icon: Shield,
    description: "Healthcare solutions for remote and underserved areas",
    content: "Rural communities can use USSD codes, mobile health units, and telemedicine to access healthcare. Community health workers play a crucial role in bridging healthcare gaps.",
    category: "Access"
  }
];

const Blog = () => {
  const [selectedTip, setSelectedTip] = useState<typeof preventionTips[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Outbreak Data Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Outbreak Data & Health Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with real-time outbreak data and expert health guidance for your community
            </p>
          </div>

          <Card className="mb-8 shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-alert-orange" />
                Regional Outbreak Trends (2024)
              </CardTitle>
              <CardDescription>
                Interactive chart showing case progression, recoveries, and fatalities over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={outbreakData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="cases"
                      stackId="1"
                      stroke="hsl(var(--alert-orange))"
                      fill="hsl(var(--alert-orange-light))"
                      name="Active Cases"
                    />
                    <Area
                      type="monotone"
                      dataKey="recovered"
                      stackId="2"
                      stroke="hsl(var(--health-green))"
                      fill="hsl(var(--health-green-light))"
                      name="Recovered"
                    />
                    <Line
                      type="monotone"
                      dataKey="deaths"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Deaths"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prevention Tips Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Health Education & Prevention</h2>
          
          {selectedTip ? (
            <Card className="max-w-4xl mx-auto shadow-soft">
              <CardHeader>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedTip(null)}
                  className="w-fit mb-4"
                >
                  ← Back to Tips
                </Button>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <selectedTip.icon className="h-6 w-6 text-primary" />
                  {selectedTip.title}
                </CardTitle>
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {selectedTip.category}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">{selectedTip.content}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {preventionTips.map((tip) => (
                <Card 
                  key={tip.id} 
                  className="cursor-pointer transition-all duration-300 hover:shadow-medical hover:scale-105 bg-gradient-card"
                  onClick={() => setSelectedTip(tip)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <tip.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="bg-muted px-2 py-1 rounded text-xs font-medium">
                        {tip.category}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full">
                      Read More →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;