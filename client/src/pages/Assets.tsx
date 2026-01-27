import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { assets, AssetStatus } from "@/lib/mockData";
import { Filter, Plus, Search, Laptop, Box, AlertTriangle, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function Assets() {
  
  const getStatusColor = (status: AssetStatus) => {
    switch (status) {
      case "In Use": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "In Stock": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Maintenance": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Retired": return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getIcon = (type: string) => {
     if (type === "Hardware") return <Laptop className="h-4 w-4" />;
     return <Box className="h-4 w-4" />;
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Assets</h1>
          <p className="text-muted-foreground mt-1">Track hardware, software, and inventory.</p>
        </div>
        <div className="flex gap-2">
           <Button size="sm">
             <Plus className="mr-2 h-4 w-4" />
             Add Asset
           </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assets..."
            className="pl-9 w-full bg-background"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.map((asset) => (
           <Card key={asset.id} className="overflow-hidden hover:shadow-md transition-shadow">
             <CardHeader className="pb-3 border-b border-border/50 bg-muted/20 flex flex-row items-center justify-between space-y-0">
               <div className="flex items-center gap-2">
                 <div className="bg-background p-2 rounded-md shadow-sm border border-border">
                   {getIcon(asset.type)}
                 </div>
                 <div>
                   <CardTitle className="text-base">{asset.name}</CardTitle>
                   <div className="text-xs text-muted-foreground font-mono">{asset.id}</div>
                 </div>
               </div>
               <Badge variant="outline" className={`font-normal border-0 ${getStatusColor(asset.status)}`}>
                 {asset.status}
               </Badge>
             </CardHeader>
             <CardContent className="pt-4 space-y-3">
               <div className="grid grid-cols-2 gap-2 text-sm">
                 <div>
                   <span className="text-xs text-muted-foreground block mb-0.5">Model</span>
                   <span className="font-medium">{asset.model}</span>
                 </div>
                 <div>
                   <span className="text-xs text-muted-foreground block mb-0.5">Serial</span>
                   <span className="font-medium font-mono text-xs">{asset.serialNumber}</span>
                 </div>
               </div>
               
               <div className="pt-2 border-t border-border/50">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Assigned To</span>
                    {asset.assignedTo ? (
                       <span className="font-medium">User {asset.assignedTo}</span>
                    ) : (
                       <span className="text-muted-foreground italic">Unassigned</span>
                    )}
                  </div>
               </div>
               
               <div className="flex justify-between items-center text-xs mt-2">
                 {new Date() > asset.warrantyExpires ? (
                    <span className="text-red-500 flex items-center gap-1 font-medium"><AlertTriangle className="h-3 w-3" /> Warranty Expired</span>
                 ) : (
                    <span className="text-green-600 flex items-center gap-1 font-medium"><CheckCircle className="h-3 w-3" /> Warranty Active</span>
                 )}
                 <span className="text-muted-foreground">{format(asset.purchaseDate, "MMM yyyy")}</span>
               </div>
             </CardContent>
             <CardFooter className="bg-muted/10 p-3 border-t border-border/50 flex justify-end">
               <Button variant="ghost" size="sm" className="h-7 text-xs">View Details</Button>
             </CardFooter>
           </Card>
        ))}
      </div>
    </Layout>
  );
}
