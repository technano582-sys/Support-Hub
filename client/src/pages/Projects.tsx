import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { projects } from "@/lib/mockData";
import { Plus, Calendar, Users, ArrowRight, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";

export default function Projects() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "On Hold": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Completed": return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage ongoing initiatives and team deliverables.</p>
        </div>
        <div className="flex gap-2">
           <Link href="/projects/new">
             <Button size="sm">
               <Plus className="mr-2 h-4 w-4" />
               New Project
             </Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                 <Badge variant="outline" className={`font-normal border-0 ${getStatusColor(project.status)}`}>
                   {project.status}
                 </Badge>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                   <MoreHorizontal className="h-4 w-4" />
                 </Button>
              </div>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                 <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(project.endDate, "MMM d, yyyy")}</span>
                 </div>
                 <div className="flex -space-x-2">
                    {project.team.map((member, i) => (
                       <Avatar key={member.id} className="h-7 w-7 border-2 border-background">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                       </Avatar>
                    ))}
                 </div>
              </div>
            </CardContent>
            <CardFooter className="pt-3 border-t border-border/50 bg-muted/10">
               <Link href={`/projects/${project.id}`}>
                 <Button variant="ghost" className="w-full justify-between group text-sm font-medium">
                   View Dashboard
                   <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
            </CardFooter>
          </Card>
        ))}

        {/* Create New Project Placeholder */}
        <Link href="/projects/new">
          <button className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 h-full min-h-[250px] hover:border-primary/50 hover:bg-accent/50 transition-all group text-muted-foreground hover:text-primary w-full">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="h-6 w-6" />
            </div>
            <span className="font-medium text-lg">Create New Project</span>
            <span className="text-sm text-muted-foreground mt-1 text-center max-w-[200px]">Start a new initiative and assign your team.</span>
          </button>
        </Link>
      </div>
    </Layout>
  );
}
