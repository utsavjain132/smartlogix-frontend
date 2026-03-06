import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, LogOut, Package, MapPin } from 'lucide-react';

const TruckerShell = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-card px-4 shrink-0">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <SheetHeader>
              <SheetTitle>
                <Link to="/" className="flex items-center gap-2 font-bold text-lg">
                  🚛 SmartLogix
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-1">
              <Link
                to="/trucker-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Package className="h-4 w-4" />
                My Jobs
              </Link>
              <Link
                to="/trucker-dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Find Loads
              </Link>
            </nav>
            <div className="absolute bottom-6 left-4 right-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <span className="font-semibold text-foreground">Trucker Dashboard</span>
      </header>
      {/* Page content */}
      <main className="flex-1 p-4 md:p-6">
        {children}
      </main>
    </div>
  );
};

export default TruckerShell;
