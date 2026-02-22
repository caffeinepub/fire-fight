import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import type { PlayerProfile } from '../backend';

interface LeaderboardTableProps {
  players: PlayerProfile[];
}

export default function LeaderboardTable({ players }: LeaderboardTableProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  if (players.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No players yet. Be the first to compete!</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player, index) => {
          const rank = index + 1;
          return (
            <TableRow key={player.principal.toString()}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getRankIcon(rank)}
                  <span className="font-display font-bold">{rank}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {player.principal.toString().slice(0, 8)}...
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="default" className="font-display">
                  {player.score.toString()}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
