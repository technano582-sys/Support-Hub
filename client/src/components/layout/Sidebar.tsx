import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Ticket, Users, BarChart3, Settings, HelpCircle, Layers, FolderKanban, CheckSquare } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: FolderKanban, label: "Projects", href: "/projects" },
    { icon: CheckSquare, label: "Kanban Board", href: "/kanban" },
    { icon: Ticket, label: "Tickets", href: "/tickets" },
    { icon: Layers, label: "Assets", href: "/assets" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
  ];

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen fixed left-0 top-0 text-sidebar-foreground z-30">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
        <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 mr-3 rounded" />
        <span className="font-heading font-bold text-lg tracking-tight">ServiceCore</span>
      </div>

      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
          Main Menu
        </div>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <a
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors group",
                location === item.href
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("h-4 w-4 mr-3", location === item.href ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground")} />
              {item.label}
            </a>
          </Link>
        ))}

        <div className="px-3 mt-8 mb-2 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
          System
        </div>
        <Link href="/settings">
          <a
            className={cn(
              "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors group",
              location === "/settings"
                 ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Settings className="h-4 w-4 mr-3 text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground" />
            Settings
          </a>
        </Link>
        <Link href="/help">
          <a
            className="flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
          >
            <HelpCircle className="h-4 w-4 mr-3 text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground" />
            Help & Support
          </a>
        </Link>
      </div>

      <div className="p-4 border-t border-sidebar-border/50">
        <div className="bg-sidebar-accent/50 rounded-lg p-3 text-xs text-sidebar-foreground/70">
          <div className="font-semibold mb-1">Enterprise Plan</div>
          <div className="mb-2">Your license expires in 24 days.</div>
          <button className="text-sidebar-primary hover:underline">Upgrade Now</button>
        </div>
      </div>
    </aside>
  );
}
