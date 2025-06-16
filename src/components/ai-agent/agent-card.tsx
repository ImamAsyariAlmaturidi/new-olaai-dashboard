"use client";

// import type { Agent } from "@/app/page";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
import { Settings, Trash2 } from "lucide-react";
import { Card, CardContent } from "../cards/card-only/card";
import Button from "../ui/button/Button";
import { Agent } from "http";

interface AgentCardProps {
  agent: Agent;
  onSettingsClick: (agent: Agent) => void;
  onDeleteClick: (agentId: string) => void;
}

export default function AgentCard({ agent, onSettingsClick, onDeleteClick }: AgentCardProps) {
  return (
    <Card className="w-64 hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
          {/* {agent.avatar} */}
        </div>
        <h3 className="font-semibold text-lg mb-4 text-slate-900">Test</h3>
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSettingsClick(agent)}
            className="shadow-sm"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 shadow-sm"
            // onClick={() => onDeleteClick(agent.id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
