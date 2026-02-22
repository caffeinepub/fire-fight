import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Move, Crosshair } from 'lucide-react';

interface ActionPanelProps {
  onMove: () => void;
  onAttack: () => void;
  disabled: boolean;
  canMove: boolean;
}

export default function ActionPanel({ onMove, onAttack, disabled, canMove }: ActionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={onMove}
          disabled={disabled || !canMove}
          className="w-full"
          variant="default"
        >
          <Move className="h-4 w-4 mr-2" />
          Move
        </Button>
        <Button
          onClick={onAttack}
          disabled={disabled}
          className="w-full"
          variant="destructive"
        >
          <Crosshair className="h-4 w-4 mr-2" />
          Attack
        </Button>
      </CardContent>
    </Card>
  );
}
