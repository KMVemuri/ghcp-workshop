"use client";

import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "./ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DarkModeToggle } from "./dark-mode-toggle";

export const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null);

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login-demo');
  };

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">
          Sport App GitHub Copilot Workshop
        </h1>
        <p className="text-muted-foreground">
          Elevate Your Game with Contoso Sport: Where Sports Passion Meets
          Performance!
        </p>
      </div>
      
      {/* User Menu */}
      <div className="flex items-center gap-3">
        <DarkModeToggle />
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <User className="h-4 w-4" />
              <span className="text-muted-foreground">
                {user.name || user.email}
              </span>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </>
        ) : (
          <Link href="/login-demo">
            <Button variant="default" size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden md:inline">Login</span>
            </Button>
          </Link>
        )}
        <MobileSidebar />
      </div>
    </nav>
  );
};
