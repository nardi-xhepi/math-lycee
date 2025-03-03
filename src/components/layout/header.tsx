'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Header() {
  const { user, userData, logout } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="border-b bg-background">
      <div className="container flex items-center justify-between py-4">
        <div>
          <Link href="/" className="text-2xl font-bold">
            MathLycée
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/seconde" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Seconde
          </Link>
          <Link 
            href="/premiere" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Première
          </Link>
          <Link 
            href="/terminale" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terminale
          </Link>
          <Link 
            href="/exercises" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Exercices
          </Link>
          <Link 
            href="/subscription" 
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Abonnements
          </Link>
        </nav>
        
        <div>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback>
                      {userData?.displayName 
                        ? getInitials(userData.displayName) 
                        : user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    Tableau de bord
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    Profil
                  </Link>
                </DropdownMenuItem>
                {userData?.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      Administration
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link href="/login">
                  Connexion
                </Link>
              </Button>
              <Button asChild>
                <Link href="/register">
                  Inscription
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}