import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Palette, Globe, Lock, Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const { setTheme } = useTheme();

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage system configurations and preferences.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 space-y-2">
           <Button variant="ghost" className="w-full justify-start font-medium bg-secondary/50">
             <Globe className="mr-2 h-4 w-4" /> General
           </Button>
           <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
             <Palette className="mr-2 h-4 w-4" /> Design & Theme
           </Button>
           <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
             <Bell className="mr-2 h-4 w-4" /> Notifications
           </Button>
           <Button variant="ghost" className="w-full justify-start font-medium text-muted-foreground">
             <Lock className="mr-2 h-4 w-4" /> Security
           </Button>
        </aside>

        <div className="flex-1 max-w-3xl space-y-6">
          <Card>
             <CardHeader>
               <CardTitle>System Information</CardTitle>
               <CardDescription>Configure basic system settings.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <div className="space-y-2">
                 <Label>System Name</Label>
                 <Input defaultValue="ServiceCore Enterprise" />
               </div>
               <div className="space-y-2">
                 <Label>Support Email</Label>
                 <Input defaultValue="support@servicecore.com" />
               </div>
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

          <Card>
             <CardHeader>
               <CardTitle>Appearance</CardTitle>
               <CardDescription>Customize the look and feel.</CardDescription>
             </CardHeader>
             <CardContent className="space-y-6">
               <div className="space-y-2">
                 <Label>Theme Preference</Label>
                 <div className="grid grid-cols-3 gap-4">
                    <div className="border-2 border-primary rounded-lg p-1 cursor-pointer" onClick={() => setTheme('light')}>
                       <div className="bg-white h-20 rounded-md shadow-sm flex items-center justify-center">
                          <Sun className="h-6 w-6 text-orange-500" />
                       </div>
                       <div className="text-center text-xs font-medium mt-2">Light</div>
                    </div>
                    <div className="border border-border rounded-lg p-1 cursor-pointer hover:border-primary/50" onClick={() => setTheme('dark')}>
                       <div className="bg-slate-900 h-20 rounded-md shadow-sm flex items-center justify-center">
                          <Moon className="h-6 w-6 text-blue-400" />
                       </div>
                       <div className="text-center text-xs font-medium mt-2">Dark</div>
                    </div>
                    <div className="border border-border rounded-lg p-1 cursor-pointer hover:border-primary/50" onClick={() => setTheme('system')}>
                       <div className="bg-gradient-to-r from-white to-slate-900 h-20 rounded-md shadow-sm flex items-center justify-center">
                          <div className="bg-background/50 p-2 rounded-full backdrop-blur-sm">
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
                     <div className="h-8 w-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 cursor-pointer" />
                     <div className="h-8 w-8 rounded-full bg-purple-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-purple-600" />
                     <div className="h-8 w-8 rounded-full bg-green-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-green-600" />
                     <div className="h-8 w-8 rounded-full bg-orange-600 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-orange-600" />
                  </div>
               </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
