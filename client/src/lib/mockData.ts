import { addDays, subDays, subHours } from "date-fns";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "technician" | "user";
  avatar: string;
  department: string;
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

export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  email: "alex.morgan@company.com",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  department: "IT Operations",
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Sarah Chen",
    email: "sarah.chen@company.com",
    role: "technician",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "IT Support",
  },
  {
    id: "u3",
    name: "Michael Scott",
    email: "m.scott@company.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "Sales",
  },
  {
    id: "u4",
    name: "Emily Blunt",
    email: "emily.b@company.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    department: "HR",
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
