import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface OutputPanelProps {
  output: string | null;
  isComplete: boolean;
}

const OutputPanel = ({ output, isComplete }: OutputPanelProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className={`bg-card border-border transition-all duration-500 ${isComplete ? "border-success/50 shadow-lg shadow-success/5" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
          <Sparkles className={`h-4 w-4 ${isComplete ? "text-success" : "text-accent"}`} />
          Output
          {output && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-6 px-2"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3 w-3 text-success" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px] rounded-md bg-background/50 border border-border">
          {output ? (
            <div className="p-4">
              <pre className="text-sm font-mono whitespace-pre-wrap text-foreground">
                {output}
              </pre>
            </div>
          ) : (
            <div className="p-4 text-muted-foreground text-sm font-mono">
              Output will appear here after execution completes.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OutputPanel;
