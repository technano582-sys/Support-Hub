import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tasks, users, TaskStatus, TicketPriority } from "@/lib/mockData";
import { Plus, MoreHorizontal, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function Kanban() {
  const columns: { id: TaskStatus; title: string }[] = [
    { id: "Todo", title: "To Do" },
    { id: "In Progress", title: "In Progress" },
    { id: "Review", title: "In Review" },
    { id: "Done", title: "Completed" },
  ];

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Kanban Board</h1>
          <p className="text-muted-foreground mt-1">Visual task management and workflow tracking.</p>
        </div>
        <div className="flex gap-2">
           <Button size="sm">
             <Plus className="mr-2 h-4 w-4" />
             Add Task
           </Button>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-6 h-[calc(100vh-220px)]">
        {columns.map((col) => (
          <div key={col.id} className="min-w-[300px] w-[350px] flex flex-col rounded-lg bg-muted/30 border border-border/50 h-full">
            <div className="p-4 flex items-center justify-between border-b border-border/50 bg-muted/50 rounded-t-lg sticky top-0 z-10 backdrop-blur-sm">
               <div className="flex items-center gap-2">
                 <h3 className="font-semibold text-sm">{col.title}</h3>
                 <Badge variant="secondary" className="text-[10px] h-5 min-w-[20px] justify-center px-1">
                   {tasks.filter(t => t.status === col.id).length}
                 </Badge>
               </div>
               <Button variant="ghost" size="icon" className="h-6 w-6">
                 <Plus className="h-3 w-3" />
               </Button>
            </div>

            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {tasks.filter(t => t.status === col.id).map(task => (
                <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer group border-border/60">
                   <CardContent className="p-3 space-y-3">
                      <div className="flex justify-between items-start">
                         <Badge variant="outline" className={`text-[10px] py-0 h-5 border ${getPriorityColor(task.priority)}`}>
                           {task.priority}
                         </Badge>
                         <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 -mr-2 -mt-1">
                           <MoreHorizontal className="h-3 w-3" />
                         </Button>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm leading-tight mb-1">{task.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                         <div className="flex items-center text-[10px] text-muted-foreground">
                            {task.dueDate < new Date() ? (
                              <Calendar className="mr-1 h-3 w-3 text-red-500" />
                            ) : (
                              <Clock className="mr-1 h-3 w-3" />
                            )}
                            <span className={task.dueDate < new Date() ? "text-red-500 font-medium" : ""}>
                              {format(task.dueDate, "MMM d")}
                            </span>
                         </div>
                         <Avatar className="h-6 w-6 border border-border">
                            <AvatarImage src={task.assignedTo.avatar} />
                            <AvatarFallback>{task.assignedTo.name[0]}</AvatarFallback>
                         </Avatar>
                      </div>
                   </CardContent>
                </Card>
              ))}
              
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <div className="h-24 border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
