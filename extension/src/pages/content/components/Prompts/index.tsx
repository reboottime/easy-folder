import { useState } from "react";
import { Plus, FileText } from "lucide-react";

import { Button } from "@ui/button";
import { ScrollArea } from "@ui/scrollarea";
import { cn } from "@utils/cn";

import { useGetPrompts } from "@pages/content/queries/prompts.queries";

import applyPrompt from "./utils/applyPrompt";
import PromptDialog from "./components/PromptDialog";
import SearchPrompt from "./components/SearchPrompts";

export default function Prompts() {
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
            {prompts && [...prompts].sort((a, b) =>
              new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
            ).map((prompt) => (
              <div
                key={prompt._id}
                className="flex items-center justify-between gap-4 px-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full"
              >
                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation()
                    applyPrompt(prompt);
                  }}
                >
                  <FileText className="h-4 w-4 text-blue-600" />
                </Button>
                <button className="flex-1 min-w-0 cursor-pointer outline-0 text-left"
                  onClick={(e) => {
                    setShowEditDialog(true);
                    setSelectedPrompt(prompt);
                  }}
                >
                  <p className="text-gray-600 text-base block truncate">
                    {prompt.name}
                  </p>
                  <p className="text-gray-400 text-sm block truncate">
                    {prompt.content.slice(0, 30)}...
                  </p>
                </button>
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
