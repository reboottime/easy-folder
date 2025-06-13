import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@ui/button';
import { useGetPrompts } from '@pages/content/queries/prompts.queries';

import { PromptDialog } from './components/PromptDialog';

interface SavedPromptsProps {
  className?: string;
}

const SavedPrompts: React.FC<SavedPromptsProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<IPrompt | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Assuming you have a hook to fetch prompts
  const { data: prompts = [], isLoading } = useGetPrompts();

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePromptClick = (prompt: IPrompt) => {
    setSelectedPrompt(prompt);
    setShowEditDialog(true);
  };

  const promptCount = prompts?.length ?? 0;

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer group">
        <div className="flex items-center gap-2 flex-1" onClick={handleToggleExpanded}>
          <div className="flex items-center gap-1">
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <div className="w-5 h-5 bg-purple-500 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <span className="text-sm font-medium text-gray-700">Saved Prompts</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
            {promptCount}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            setShowAddDialog(true);
          }}
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="pl-6 space-y-1">
          {isLoading ? (
            <div className="text-xs text-gray-500 py-2">Loading prompts...</div>
          ) : promptCount === 0 ? (
            <div className="text-xs text-gray-500 py-2">No saved prompts</div>
          ) : (
            prompts.map((prompt) => (
              <div
                key={prompt._id}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md cursor-pointer group"
                onClick={() => handlePromptClick(prompt)}
              >
                <div className="w-4 h-4 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 truncate flex-1">
                  {prompt.name}
                </span>
              </div>
            ))
          )}
        </div>
      )}

      <PromptDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <PromptDialog
        open={showEditDialog}
        onOpenChange={(val:boolean) => {
            setShowEditDialog(val);
            setSelectedPrompt(null);
        }}
        prompt={selectedPrompt}
      />
    </div>
  );
};

export default SavedPrompts;