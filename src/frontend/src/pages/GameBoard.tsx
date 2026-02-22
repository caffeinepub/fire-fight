import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useSetPosition } from '../hooks/useQueries';
import GameGrid from '../components/GameGrid';
import ActionPanel from '../components/ActionPanel';
import PlayerToken from '../components/PlayerToken';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function GameBoard() {
  const { roomId } = useParams({ from: '/game/$roomId' });
  const setPosition = useSetPosition();
  const [currentTurn, setCurrentTurn] = useState<'player1' | 'player2'>('player1');
  const [player1Pos, setPlayer1Pos] = useState({ x: 2, y: 2 });
  const [player2Pos, setPlayer2Pos] = useState({ x: 7, y: 7 });
  const [selectedCell, setSelectedCell] = useState<{ x: number; y: number } | null>(null);

  const isMyTurn = currentTurn === 'player1'; // Simplified for demo

  const handleCellClick = (x: number, y: number) => {
    if (!isMyTurn) return;
    setSelectedCell({ x, y });
  };

  const handleMove = async () => {
    if (!selectedCell || !isMyTurn) return;

    try {
      await setPosition.mutateAsync({
        x: BigInt(selectedCell.x),
        y: BigInt(selectedCell.y),
      });
      setPlayer1Pos(selectedCell);
      setSelectedCell(null);
      setCurrentTurn('player2');
    } catch (error) {
      console.error('Move failed:', error);
    }
  };

  const handleAttack = () => {
    if (!isMyTurn) return;
    // Attack logic would go here
    setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
  };

  return (
    <div className="container py-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold">Battle Room #{roomId}</h2>
            <p className="text-muted-foreground">Tactical Combat in Progress</p>
          </div>
          <Badge variant={isMyTurn ? 'default' : 'secondary'} className="text-lg px-4 py-2">
            {isMyTurn ? 'Your Turn' : "Opponent's Turn"}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <Card className="tactical-border">
            <CardHeader>
              <CardTitle className="font-display">Battlefield</CardTitle>
            </CardHeader>
            <CardContent>
              <GameGrid
                onCellClick={handleCellClick}
                selectedCell={selectedCell}
                player1Pos={player1Pos}
                player2Pos={player2Pos}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-display text-lg">Players</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlayerToken
                  name="You"
                  health={100}
                  isActive={currentTurn === 'player1'}
                />
                <PlayerToken
                  name="Opponent"
                  health={85}
                  isActive={currentTurn === 'player2'}
                />
              </CardContent>
            </Card>

            <ActionPanel
              onMove={handleMove}
              onAttack={handleAttack}
              disabled={!isMyTurn || setPosition.isPending}
              canMove={!!selectedCell}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
