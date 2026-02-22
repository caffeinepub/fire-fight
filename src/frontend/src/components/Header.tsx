import { Link, useNavigate } from '@tanstack/react-router';
import LoginButton from './LoginButton';
import { Menu, Trophy, Swords } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/generated/logo.dim_256x256.png" 
              alt="Fire Fight" 
              className="h-10 w-10 transition-transform group-hover:scale-110"
            />
            <span className="font-display text-2xl font-bold text-primary tracking-wider">
              FIRE FIGHT
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Swords className="h-4 w-4" />
              Lobby
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <LoginButton />
          
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur">
          <nav className="container py-4 flex flex-col gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Swords className="h-4 w-4" />
              Lobby
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
