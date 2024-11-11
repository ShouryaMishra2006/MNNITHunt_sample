import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { User2, MapPin, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Participant = {
  id: number;
  firstName: string;
  progress: number;
  totalPuzzles: number;
  lastActive: string;
  responses: number;
  approved: number;
};

type ParticipantListProps = {
  huntId: number;
  participants: Participant[];
  onParticipantSelect: (id: number) => void;
  selectedParticipantId: number | null;
};

export function ParticipantList({ 
  huntId, 
  participants, 
  onParticipantSelect,
  selectedParticipantId 
}: ParticipantListProps) {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="space-y-4">
        {participants.map((participant) => {
          const progress = (participant.progress / participant.totalPuzzles) * 100;
          const isSelected = participant.id === selectedParticipantId;
          return (
            <Button
              key={participant.id}
              variant="ghost"
              className={cn(
                "w-full p-4 h-auto flex items-start justify-between hover:bg-emerald-500/10",
                isSelected && "bg-emerald-500/10 border-emerald-500/30"
              )}
              onClick={() => onParticipantSelect(participant.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <User2 className="w-5 h-5 text-emerald-500" />
                </div>
                
                <div className="text-left space-y-2">
                  <div>
                  <h2 className="font-medium text-emerald-700">{participant.firstName}name</h2>
                    <p className="text-sm text-gray-400">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {participant.lastActive}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span>{participant.responses} responses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{participant.approved} approved</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{participant.progress}/{participant.totalPuzzles}</span>
                    </div>
                    <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-sky-600"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </ScrollArea>
  );
}
