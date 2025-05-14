import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import ChecklistForm from "@/components/ChecklistForm";
import ChecklistContainer from "@/components/ChecklistContainer";
import SavedChecklists from "@/components/SavedChecklists";
import { Checklist } from "@/types/checklist";
import { CheckSquare } from "lucide-react";

export default function Home() {
  const [currentChecklist, setCurrentChecklist] = useState<Checklist | null>(null);
  const [savedChecklists, setSavedChecklists] = useState<Checklist[]>([]);
  const { toast } = useToast();

  // Load saved checklists from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("savedChecklists");
    if (saved) {
      try {
        // Parse saved checklists
        const parsedChecklists = JSON.parse(saved);
        
        // Migrate any numeric lastModified values to ISO string format
        const migratedChecklists = parsedChecklists.map((checklist: any) => {
          if (typeof checklist.lastModified === 'number') {
            return {
              ...checklist,
              lastModified: new Date(checklist.lastModified).toISOString()
            };
          }
          return checklist;
        });
        
        setSavedChecklists(migratedChecklists);
      } catch (error) {
        console.error("Error loading saved checklists:", error);
        localStorage.removeItem("savedChecklists");
      }
    }
  }, []);

  // Save checklists to localStorage whenever the savedChecklists state changes
  useEffect(() => {
    localStorage.setItem("savedChecklists", JSON.stringify(savedChecklists));
  }, [savedChecklists]);

  const createChecklist = (title: string) => {
    const newChecklist: Checklist = {
      id: Date.now(),
      title,
      items: [],
      lastModified: new Date().toISOString(),
    };
    setCurrentChecklist(newChecklist);
    toast({
      title: "Success",
      description: "New checklist created",
    });
  };

  const saveChecklist = () => {
    if (!currentChecklist) return;

    const checklistToSave = {
      ...currentChecklist,
      lastModified: new Date().toISOString(),
    };

    const existingIndex = savedChecklists.findIndex(
      (cl) => cl.id === checklistToSave.id
    );

    if (existingIndex >= 0) {
      // Update existing checklist
      const newSavedChecklists = [...savedChecklists];
      newSavedChecklists[existingIndex] = checklistToSave;
      setSavedChecklists(newSavedChecklists);
    } else {
      // Add new checklist
      setSavedChecklists([...savedChecklists, checklistToSave]);
    }

    // Update current checklist with updated lastModified
    setCurrentChecklist(checklistToSave);

    toast({
      title: "Success",
      description: "Checklist saved",
    });
  };

  const loadSavedChecklist = (index: number) => {
    const checklist = savedChecklists[index];
    setCurrentChecklist({ ...checklist });
    toast({
      title: "Success",
      description: "Checklist loaded",
    });
  };

  const deleteSavedChecklist = (index: number) => {
    if (
      window.confirm("Are you sure you want to delete this saved checklist?")
    ) {
      const newSavedChecklists = [...savedChecklists];
      newSavedChecklists.splice(index, 1);
      setSavedChecklists(newSavedChecklists);
      toast({
        title: "Success",
        description: "Checklist deleted",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-secondary flex items-center justify-center gap-2">
            <CheckSquare className="text-accent" />
            <span>Checklist App</span>
          </h1>
          {/* <p className="text-secondary/80 mt-2">
            Create, manage, and export your checklists
          </p> */}
        </header>

        {/* Main Content */}
        <div className="mb-8">
          <ChecklistForm onCreateChecklist={createChecklist} />

          {currentChecklist && (
            <ChecklistContainer
              checklist={currentChecklist}
              onChecklistChange={setCurrentChecklist}
              onSaveChecklist={saveChecklist}
            />
          )}

          <SavedChecklists
            checklists={savedChecklists}
            onLoadChecklist={loadSavedChecklist}
            onDeleteChecklist={deleteSavedChecklist}
          />
        </div>

        {/* Footer */}
        <footer className="text-center text-secondary/70 text-sm mt-8 pt-4 border-t border-primary-foreground/20">
          <p>Checklist App - Dark Mode | {new Date().getFullYear()}</p>
        </footer>
      </div>
      <Toaster />
    </div>
  );
}
