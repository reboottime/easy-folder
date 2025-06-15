import React, { useCallback, useState } from "react";
import { Search, Plus, MessageSquarePlus } from "lucide-react";

import { useGetFolders } from "@content/queries/folders.queries";
import { Button } from "@ui/button";
import { cn } from "@utils/cn";

import AddFolderDialog from "./AddFolderDialog";
import BookmarkConversation from "./BookmarkButton";
import ConversationsCommand from "./ConversationsCommand";
import EditConversation from "./EditConversationDialog";
import FolderCommand from "./FolderCommand";
import Folders from "./Folders";
import UnBookmarkButton from "./UnBookmarkButton";
import useGetConversation from "./hooks/useGetConversation";

const Conversations: React.FC = () => {
  const { data: folders, isLoading, error } = useGetFolders();
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

  const navigateToNewChat = useCallback(() => {
    window.location.href = "https://chat.deepseek.com/";
  }, []);

  const { data: conversation } = useGetConversation();

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md space-y-4">
        {/* Header with Folders title and + button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
          <div className="flex gap-1">
            {conversation && !("_id" in conversation) && <BookmarkConversation conversation={conversation as ICreateConversationDto} />}
            {conversation && '_id' in conversation && (
              <>
                <UnBookmarkButton
                  conversationId={conversation.conversationId}
                />
                <EditConversation conversation={conversation as IConversation} />
              </>
            )}
            <Button
              onClick={navigateToNewChat}
              variant={"secondary"}
              size="icon"
              aria-label="Save Conversation"
            >
              <MessageSquarePlus size={24} className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Search Box */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && search) {
                setIsSearching(true);
              }
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>

        {isLoading && <p>Is Loading Folders...</p>}
        {error && <p>Failed to load folders: {error.message}</p>}

        {/* Folders List */}
        <div
          className={cn({
            "space-y-1": folders?.length,
          })}
        >
          {!!folders?.length && <Folders folders={folders} setSelectedFolder={setSelectedFolder} />}
          <Button
            className="cursor-pointer w-full"
            onClick={setIsAddingFolder.bind(null, true)}
          >
            <Plus /> Add Folder
          </Button>
        </div>
      </div>
      <AddFolderDialog open={isAddingFolder} onOpenChange={setIsAddingFolder} />
      <FolderCommand
        folder={selectedFolder ?? undefined}
        onClose={setSelectedFolder.bind(null, null)}
      />
      <ConversationsCommand
        open={isSearching}
        onOpenChange={setIsSearching}
        search={search}
      />
    </>
  );
};

export default Conversations;
