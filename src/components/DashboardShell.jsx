import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Package, Users, LogOut, Menu, X
} from 'lucide-react';

const DashboardShell = ({ children, role }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const navItems = role === 'ADMIN'
    ? [
        { label: 'Overview', icon: LayoutDashboard, href: '/admin-dashboard' },
        { label: 'Users', icon: Users, href: '/admin-dashboard' },
        { label: 'All Loads', icon: Package, href: '/admin-dashboard' },
      ]
    : [
        { label: 'My Loads', icon: Package, href: '/business-dashboard' },
      ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar — fixed on mobile, relative (flex) on md+ */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 flex-col',
        'bg-sidebar text-sidebar-foreground',
        'border-r border-sidebar-border',
        'transition-transform duration-300',
        'md:relative md:translate-x-0 md:flex',
        sidebarOpen ? 'flex translate-x-0' : 'hidden md:flex'
      )}>
        {/* Brand */}
        <div className="flex h-16 items-center px-6 border-b border-sidebar-border shrink-0">
          <Link to="/" className="flex items-center gap-2 font-bold text-sidebar-foreground text-lg">
            🚛 SmartLogix
          </Link>
        </div>
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.href + item.label}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        {/* Divider (plain border — Separator component not yet installed) */}
        <div className="border-t border-sidebar-border" />
        {/* Logout */}
        <div className="p-4 shrink-0">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content column */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar with mobile hamburger */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <span className="text-sm font-medium text-muted-foreground">
            {role === 'ADMIN' ? 'Admin Control Center' : 'Business Dashboard'}
          </span>
        </header>
        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
