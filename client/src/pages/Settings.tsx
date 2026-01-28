import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Palette, Globe, Lock, Bell, Moon, Sun, Smartphone, Mail, Shield, CreditCard, Slack } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Settings() {
  const { setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  const sidebarItems = [
    { id: "general", icon: Globe, label: "General" },
    { id: "design", icon: Palette, label: "Design & Theme" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: Lock, label: "Security" },
    { id: "integrations", icon: Slack, label: "Integrations" },
  ];

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system configurations and preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2 sticky top-24 self-start">
           {sidebarItems.map((item) => (
             <Button 
               key={item.id}
               variant="ghost" 
               className={cn(
                 "w-full justify-start font-medium",
                 activeTab === item.id ? "bg-secondary/50 text-foreground" : "text-muted-foreground hover:text-foreground"
               )}
               onClick={() => setActiveTab(item.id)}
             >
               <item.icon className="mr-2 h-4 w-4" /> {item.label}
             </Button>
           ))}
        </aside>

        <div className="flex-1 max-w-3xl space-y-6">
          
          {/* GENERAL SETTINGS */}
          {activeTab === "general" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
               <CardHeader>
                 <CardTitle>System Information</CardTitle>
                 <CardDescription>Configure basic system settings.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="space-y-2">
                   <Label>System Name</Label>
                   <Input defaultValue="ServiceCore Enterprise" />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Support Email</Label>
                     <Input defaultValue="support@servicecore.com" />
                   </div>
                   <div className="space-y-2">
                     <Label>Default Language</Label>
                     <Select defaultValue="en">
                        <SelectTrigger>
                           <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="en">English (US)</SelectItem>
                           <SelectItem value="es">Español</SelectItem>
                           <SelectItem value="fr">Français</SelectItem>
                           <SelectItem value="de">Deutsch</SelectItem>
                        </SelectContent>
                     </Select>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="utc-5">
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="utc+0">UTC</SelectItem>
                            <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date Format</Label>
                      <Select defaultValue="mdy">
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                      </Select>
                    </div>
                 </div>

                 <Separator />

                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label>Maintenance Mode</Label>
                     <div className="text-xs text-muted-foreground">Disable access for non-admins</div>
                   </div>
                   <Switch />
                 </div>
               </CardContent>
               <CardFooter className="border-t border-border/50 px-6 py-4 bg-muted/10">
                 <Button>Save Changes</Button>
               </CardFooter>
            </Card>
          )}

          {/* DESIGN SETTINGS */}
          {activeTab === "design" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
               <CardHeader>
                 <CardTitle>Appearance</CardTitle>
                 <CardDescription>Customize the look and feel.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="space-y-2">
                   <Label>Theme Preference</Label>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="border-2 border-primary rounded-lg p-1 cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setTheme('light')}>
                         <div className="bg-white h-20 rounded-md shadow-sm flex items-center justify-center border border-border/20">
                            <Sun className="h-6 w-6 text-orange-500" />
                         </div>
                         <div className="text-center text-xs font-medium mt-2">Light</div>
                      </div>
                      <div className="border border-border rounded-lg p-1 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setTheme('dark')}>
                         <div className="bg-slate-950 h-20 rounded-md shadow-sm flex items-center justify-center border border-border/20">
                            <Moon className="h-6 w-6 text-blue-400" />
                         </div>
                         <div className="text-center text-xs font-medium mt-2">Dark</div>
                      </div>
                      <div className="border border-border rounded-lg p-1 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setTheme('system')}>
                         <div className="bg-gradient-to-r from-white to-slate-950 h-20 rounded-md shadow-sm flex items-center justify-center border border-border/20">
                            <div className="bg-background/50 p-2 rounded-full backdrop-blur-sm shadow-sm">
                               <Globe className="h-4 w-4" />
                            </div>
                         </div>
                         <div className="text-center text-xs font-medium mt-2">System</div>
                      </div>
                   </div>
                 </div>
                 
                 <Separator />

                 <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-3">
                       <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 cursor-pointer shadow-sm" />
                       <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-purple-600 transition-all shadow-sm" />
                       <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-green-600 transition-all shadow-sm" />
                       <div className="h-8 w-8 rounded-full bg-orange-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-orange-600 transition-all shadow-sm" />
                       <div className="h-8 w-8 rounded-full bg-zinc-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-zinc-600 transition-all shadow-sm" />
                    </div>
                 </div>

                 <Separator />

                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label>Compact Mode</Label>
                     <div className="text-xs text-muted-foreground">Reduce spacing in lists and tables</div>
                   </div>
                   <Switch />
                 </div>
               </CardContent>
            </Card>
          )}

          {/* NOTIFICATIONS SETTINGS */}
          {activeTab === "notifications" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
               <CardHeader>
                 <CardTitle>Notifications</CardTitle>
                 <CardDescription>Manage how you receive alerts and updates.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="space-y-4">
                   <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Channels</h3>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label className="flex items-center"><Mail className="mr-2 h-4 w-4" /> Email Notifications</Label>
                       <div className="text-xs text-muted-foreground">Receive daily digests and critical alerts</div>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label className="flex items-center"><Smartphone className="mr-2 h-4 w-4" /> Push Notifications</Label>
                       <div className="text-xs text-muted-foreground">Receive real-time alerts on your mobile device</div>
                     </div>
                     <Switch defaultChecked />
                   </div>
                 </div>

                 <Separator />

                 <div className="space-y-4">
                   <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Events</h3>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>Ticket Assignments</Label>
                       <div className="text-xs text-muted-foreground">When a ticket is assigned to you</div>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>New Comments</Label>
                       <div className="text-xs text-muted-foreground">When someone replies to your ticket</div>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>SLA Breaches</Label>
                       <div className="text-xs text-muted-foreground">When a ticket breaches its due date</div>
                     </div>
                     <Switch defaultChecked />
                   </div>
                   <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                       <Label>System Updates</Label>
                       <div className="text-xs text-muted-foreground">Maintenance and feature announcements</div>
                     </div>
                     <Switch />
                   </div>
                 </div>
               </CardContent>
               <CardFooter className="border-t border-border/50 px-6 py-4 bg-muted/10">
                 <Button>Update Preferences</Button>
               </CardFooter>
            </Card>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === "security" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
               <CardHeader>
                 <CardTitle>Security</CardTitle>
                 <CardDescription>Protect your account and organization.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-6">
                 <div className="space-y-4">
                   <div className="space-y-2">
                      <Label>Change Password</Label>
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" className="mt-2" />
                      <Input type="password" placeholder="Confirm New Password" className="mt-2" />
                   </div>
                   <Button variant="outline" size="sm">Update Password</Button>
                 </div>

                 <Separator />

                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="flex items-center"><Shield className="mr-2 h-4 w-4" /> Two-Factor Authentication</Label>
                     <div className="text-xs text-muted-foreground">Add an extra layer of security to your account</div>
                   </div>
                   <Switch />
                 </div>

                 <Separator />

                 <div className="space-y-4">
                    <h3 className="text-sm font-medium">Active Sessions</h3>
                    <div className="border border-border rounded-md divide-y divide-border">
                       <div className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                             </div>
                             <div>
                                <div className="text-sm font-medium">Chrome on Windows</div>
                                <div className="text-xs text-muted-foreground">New York, USA • Current Session</div>
                             </div>
                          </div>
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                       </div>
                       <div className="p-3 flex justify-between items-center bg-muted/20">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                             </div>
                             <div>
                                <div className="text-sm font-medium">Safari on iPhone</div>
                                <div className="text-xs text-muted-foreground">New York, USA • 2 hours ago</div>
                             </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive h-8 text-xs">Revoke</Button>
                       </div>
                    </div>
                 </div>
               </CardContent>
            </Card>
          )}

          {/* INTEGRATIONS SETTINGS */}
          {activeTab === "integrations" && (
            <Card className="animate-in fade-in slide-in-from-right-4 duration-300">
               <CardHeader>
                 <CardTitle>Integrations</CardTitle>
                 <CardDescription>Connect with third-party tools.</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                 <div className="border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-[#4A154B] rounded flex items-center justify-center text-white">
                          <Slack className="h-6 w-6" />
                       </div>
                       <div>
                          <div className="font-medium">Slack</div>
                          <div className="text-xs text-muted-foreground">Receive notifications in Slack channels</div>
                       </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                 </div>

                 <div className="border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-[#0052CC] rounded flex items-center justify-center text-white">
                          <span className="font-bold text-lg">J</span>
                       </div>
                       <div>
                          <div className="font-medium">Jira</div>
                          <div className="text-xs text-muted-foreground">Sync issues and tickets bi-directionally</div>
                       </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                 </div>

                 <div className="border border-border rounded-lg p-4 flex items-center justify-between hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 bg-black rounded flex items-center justify-center text-white">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                       </div>
                       <div>
                          <div className="font-medium">GitHub</div>
                          <div className="text-xs text-muted-foreground">Link commits to tasks and tickets</div>
                       </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                 </div>
               </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
