import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tickets, TicketPriority, TicketStatus } from "@/lib/mockData";
import { Filter, MoreHorizontal, Plus, Download } from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Tickets() {
  
  const getPriorityColor = (priority: TicketPriority) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800";
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800";
      case "Medium": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default: return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "Open": return "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900";
      case "In Progress": return "text-purple-600 bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900";
      case "Pending": return "text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900";
      case "Resolved": return "text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900";
      default: return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage and track all support requests.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="sm">
             <Download className="mr-2 h-4 w-4" />
             Export
           </Button>
           <Link href="/tickets/new">
             <Button size="sm">
               <Plus className="mr-2 h-4 w-4" />
               New Ticket
             </Button>
           </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-muted/20">
          <div className="relative w-full sm:max-w-xs">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-9 w-full bg-background"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="ml-auto sm:ml-0">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <div className="h-8 w-px bg-border mx-2"></div>
            <select className="bg-transparent text-sm font-medium focus:outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[100px]">Ticket ID</TableHead>
              <TableHead className="min-w-[300px]">Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Requester</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} className="group cursor-pointer hover:bg-muted/30">
                <TableCell className="font-mono text-xs font-medium text-muted-foreground">
                  <Link href={`/tickets/${ticket.id}`}>{ticket.id}</Link>
                </TableCell>
                <TableCell>
                  <Link href={`/tickets/${ticket.id}`}>
                    <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {ticket.subject}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{ticket.type}</span>
                      {ticket.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground border border-border">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-normal border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={ticket.requester.avatar} />
                      <AvatarFallback>{ticket.requester.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">{ticket.requester.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {ticket.assignedTo ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={ticket.assignedTo.avatar} />
                        <AvatarFallback>{ticket.assignedTo.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{ticket.assignedTo.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground italic">Unassigned</span>
                  )}
                </TableCell>
                <TableCell className="text-right text-xs text-muted-foreground">
                  {format(ticket.updatedAt, "MMM d, h:mm a")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit ticket</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Delete ticket</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground bg-muted/20">
           <div>Showing 1-5 of 124 tickets</div>
           <div className="flex gap-2">
             <Button variant="outline" size="sm" disabled>Previous</Button>
             <Button variant="outline" size="sm">Next</Button>
           </div>
        </div>
      </div>
    </Layout>
  );
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
