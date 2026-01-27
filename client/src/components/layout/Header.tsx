import { Bell, Search, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center w-1/3">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets, assets, or solutions..."
            className="pl-9 w-full bg-secondary/50 border-transparent focus:bg-background transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="default" size="sm" className="hidden md:flex shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>

        <div className="h-8 w-px bg-border mx-2 hidden md:block"></div>

        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-2 pr-1 h-9 rounded-full flex items-center gap-2 hover:bg-secondary/80">
              <Avatar className="h-7 w-7 border border-border">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="text-sm text-left hidden md:block">
                <div className="font-medium leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wide font-semibold">{currentUser.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Keyboard Shortcuts</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
