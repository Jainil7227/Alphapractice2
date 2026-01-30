import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

interface TaskInputProps {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

const TaskInput = ({ value, onChange, onRun, isRunning }: TaskInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Task Input
        </h2>
      </div>
      <Textarea
        placeholder="Describe your task for the agent..."
        className="min-h-[120px] resize-none font-mono text-sm bg-card border-border focus:border-accent focus:ring-accent/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isRunning}
      />
      <Button
        onClick={onRun}
        disabled={!value.trim() || isRunning}
        className="w-full sm:w-auto"
        size="lg"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Run Agent
          </>
        )}
      </Button>
    </div>
  );
};

export default TaskInput;
