import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { projects, tasks, users, TicketPriority } from "@/lib/mockData";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckSquare, 
  MoreHorizontal, 
  Plus, 
  Users, 
  Settings,
  BarChart3,
  Paperclip
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");
  const projectId = params?.id;
  const project = projects.find(p => p.id === projectId) || projects[0];
  const projectTasks = tasks.filter(t => t.projectId === project.id || t.projectId === "PROJ-001"); // Fallback for mockup

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Planning": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "On Hold": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Completed": return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300";
      default: return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "Critical": return "text-red-600 bg-red-50 border-red-100";
      case "High": return "text-orange-600 bg-orange-50 border-orange-100";
      case "Medium": return "text-blue-600 bg-blue-50 border-blue-100";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <Button variant="ghost" className="pl-0 text-muted-foreground hover:text-foreground mb-4" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-start gap-4">
             <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <BarChart3 className="h-8 w-8 text-primary" />
             </div>
             <div>
               <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
                 <Badge variant="outline" className={`font-normal border-0 ${getStatusColor(project.status)}`}>
                   {project.status}
                 </Badge>
               </div>
               <p className="text-muted-foreground mt-1 max-w-xl">{project.description}</p>
             </div>
          </div>
          <div className="flex gap-2">
             <Button variant="outline">
               <Settings className="mr-2 h-4 w-4" />
               Settings
             </Button>
             <Button>
               <Plus className="mr-2 h-4 w-4" />
               Add Task
             </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks ({projectTasks.length})</TabsTrigger>
            <TabsTrigger value="team">Team ({project.team.length})</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <Card className="lg:col-span-2">
                 <CardHeader>
                   <CardTitle>Project Progress</CardTitle>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-6">
                     <div className="space-y-2">
                       <div className="flex justify-between text-sm">
                         <span className="font-medium">Overall Completion</span>
                         <span className="text-muted-foreground">{project.progress}%</span>
                       </div>
                       <Progress value={project.progress} className="h-3" />
                     </div>
                     
                     <div className="grid grid-cols-3 gap-4 pt-4">
                       <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <div className="text-2xl font-bold">{projectTasks.filter(t => t.status === 'Done').length}</div>
                          <div className="text-xs text-muted-foreground">Completed Tasks</div>
                       </div>
                       <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <div className="text-2xl font-bold">{projectTasks.filter(t => t.status !== 'Done').length}</div>
                          <div className="text-xs text-muted-foreground">Open Tasks</div>
                       </div>
                       <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <div className="text-2xl font-bold">{Math.ceil((project.endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))}</div>
                          <div className="text-xs text-muted-foreground">Days Remaining</div>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>

               <div className="space-y-6">
                 <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                       <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground flex items-center"><Calendar className="mr-2 h-4 w-4" /> Start Date</span>
                          <span>{format(project.startDate, "MMM d, yyyy")}</span>
                       </div>
                       <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-muted-foreground flex items-center"><Clock className="mr-2 h-4 w-4" /> Due Date</span>
                          <span>{format(project.endDate, "MMM d, yyyy")}</span>
                       </div>
                       <div className="flex justify-between items-center py-2">
                          <span className="text-muted-foreground flex items-center"><Users className="mr-2 h-4 w-4" /> Team Lead</span>
                          <div className="flex items-center gap-2">
                             <Avatar className="h-6 w-6">
                               <AvatarImage src={project.lead.avatar} />
                               <AvatarFallback>{project.lead.name[0]}</AvatarFallback>
                             </Avatar>
                             <span>{project.lead.name}</span>
                          </div>
                       </div>
                    </CardContent>
                 </Card>

                 <Card>
                    <CardHeader>
                       <CardTitle className="text-base">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                             <div key={i} className="flex gap-3 text-sm">
                                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                <div>
                                   <p className="leading-tight"><span className="font-semibold">Sarah Chen</span> completed task <span className="text-primary hover:underline cursor-pointer">Update homepage hero</span></p>
                                   <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                             </div>
                          ))}
                       </div>
                    </CardContent>
                 </Card>
               </div>
             </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Tasks</CardTitle>
                  <Button size="sm" variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
               </CardHeader>
               <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Task</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Assignee</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                       {projectTasks.map(task => (
                          <TableRow key={task.id} className="hover:bg-muted/30">
                             <TableCell>
                                <div className="font-medium">{task.title}</div>
                                <div className="text-xs text-muted-foreground truncate max-w-[300px]">{task.description}</div>
                             </TableCell>
                             <TableCell>
                                <Badge variant="outline" className="font-normal">{task.status}</Badge>
                             </TableCell>
                             <TableCell>
                                <Badge variant="outline" className={`font-normal border ${getPriorityColor(task.priority)}`}>
                                   {task.priority}
                                </Badge>
                             </TableCell>
                             <TableCell>
                                <div className="flex items-center gap-2">
                                   <Avatar className="h-6 w-6">
                                      <AvatarImage src={task.assignedTo.avatar} />
                                      <AvatarFallback>{task.assignedTo.name[0]}</AvatarFallback>
                                   </Avatar>
                                   <span className="text-sm">{task.assignedTo.name}</span>
                                </div>
                             </TableCell>
                             <TableCell className="text-sm text-muted-foreground">
                                {format(task.dueDate, "MMM d")}
                             </TableCell>
                             <TableCell>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                   <MoreHorizontal className="h-4 w-4" />
                                </Button>
                             </TableCell>
                          </TableRow>
                       ))}
                    </TableBody>
                  </Table>
               </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.team.map(member => (
                   <Card key={member.id} className="flex items-center p-4 gap-4">
                      <Avatar className="h-12 w-12">
                         <AvatarImage src={member.avatar} />
                         <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                         <div className="font-medium">{member.name}</div>
                         <div className="text-sm text-muted-foreground">{member.role}</div>
                         <div className="text-xs text-muted-foreground mt-0.5">{member.email}</div>
                      </div>
                      <Button variant="ghost" size="icon">
                         <MoreHorizontal className="h-4 w-4" />
                      </Button>
                   </Card>
                ))}
                <button className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg gap-2 text-muted-foreground hover:bg-muted/50 hover:text-primary hover:border-primary/50 transition-all h-[88px]">
                   <Plus className="h-5 w-5" />
                   <span className="font-medium">Add Member</span>
                </button>
             </div>
          </TabsContent>

          <TabsContent value="files">
             <Card>
                <CardContent className="pt-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[1, 2, 3].map(i => (
                         <div key={i} className="border border-border rounded-lg p-4 hover:bg-muted/30 cursor-pointer transition-colors group">
                            <div className="flex justify-between items-start mb-3">
                               <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded flex items-center justify-center">
                                  <Paperclip className="h-5 w-5" />
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                                   <MoreHorizontal className="h-3 w-3" />
                                </Button>
                            </div>
                            <div className="font-medium text-sm truncate">Project_Requirements_v2.pdf</div>
                            <div className="text-xs text-muted-foreground mt-1">2.4 MB • Uploaded yesterday</div>
                         </div>
                      ))}
                      <button className="border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center text-center text-muted-foreground hover:bg-muted/50 hover:text-primary hover:border-primary/50 transition-all">
                         <Plus className="h-6 w-6 mb-2" />
                         <span className="text-sm font-medium">Upload File</span>
                      </button>
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function Filter(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}
