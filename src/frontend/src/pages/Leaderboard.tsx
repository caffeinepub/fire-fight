import { useGetLeaderboard } from '../hooks/useQueries';
import LeaderboardTable from '../components/LeaderboardTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Loader2 } from 'lucide-react';

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useGetLeaderboard();

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Trophy className="h-16 w-16 text-primary mx-auto" />
          <div>
            <h1 className="font-display text-4xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">Top warriors in Fire Fight</p>
          </div>
        </div>

        <Card className="tactical-border">
          <CardHeader>
            <CardTitle className="font-display text-2xl">Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <LeaderboardTable players={leaderboard || []} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
