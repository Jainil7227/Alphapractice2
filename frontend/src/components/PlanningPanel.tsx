import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListOrdered, Circle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PlanStep {
  id: number;
  description: string;
  status: "pending" | "active" | "completed";
}

interface PlanningPanelProps {
  steps: PlanStep[];
  isPlanning: boolean;
}

const PlanningPanel = ({ steps, isPlanning }: PlanningPanelProps) => {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
          <ListOrdered className="h-4 w-4 text-accent" />
          Planning
          {isPlanning && (
            <Loader2 className="h-3 w-3 animate-spin text-accent ml-auto" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {steps.length === 0 ? (
          <p className="text-muted-foreground text-sm font-mono">
            {isPlanning ? "Generating plan..." : "No plan generated yet."}
          </p>
        ) : (
          <ol className="space-y-3">
            {steps.map((step) => (
              <li
                key={step.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-md transition-all duration-300",
                  step.status === "active" && "bg-accent/10 border border-accent/30",
                  step.status === "completed" && "opacity-60",
                  step.status === "pending" && "opacity-40"
                )}
              >
                <span className="flex-shrink-0 mt-0.5">
                  {step.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : step.status === "active" ? (
                    <div className="h-4 w-4 rounded-full border-2 border-accent bg-accent/20 animate-pulse" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </span>
                <div className="flex-1">
                  <span className="text-xs font-mono text-muted-foreground mr-2">
                    {String(step.id).padStart(2, "0")}
                  </span>
                  <span className={cn(
                    "text-sm font-mono",
                    step.status === "active" && "text-foreground",
                    step.status === "completed" && "text-muted-foreground line-through",
                    step.status === "pending" && "text-muted-foreground"
                  )}>
                    {step.description}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanningPanel;
