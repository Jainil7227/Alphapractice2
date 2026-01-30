import { Bot, Zap } from "lucide-react";

const AgentHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="h-8 w-8 text-accent" />
            <Zap className="h-3 w-3 text-warning absolute -top-1 -right-1" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Agent Runner</h1>
            <p className="text-xs text-muted-foreground font-mono">
              AI Reasoning & Execution Visualizer
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">System Ready</span>
        </div>
      </div>
    </header>
  );
};

export default AgentHeader;
