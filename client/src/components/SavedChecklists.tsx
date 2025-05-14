import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { Checklist } from "@/types/checklist";

interface SavedChecklistsProps {
  checklists: Checklist[];
  onLoadChecklist: (index: number) => void;
  onDeleteChecklist: (index: number) => void;
}

export default function SavedChecklists({
  checklists,
  onLoadChecklist,
  onDeleteChecklist,
}: SavedChecklistsProps) {
  return (
    <Card className="bg-card rounded-lg p-6 shadow-lg border border-border mt-8">
      <CardContent className="p-0">
        <h2 className="text-xl font-medium mb-4 text-secondary">Saved Checklists</h2>
        
        <div className="space-y-2">
          {checklists.length === 0 ? (
            <div className="py-3 text-center text-secondary/60 italic">
              No saved checklists. Create and save your first checklist above.
            </div>
          ) : (
            checklists.map((checklist, index) => {
              const totalItems = checklist.items.length;
              const completedItems = checklist.items.filter(item => item.completed).length;
              
              return (
                <div
                  key={checklist.id}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-background/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-secondary">{checklist.title}</h3>
                    <p className="text-sm text-secondary/70">
                      {totalItems} items ({completedItems} completed) • {formatDate(checklist.lastModified)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="text-accent hover:text-accent/80 transition-colors"
                      onClick={() => onLoadChecklist(index)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-destructive hover:text-destructive/80 transition-colors"
                      onClick={() => onDeleteChecklist(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
