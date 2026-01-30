import { useState, useCallback } from "react";
import AgentHeader from "@/components/AgentHeader";
import TaskInput from "@/components/TaskInput";
import PlanningPanel, { PlanStep } from "@/components/PlanningPanel";
import ExecutionLogs, { LogEntry } from "@/components/ExecutionLogs";
import OutputPanel from "@/components/OutputPanel";

const MOCK_STEPS: PlanStep[] = [
  { id: 1, description: "Parse and understand the user task", status: "pending" },
  { id: 2, description: "Research relevant information", status: "pending" },
  { id: 3, description: "Generate solution approach", status: "pending" },
  { id: 4, description: "Execute and validate results", status: "pending" },
  { id: 5, description: "Format and return final output", status: "pending" },
];

const Index = () => {
  const [task, setTask] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isPlanning, setIsPlanning] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [steps, setSteps] = useState<PlanStep[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const getTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  };

  const addLog = useCallback((type: LogEntry["type"], message: string) => {
    setLogs((prev) => [
      ...prev,
      { id: Date.now(), timestamp: getTimestamp(), type, message },
    ]);
  }, []);

  const simulateAgent = async () => {
    setIsRunning(true);
    setIsPlanning(true);
    setIsExecuting(false);
    setSteps([]);
    setLogs([]);
    setOutput(null);
    setIsComplete(false);

    addLog("info", "Agent initialized");
    addLog("processing", "Generating execution plan...");

    // Simulate planning phase
    await new Promise((r) => setTimeout(r, 1000));
    setSteps(MOCK_STEPS);
    addLog("success", "Plan generated with 5 steps");
    setIsPlanning(false);
    setIsExecuting(true);

    // Simulate execution of each step
    for (let i = 0; i < MOCK_STEPS.length; i++) {
      setSteps((prev) =>
        prev.map((step, idx) => ({
          ...step,
          status: idx === i ? "active" : idx < i ? "completed" : "pending",
        }))
      );

      addLog("processing", `Executing step ${i + 1}: ${MOCK_STEPS[i].description}`);
      await new Promise((r) => setTimeout(r, 800 + Math.random() * 700));
      addLog("success", `Step ${i + 1} completed`);
    }

    // Mark all steps as completed
    setSteps((prev) => prev.map((step) => ({ ...step, status: "completed" })));

    addLog("info", "Generating final output...");
    await new Promise((r) => setTimeout(r, 500));

    setOutput(
      `Task Completed Successfully!\n\nInput Task: "${task}"\n\nResult:\nThe agent has successfully processed your request through all 5 planned steps. All sub-tasks were executed without errors.\n\nSummary:\n- Planning: ✓ Complete\n- Execution: ✓ Complete\n- Validation: ✓ Passed\n\nReady for next task.`
    );

    addLog("success", "Agent execution complete");
    setIsExecuting(false);
    setIsRunning(false);
    setIsComplete(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <AgentHeader />
      
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          {/* Task Input Section */}
          <section>
            <TaskInput
              value={task}
              onChange={setTask}
              onRun={simulateAgent}
              isRunning={isRunning}
            />
          </section>

          {/* Main Grid - Planning & Execution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlanningPanel steps={steps} isPlanning={isPlanning} />
            <ExecutionLogs logs={logs} isExecuting={isExecuting} />
          </div>

          {/* Output Section */}
          <section>
            <OutputPanel output={output} isComplete={isComplete} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            AI Agent Reasoning & Execution Visualizer • Hackathon Edition
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
