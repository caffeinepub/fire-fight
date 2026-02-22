import { ReactNode } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Shield, Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { identity, loginStatus } = useInternetIdentity();

  if (loginStatus === 'initializing') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <Shield className="h-20 w-20 text-primary mx-auto" />
          <div className="space-y-2">
            <h2 className="font-display text-3xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to access Fire Fight and join the battle.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
