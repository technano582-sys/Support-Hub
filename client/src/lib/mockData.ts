import { addDays, subDays, subHours } from "date-fns";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatar: string;
  department: string;
  status: "active" | "offline" | "busy";
};

export type TicketStatus = "Open" | "In Progress" | "Pending" | "Resolved" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High" | "Critical";
export type TicketType = "Incident" | "Service Request" | "Problem" | "Change";

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  requester: User;
  assignedTo?: User;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date;
  tags: string[];
};

export type AssetStatus = "In Use" | "In Stock" | "Maintenance" | "Retired";

export type Asset = {
  id: string;
  name: string;
  type: "Hardware" | "Software" | "License";
  model: string;
  serialNumber: string;
  status: AssetStatus;
  assignedTo?: string; // user id
  purchaseDate: Date;
  warrantyExpires: Date;
};

export type ProjectStatus = "Planning" | "Active" | "On Hold" | "Completed";

export type Project = {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  lead: User;
  team: User[];
  startDate: Date;
  endDate: Date;
  progress: number;
};

export type TaskStatus = "Todo" | "In Progress" | "Review" | "Done";

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TicketPriority;
  assignedTo: User;
  dueDate: Date;
};

export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.morgan@company.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  department: "IT Operations",
  status: "active",
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "manager",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Engineering",
    status: "active",
  },
  {
    id: "u3",
    name: "Michael Scott",
    email: "m.scott@company.com",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Sales",
    status: "busy",
  },
  {
    id: "u4",
    name: "Emily Blunt",
    email: "emily.b@company.com",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Design",
    status: "offline",
  },
  {
    id: "u5",
    name: "David Kim",
    email: "d.kim@company.com",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Engineering",
    status: "active",
  },
];

export const tickets: Ticket[] = [
  {
    id: "INC-2024-001",
    subject: "Unable to access VPN from remote location",
    description: "I'm trying to connect to the VPN from my home network but it keeps timing out. I've tried restarting my router and computer.",
    status: "Open",
    priority: "High",
    type: "Incident",
    requester: users[2],
    assignedTo: users[0],
    createdAt: subHours(new Date(), 2),
    updatedAt: subHours(new Date(), 1),
    dueDate: addDays(new Date(), 1),
    tags: ["Network", "VPN", "Remote Access"],
  },
  {
    id: "SR-2024-045",
    subject: "New Laptop Request for Marketing Intern",
    description: "We have a new intern starting next Monday. Needs a standard MacBook Air setup.",
    status: "Pending",
    priority: "Medium",
    type: "Service Request",
    requester: users[3],
    assignedTo: users[1],
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 1),
    dueDate: addDays(new Date(), 3),
    tags: ["Hardware", "Onboarding"],
  },
  {
    id: "INC-2024-003",
    subject: "Printer on 3rd floor jamming repeatedly",
    description: "The big Xerox machine on the 3rd floor keeps jamming when printing double-sided.",
    status: "In Progress",
    priority: "Low",
    type: "Incident",
    requester: users[2],
    assignedTo: users[1],
    createdAt: subDays(new Date(), 1),
    updatedAt: subHours(new Date(), 4),
    dueDate: addDays(new Date(), 2),
    tags: ["Hardware", "Printer"],
  },
  {
    id: "PRB-2024-001",
    subject: "Intermittent email delivery delays",
    description: "Multiple users reporting 10-15 minute delays in receiving external emails.",
    status: "Open",
    priority: "Critical",
    type: "Problem",
    requester: users[0],
    createdAt: subHours(new Date(), 5),
    updatedAt: subHours(new Date(), 5),
    dueDate: addDays(new Date(), 0),
    tags: ["Email", "Exchange", "Server"],
  },
  {
    id: "INC-2024-004",
    subject: "Software license expired warning on Adobe",
    description: "Getting a popup saying my Creative Cloud license has expired.",
    status: "Resolved",
    priority: "Medium",
    type: "Incident",
    requester: users[3],
    assignedTo: users[0],
    createdAt: subDays(new Date(), 5),
    updatedAt: subDays(new Date(), 1),
    dueDate: subDays(new Date(), 1),
    tags: ["Software", "License"],
  },
];

export const stats = {
  totalTickets: 124,
  openTickets: 45,
  pendingTickets: 12,
  resolvedTickets: 67,
  slaBreached: 3,
  avgResponseTime: "1h 45m",
  customerSatisfaction: 4.8,
};

