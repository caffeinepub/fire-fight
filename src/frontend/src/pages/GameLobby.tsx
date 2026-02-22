import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useCreateGameRoom } from '../hooks/useQueries';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import HeroBanner from '../components/HeroBanner';
import RoomCard from '../components/RoomCard';
import { Button } from '@/components/ui/button';
import { Plus, Users, Loader2 } from 'lucide-react';

export default function GameLobby() {
  const navigate = useNavigate();
  const createRoom = useCreateGameRoom();
  const { data: userProfile } = useGetCallerUserProfile();
  const [mockRooms] = useState([
    { id: BigInt(1), players: 2, maxPlayers: 4, status: 'waiting' },
    { id: BigInt(2), players: 3, maxPlayers: 4, status: 'waiting' },
    { id: BigInt(3), players: 4, maxPlayers: 4, status: 'full' },
  ]);

  const handleCreateRoom = async () => {
    try {
      const roomId = await createRoom.mutateAsync();
      navigate({ to: '/game/$roomId', params: { roomId: roomId.toString() } });
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <HeroBanner />
      
      <div className="container py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold mb-2">Game Lobby</h2>
              <p className="text-muted-foreground">
                {userProfile ? `Welcome back, ${userProfile.name}!` : 'Join or create a battle room'}
              </p>
            </div>
            <Button
              onClick={handleCreateRoom}
              disabled={createRoom.isPending}
              size="lg"
              className="tactical-glow"
            >
              {createRoom.isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5 mr-2" />
                  Create Room
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockRooms.map((room) => (
              <RoomCard key={room.id.toString()} room={room} />
            ))}
          </div>

          {mockRooms.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <Users className="h-16 w-16 text-muted-foreground mx-auto" />
              <div>
                <h3 className="font-display text-xl font-bold mb-2">No Active Rooms</h3>
                <p className="text-muted-foreground">
                  Be the first to create a battle room!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
