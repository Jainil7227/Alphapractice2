import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, AlertCircle, CheckCircle2, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogEntry {
  id: number;
  timestamp: string;
  type: "info" | "success" | "error" | "processing";
  message: string;
}

interface ExecutionLogsProps {
  logs: LogEntry[];
  isExecuting: boolean;
}

const ExecutionLogs = ({ logs, isExecuting }: ExecutionLogsProps) => {
  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-3 w-3 text-success" />;
      case "error":
        return <AlertCircle className="h-3 w-3 text-destructive" />;
      case "processing":
        return <Loader2 className="h-3 w-3 text-accent animate-spin" />;
      default:
        return <Info className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
          <Terminal className="h-4 w-4 text-accent" />
          Execution Logs
          {isExecuting && (
            <span className="ml-auto flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs text-accent">Live</span>
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] rounded-md bg-background/50 border border-border">
          {logs.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm font-mono">
              {isExecuting ? "Waiting for logs..." : "No execution logs yet."}
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={cn(
                    "flex items-start gap-2 p-2 rounded text-xs font-mono transition-all",
                    log.type === "error" && "bg-destructive/10",
                    log.type === "success" && "bg-success/10",
                    log.type === "processing" && "bg-accent/10"
                  )}
                >
                  <span className="text-muted-foreground flex-shrink-0">
                    {log.timestamp}
                  </span>
                  <span className="flex-shrink-0 mt-0.5">{getIcon(log.type)}</span>
                  <span
                    className={cn(
                      "flex-1",
                      log.type === "error" && "text-destructive",
                      log.type === "success" && "text-success",
                      log.type === "processing" && "text-accent",
                      log.type === "info" && "text-foreground"
                    )}
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExecutionLogs;