export const chartData = [
  { name: "Mon", tickets: 12, resolved: 10 },
  { name: "Tue", tickets: 19, resolved: 15 },
  { name: "Wed", tickets: 15, resolved: 12 },
  { name: "Thu", tickets: 22, resolved: 18 },
  { name: "Fri", tickets: 25, resolved: 20 },
  { name: "Sat", tickets: 5, resolved: 4 },
  { name: "Sun", tickets: 2, resolved: 2 },
];

export const assets: Asset[] = [
  {
    id: "AST-001",
    name: "MacBook Pro 16",
    type: "Hardware",
    model: "M3 Max",
    serialNumber: "FVFX23K9J1",
    status: "In Use",
    assignedTo: "u1",
    purchaseDate: subDays(new Date(), 120),
    warrantyExpires: addDays(new Date(), 600),
  },
  {
    id: "AST-002",
    name: "Dell UltraSharp 27",
    type: "Hardware",
    model: "U2723QE",
    serialNumber: "CN-0V4K9J",
    status: "In Stock",
    purchaseDate: subDays(new Date(), 30),
    warrantyExpires: addDays(new Date(), 700),
  },
  {
    id: "AST-003",
    name: "Adobe Creative Cloud",
    type: "License",
    model: "All Apps",
    serialNumber: "N/A",
    status: "In Use",
    assignedTo: "u3",
    purchaseDate: subDays(new Date(), 200),
    warrantyExpires: addDays(new Date(), 165),
  },
  {
    id: "AST-004",
    name: "Herman Miller Aeron",
    type: "Hardware",
    model: "Remastered B",
    serialNumber: "HM-99283",
    status: "In Use",
    assignedTo: "u2",
    purchaseDate: subDays(new Date(), 400),
    warrantyExpires: subDays(new Date(), 10),
  },
  {
    id: "AST-005",
    name: "Lenovo ThinkPad X1",
    type: "Hardware",
    model: "Carbon Gen 11",
    serialNumber: "PF-2X9L9J",
    status: "Maintenance",
    purchaseDate: subDays(new Date(), 150),
    warrantyExpires: addDays(new Date(), 215),
  }
];

export const projects: Project[] = [
  {
    id: "PROJ-001",
    name: "Website Redesign",
    description: "Overhaul of the corporate website with new branding and CMS.",
    status: "Active",
    lead: users[1],
    team: [users[1], users[3], users[4]],
    startDate: subDays(new Date(), 15),
    endDate: addDays(new Date(), 45),
    progress: 35,
  },
  {
    id: "PROJ-002",
    name: "Cloud Migration",
    description: "Moving on-premise infrastructure to AWS.",
    status: "Planning",
    lead: users[0],
    team: [users[0], users[1]],
    startDate: addDays(new Date(), 10),
    endDate: addDays(new Date(), 90),
    progress: 0,
  },
  {
    id: "PROJ-003",
    name: "Q3 Marketing Campaign",
    description: "Digital and print campaign for the new product launch.",
    status: "Active",
    lead: users[3],
    team: [users[3], users[4]],
    startDate: subDays(new Date(), 5),
    endDate: addDays(new Date(), 25),
    progress: 15,
  },
];

export const tasks: Task[] = [
  {
    id: "TASK-101",
    projectId: "PROJ-001",
    title: "Finalize Homepage Mockups",
    description: "Complete the high-fidelity designs for the homepage including mobile view.",
    status: "Done",
    priority: "High",
    assignedTo: users[4],
    dueDate: subDays(new Date(), 2),
  },
  {
    id: "TASK-102",
    projectId: "PROJ-001",
    title: "Implement Hero Section",
    description: "Code the hero section with the new animation library.",
    status: "In Progress",
    priority: "Medium",
    assignedTo: users[1],
    dueDate: addDays(new Date(), 2),
  },
  {
    id: "TASK-103",
    projectId: "PROJ-001",
    title: "Content Strategy Meeting",
    description: "Define the tone of voice and key messaging.",
    status: "Todo",
    priority: "Medium",
    assignedTo: users[3],
    dueDate: addDays(new Date(), 5),
  },
  {
    id: "TASK-201",
    projectId: "PROJ-002",
    title: "AWS Cost Estimation",
    description: "Calculate projected monthly costs for EC2 and RDS instances.",
    status: "Review",
    priority: "High",
    assignedTo: users[0],
    dueDate: addDays(new Date(), 1),
  },
  {
    id: "TASK-202",
    projectId: "PROJ-002",
    title: "Security Audit",
    description: "Review current security policies before migration planning.",
    status: "Todo",
    priority: "Critical",
    assignedTo: users[0],
    dueDate: addDays(new Date(), 15),
  },
];
