import { useNavigate } from '@tanstack/react-router';
import { useJoinGameRoom } from '../hooks/useQueries';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Lock } from 'lucide-react';

interface RoomCardProps {
  room: {
    id: bigint;
    players: number;
    maxPlayers: number;
    status: string;
  };
}

export default function RoomCard({ room }: RoomCardProps) {
  const navigate = useNavigate();
  const joinRoom = useJoinGameRoom();

  const isFull = room.status === 'full' || room.players >= room.maxPlayers;

  const handleJoin = async () => {
    try {
      await joinRoom.mutateAsync(room.id);
      navigate({ to: '/game/$roomId', params: { roomId: room.id.toString() } });
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  return (
    <Card className="tactical-border hover:tactical-glow transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-xl">
            Room #{room.id.toString()}
          </CardTitle>
          <Badge variant={isFull ? 'destructive' : 'default'}>
            {isFull ? 'Full' : 'Open'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="font-medium">
            {room.players} / {room.maxPlayers} Players
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleJoin}
          disabled={isFull || joinRoom.isPending}
          className="w-full"
          variant={isFull ? 'outline' : 'default'}
        >
          {isFull ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Room Full
            </>
          ) : joinRoom.isPending ? (
            'Joining...'
          ) : (
            'Join Battle'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
