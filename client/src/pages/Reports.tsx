import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Download, Calendar, Filter } from "lucide-react";

export default function Reports() {
  const productivityData = [
    { name: "Week 1", completed: 12, added: 15 },
    { name: "Week 2", completed: 19, added: 18 },
    { name: "Week 3", completed: 25, added: 22 },
    { name: "Week 4", completed: 22, added: 20 },
  ];

  const ticketTypeData = [
    { name: "Incident", value: 45, color: "hsl(var(--chart-1))" },
    { name: "Service Req", value: 30, color: "hsl(var(--chart-2))" },
    { name: "Problem", value: 15, color: "hsl(var(--chart-3))" },
    { name: "Change", value: 10, color: "hsl(var(--chart-4))" },
  ];

  const teamPerformance = [
    { name: "Alex", resolved: 45, avgTime: 2.5 },
    { name: "Sarah", resolved: 52, avgTime: 1.8 },
    { name: "Michael", resolved: 38, avgTime: 3.2 },
    { name: "Emily", resolved: 41, avgTime: 2.1 },
  ];

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-1">Deep dive into project performance and support metrics.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">
             <Calendar className="mr-2 h-4 w-4" />
             Last 30 Days
           </Button>
           <Button variant="default" size="sm">
             <Download className="mr-2 h-4 w-4" />
             Export PDF
           </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Team Performance</TabsTrigger>
          <TabsTrigger value="projects">Project Health</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Ticket Resolution Trend</CardTitle>
                <CardDescription>Tickets completed vs new tickets over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                       contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    />
                    <Line type="monotone" dataKey="completed" stroke="hsl(var(--primary))" strokeWidth={3} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="added" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Distribution</CardTitle>
                <CardDescription>Breakdown by ticket type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ticketTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {ticketTypeData.map((item) => (
                     <div key={item.name} className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium ml-auto">{item.value}%</span>
                     </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technician Efficiency</CardTitle>
              <CardDescription>Tickets resolved vs average resolution time (hours)</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerformance} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted)/0.3)'}} />
                  <Bar dataKey="resolved" name="Tickets Resolved" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
                  <Bar dataKey="avgTime" name="Avg Time (hrs)" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
