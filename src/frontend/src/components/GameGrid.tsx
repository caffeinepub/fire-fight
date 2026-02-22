interface GameGridProps {
  onCellClick: (x: number, y: number) => void;
  selectedCell: { x: number; y: number } | null;
  player1Pos: { x: number; y: number };
  player2Pos: { x: number; y: number };
}

export default function GameGrid({ onCellClick, selectedCell, player1Pos, player2Pos }: GameGridProps) {
  const gridSize = 10;

  return (
    <div className="aspect-square w-full max-w-2xl mx-auto">
      <div
        className="grid gap-1 h-full"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSelected = selectedCell?.x === x && selectedCell?.y === y;
          const isPlayer1 = player1Pos.x === x && player1Pos.y === y;
          const isPlayer2 = player2Pos.x === x && player2Pos.y === y;

          return (
            <button
              key={index}
              onClick={() => onCellClick(x, y)}
              className={`
                combat-grid-cell aspect-square rounded border-2 transition-all
                ${isSelected ? 'bg-accent border-accent' : 'bg-card border-border'}
                ${isPlayer1 ? 'bg-primary border-primary' : ''}
                ${isPlayer2 ? 'bg-destructive border-destructive' : ''}
                hover:border-accent
              `}
            >
              {isPlayer1 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-primary-foreground" />
                </div>
              )}
              {isPlayer2 && (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full bg-destructive-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
