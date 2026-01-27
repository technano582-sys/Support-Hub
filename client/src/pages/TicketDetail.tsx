import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { tickets, currentUser, TicketPriority, TicketStatus } from "@/lib/mockData";
import { useRoute } from "wouter";
import { format } from "date-fns";
import { 
  ArrowLeft, 
  Clock, 
  Paperclip, 
  Send, 
  Tag, 
  User, 
  MoreVertical,
  CheckCircle2
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function TicketDetail() {
  const [match, params] = useRoute("/tickets/:id");
  const ticketId = params?.id;
  const ticket = tickets.find(t => t.id === ticketId) || tickets[0]; // Fallback for mockup

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
          Back to Tickets
        </Button>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-bold text-foreground leading-tight">{ticket.subject}</h1>
                 <Badge variant="outline" className="font-mono text-muted-foreground">{ticket.id}</Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                Created by <span className="font-medium text-foreground">{ticket.requester.name}</span> on {format(ticket.createdAt, "PPP 'at' p")}
              </p>
            </div>

            {/* Description Card */}
            <Card className="shadow-sm border-border">
               <CardContent className="pt-6">
                 <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
                   {ticket.description}
                 </p>
                 
                 <div className="mt-6 flex flex-wrap gap-2">
                   {ticket.tags.map(tag => (
                     <Badge key={tag} variant="secondary" className="text-xs font-normal bg-secondary text-secondary-foreground">
                       <Tag className="mr-1 h-3 w-3 opacity-50" />
                       {tag}
                     </Badge>
                   ))}
                 </div>
               </CardContent>
            </Card>

            {/* Conversation Thread */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                 <Separator className="flex-1" />
                 <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Discussion</span>
                 <Separator className="flex-1" />
              </div>

              {/* Mock Reply 1 */}
              <div className="flex gap-4">
                 <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={ticket.assignedTo?.avatar} />
                    <AvatarFallback>{ticket.assignedTo?.name?.[0]}</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm relative">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{ticket.assignedTo?.name}</span>
                          <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Technician</Badge>
                       </div>
                       <span className="text-xs text-muted-foreground">{format(ticket.updatedAt, "MMM d, p")}</span>
                    </div>
                    <p className="text-sm text-foreground/80">I'm looking into this issue now. Have you checked if the cable is loose?</p>
                 </div>
              </div>

              {/* Reply Box */}
              <div className="flex gap-4 pt-4">
                 <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 space-y-3">
                    <div className="relative">
                       <Textarea 
                         placeholder="Type your reply here..." 
                         className="min-h-[120px] resize-none pr-12 text-sm"
                       />
                       <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-muted-foreground">
                          <Paperclip className="h-4 w-4" />
                       </Button>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Private Note</Button>
                       </div>
                       <Button size="sm">
                          <Send className="mr-2 h-4 w-4" />
                          Send Reply
                       </Button>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar Properties */}
          <div className="w-full lg:w-80 space-y-6">
             <Card className="shadow-sm border-border">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-sm font-semibold">Properties</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                   <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Status</label>
                      <Select defaultValue={ticket.status}>
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Open">Open</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>

                   <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Priority</label>
                      <Select defaultValue={ticket.priority}>
                        <SelectTrigger className="w-full h-9">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                   </div>

                   <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Assigned To</label>
                      <div className="flex items-center gap-2 p-2 border border-input rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                        <Avatar className="h-6 w-6">
                           <AvatarImage src={ticket.assignedTo?.avatar} />
                           <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{ticket.assignedTo?.name || "Unassigned"}</span>
                      </div>
                   </div>

                   <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">Due Date</label>
                      <div className="flex items-center gap-2 p-2 border border-input rounded-md text-sm">
                         <Clock className="h-4 w-4 text-muted-foreground" />
                         <span>{format(ticket.dueDate, "PPP")}</span>
                      </div>
                   </div>
                </CardContent>
             </Card>

             <Card className="shadow-sm border-border">
                <CardHeader className="pb-3 border-b border-border/50">
                  <CardTitle className="text-sm font-semibold">Requester Info</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={ticket.requester.avatar} />
                      <AvatarFallback>{ticket.requester.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{ticket.requester.name}</div>
                      <div className="text-xs text-muted-foreground">{ticket.requester.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-medium">{ticket.requester.department}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/50">
                      <span className="text-muted-foreground">Location</span>
                      <span className="font-medium">New York HQ</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Role</span>
                      <span className="font-medium capitalize">{ticket.requester.role}</span>
                    </div>
                  </div>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
