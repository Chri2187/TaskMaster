import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Download, Save, Upload, Trash2, X } from "lucide-react";
import { Checklist, ChecklistItem } from "@/types/checklist";
import { useToast } from "@/hooks/use-toast";

interface ChecklistContainerProps {
  checklist: Checklist;
  onChecklistChange: (checklist: Checklist) => void;
  onSaveChecklist: () => void;
}

export default function ChecklistContainer({
  checklist,
  onChecklistChange,
  onSaveChecklist,
}: ChecklistContainerProps) {
  const [newItem, setNewItem] = useState("");
  const { toast } = useToast();

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.trim()) {
      return;
    }
    
    const newItems = [
      ...checklist.items,
      { text: newItem.trim(), completed: false },
    ];
    
    onChecklistChange({
      ...checklist,
      items: newItems,
    });
    
    setNewItem("");
    
    toast({
      title: "Success",
      description: "Item added",
    });
  };

  const toggleItem = (index: number) => {
    const newItems = [...checklist.items];
    newItems[index].completed = !newItems[index].completed;
    
    onChecklistChange({
      ...checklist,
      items: newItems,
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...checklist.items];
    newItems.splice(index, 1);
    
    onChecklistChange({
      ...checklist,
      items: newItems,
    });
    
    toast({
      title: "Info",
      description: "Item removed",
    });
  };

  const clearChecklist = () => {
    if (window.confirm("Are you sure you want to clear all items from this checklist?")) {
      onChecklistChange({
        ...checklist,
        items: [],
      });
      
      toast({
        title: "Info",
        description: "Checklist cleared",
      });
    }
  };

  const exportChecklist = () => {
    const checklistJson = JSON.stringify(checklist, null, 2);
    const blob = new Blob([checklistJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${checklist.title.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    toast({
      title: "Success",
      description: "Checklist exported",
    });
  };

  const loadChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    
    reader.onload = function (event) {
      try {
        const loadedChecklist = JSON.parse(event.target?.result as string);
        
        if (!loadedChecklist.title || !Array.isArray(loadedChecklist.items)) {
          throw new Error("Invalid checklist format");
        }
        
        onChecklistChange(loadedChecklist);
        
        toast({
          title: "Success",
          description: "Checklist loaded",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Invalid checklist file",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
    
    // Reset the input
    e.target.value = "";
  };

  // Calculate progress
  const totalItems = checklist.items.length;
  const completedItems = checklist.items.filter(item => item.completed).length;
  const progressPercentage = totalItems === 0 ? 0 : (completedItems / totalItems) * 100;

  return (
    <Card className="bg-dark-secondary rounded-lg p-6 shadow-lg mb-6 border border-dark-border">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">
            {checklist.title}
          </h2>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm flex items-center gap-1 transition-colors"
              onClick={onSaveChecklist}
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm flex items-center gap-1 transition-colors"
              onClick={exportChecklist}
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            
            <label
              htmlFor="load-checklist"
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span>Load</span>
              <input
                type="file"
                id="load-checklist"
                accept=".json"
                className="hidden"
                onChange={loadChecklist}
              />
            </label>
            
            <Button
              variant="destructive"
              size="sm"
              className="px-3 py-1.5 bg-red-700 hover:bg-red-600 rounded-md text-white text-sm flex items-center gap-1 transition-colors"
              onClick={clearChecklist}
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear</span>
            </Button>
          </div>
        </div>
        
        <form onSubmit={addItem} className="flex gap-2 mb-6">
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </Button>
        </form>
        
        <div className="space-y-2">
          {checklist.items.length === 0 ? (
            <div className="py-3 text-center text-gray-500 italic">
              No items in this checklist. Add your first item above.
            </div>
          ) : (
            checklist.items.map((item, index) => (
              <div
                key={index}
                className={`flex items-center p-3 rounded-md hover:bg-gray-800 transition-colors ${
                  item.completed ? "checklist-item completed" : "checklist-item"
                }`}
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(index)}
                  className="w-5 h-5 rounded-md border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <span className="item-text ml-3 text-gray-200">{item.text}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => removeItem(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Items: <span>{totalItems}</span></span>
            <span>Completed: <span>{completedItems}</span></span>
          </div>
          <Progress
            value={progressPercentage}
            className="mt-2 bg-gray-800 rounded-full h-2.5 overflow-hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
}
