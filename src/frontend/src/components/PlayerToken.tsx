import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { User } from 'lucide-react';

interface PlayerTokenProps {
  name: string;
  health: number;
  isActive: boolean;
}

export default function PlayerToken({ name, health, isActive }: PlayerTokenProps) {
  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${isActive ? 'border-primary bg-primary/10' : 'border-border'}`}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/assets/generated/avatar-default.dim_128x128.png" />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-display font-bold">{name}</p>
          <p className="text-sm text-muted-foreground">HP: {health}/100</p>
        </div>
      </div>
      <Progress value={health} className="h-2" />
    </div>
  );
}
