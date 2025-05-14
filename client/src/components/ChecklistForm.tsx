import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface ChecklistFormProps {
  onCreateChecklist: (title: string) => void;
}

export default function ChecklistForm({ onCreateChecklist }: ChecklistFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    onCreateChecklist(title.trim());
    setTitle("");
  };

  return (
    <Card className="bg-dark-secondary rounded-lg p-6 shadow-lg mb-6 border border-dark-border">
      <CardContent className="p-0">
        <h2 className="text-xl font-medium mb-4 text-white">Create New Checklist</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="checklist-title" className="block text-sm font-medium text-gray-300 mb-1">
              Checklist Title
            </Label>
            <Input
              id="checklist-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter checklist title"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Create Checklist
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
