import React, { useState } from "react";
import { Plus, FileText, Edit3 } from "lucide-react";

import PromptDialog from "./components/PromptDialog";
import applyPrompt from "./utils/applyPrompt";

import { Button } from "@ui/button";
import { cn } from "@utils/cn";
import { ScrollArea } from "@ui/scrollarea";
import { useGetPrompts } from "@pages/content/queries/prompts.queries";
import SearchPrompt from "./components/SearchPrompts";

const SavedPrompts = () => {
  const { data: prompts, isLoading, error } = useGetPrompts();
  const [selectedPrompt, setSelectedPrompt] = useState<IPrompt | null>(null);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  return (
    <div>
      <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md space-y-4">
        {/* Header with Prompts title and + button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Prompts</h2>
          <div className="flex gap-4">
            <Button
              onClick={setShowAddDialog.bind(null, true)}
              aria-label="Add Prompt"
              size="icon"
              variant="outline"
            >
              <Plus className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <SearchPrompt onApplyPrompt={applyPrompt} />

        {isLoading && <p>Loading Prompts...</p>}
        {error && <p>Failed to load prompts: {error.message}</p>}

        {/* Prompts List */}
        <ScrollArea className={cn("max-h-[240px]")}>
          <div
            className={cn({
              "space-y-1": prompts?.length,
            })}
          >
            {prompts?.map((prompt) => (
              <div
                key={prompt._id}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full border border-gray-100"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={applyPrompt.bind(null, prompt)}
                  >
                    <FileText className="h-4 w-4 text-blue-600" />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <span className="text-gray-900 font-medium block truncate">
                      {prompt.name}
                    </span>
                    <span className="text-gray-500 text-sm block truncate">
                      {prompt.content}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    onClick={() => setSelectedPrompt(prompt)}
                    variant="ghost"
                    size="sm"
                    aria-label="Edit Prompt"
                  >
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" aria-label="Use Prompt">
                    Use
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {prompts && prompts.length === 0 && (
          <Button
            className="cursor-pointer w-full"
            onClick={setShowAddDialog.bind(null, true)}
          >
            <Plus /> Add Prompt
          </Button>
        )}
      </div>

      <PromptDialog open={showAddDialog} onOpenChange={setShowAddDialog} />

      <PromptDialog
        open={showEditDialog}
        onOpenChange={(val: boolean) => {
          setShowEditDialog(val);
          setSelectedPrompt(null);
        }}
        prompt={selectedPrompt}
      />
    </div>
  );
};

export default SavedPrompts;
