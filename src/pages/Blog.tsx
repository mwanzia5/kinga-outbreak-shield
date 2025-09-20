import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, Legend } from "recharts";
import { Shield, Heart, Users, AlertTriangle, Thermometer, Stethoscope, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Mock outbreak data - fallback when no real data available
const mockOutbreakData = [
  { month: "Jan", cases: 12, recovered: 10, deaths: 1 },
  { month: "Feb", cases: 15, recovered: 13, deaths: 1 },
  { month: "Mar", cases: 23, recovered: 18, deaths: 2 },
  { month: "Apr", cases: 35, recovered: 28, deaths: 3 },
  { month: "May", cases: 28, recovered: 25, deaths: 2 },
  { month: "Jun", cases: 18, recovered: 17, deaths: 1 },
  { month: "Jul", cases: 12, recovered: 11, deaths: 0 },
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
  const [outbreakData, setOutbreakData] = useState(mockOutbreakData);
  const [diseaseBreakdown, setDiseaseBreakdown] = useState<any[]>([]);
  const [totalReports, setTotalReports] = useState(0);
  const [totalCases, setTotalCases] = useState(0);

  useEffect(() => {
    fetchReportsData();
  }, []);

  const fetchReportsData = async () => {
    try {
      const { data: reports, error } = await supabase
        .from('reports')
        .select('*');

      if (error) {
        console.error('Error fetching reports:', error);
        return;
      }

      if (reports && reports.length > 0) {
        // Calculate disease breakdown for pie chart
        const diseaseCount = reports.reduce((acc: any, report) => {
          acc[report.disease_type] = (acc[report.disease_type] || 0) + report.case_count;
          return acc;
        }, {});

        const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff7f', '#ff1493'];
        const breakdown = Object.entries(diseaseCount).map(([disease, count], index) => ({
          name: disease,
          value: count,
          fill: colors[index % colors.length]
        }));

        setDiseaseBreakdown(breakdown);
        setTotalReports(reports.length);
        setTotalCases(reports.reduce((sum: number, report) => sum + report.case_count, 0));

        // Group reports by month for trend analysis
        const monthlyData = reports.reduce((acc: any, report) => {
          const month = new Date(report.report_date).toLocaleDateString('en-US', { month: 'short' });
          if (!acc[month]) {
            acc[month] = { month, cases: 0, recovered: 0, deaths: 0 };
          }
          acc[month].cases += report.case_count;
          
          // Simulate recovered and deaths based on severity
          const severity = report.severity;
          if (severity === 'low') {
            acc[month].recovered += Math.floor(report.case_count * 0.95);
            acc[month].deaths += Math.floor(report.case_count * 0.01);
          } else if (severity === 'medium') {
            acc[month].recovered += Math.floor(report.case_count * 0.85);
            acc[month].deaths += Math.floor(report.case_count * 0.05);
          } else if (severity === 'high') {
            acc[month].recovered += Math.floor(report.case_count * 0.70);
            acc[month].deaths += Math.floor(report.case_count * 0.15);
          } else if (severity === 'critical') {
            acc[month].recovered += Math.floor(report.case_count * 0.50);
            acc[month].deaths += Math.floor(report.case_count * 0.25);
          }
          return acc;
        }, {});

        if (Object.keys(monthlyData).length > 0) {
          setOutbreakData(Object.values(monthlyData));
        }
      }
    } catch (error) {
      console.error('Error processing reports data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Disease Tracking Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time outbreak monitoring and health education resources to keep communities safe and informed
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalReports}</div>
              <p className="text-xs text-muted-foreground">Community submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCases}</div>
              <p className="text-xs text-muted-foreground">Across all regions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {outbreakData.length > 0 && totalCases > 0
                  ? Math.round((outbreakData.reduce((sum, data) => sum + data.recovered, 0) / totalCases) * 100)
                  : 85}%
              </div>
              <p className="text-xs text-muted-foreground">Overall recovery rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disease Types</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{diseaseBreakdown.length}</div>
              <p className="text-xs text-muted-foreground">Different diseases tracked</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Outbreak Trends Over Time
              </CardTitle>
              <CardDescription>
                Monthly progression of cases, recoveries, and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={outbreakData}>
                    <defs>
                      <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="cases"
                      stroke="hsl(var(--destructive))"
                      fillOpacity={1}
                      fill="url(#colorCases)"
                      name="Active Cases"
                    />
                    <Area
                      type="monotone"
                      dataKey="recovered"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorRecovered)"
                      name="Recovered"
                    />
                    <Line
                      type="monotone"
                      dataKey="deaths"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={3}
                      name="Deaths"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="shadow-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Disease Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of reported diseases by type and case count
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {diseaseBreakdown.length > 0 ? (
                    <PieChart>
                      <Pie
                        data={diseaseBreakdown}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {diseaseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={({ payload }) => {
                          if (payload && payload[0]) {
                            return (
                              <div className="bg-background border rounded-lg shadow-lg p-3">
                                <p className="font-medium">{payload[0].name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Cases: {payload[0].value}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <div className="text-center">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No disease reports available yet</p>
                        <p className="text-sm">Data will appear when reports are submitted</p>
                      </div>
                    </div>
                  )}
                </ResponsiveContainer>
              </ChartContainer>
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