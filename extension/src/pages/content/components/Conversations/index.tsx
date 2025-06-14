import React, { useCallback, useEffect, useState } from "react";
import { Search, Plus, MessageSquarePlus } from "lucide-react";

import { cn } from "@utils/cn";
import { Button } from "@ui/button";
import { useGetFolders } from "@pages/content/queries/folders.queries";

import FolderCommand from "./FolderCommand";
import AddFolderDialog from "./AddFolderDialog";
import ConversationsCommand from "./ConversationsCommand";
import BookmarkConversation from "./BookmarkButton";
import useGetConversationRawData from "./hooks/useGetConversationRawData";
import EditConversation from "./EditConversationDialog";

const Conversations: React.FC = () => {
    const { data: folders, isLoading, error } = useGetFolders();
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [search, setSearch] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

    const navigateToNewChat = useCallback(() => {
        window.location.href = "https://chat.deepseek.com/";
    }, []);

    const metadata = useGetConversationRawData();

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md space-y-4">
                {/* Header with Folders title and + button */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
                    <div className="flex gap-4">
                        {metadata.conversationId && <><BookmarkConversation {...metadata} /> <EditConversation {...metadata} /></>}
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
                    {folders?.map((folder) => (
                        <button
                            onClick={setSelectedFolder.bind(null, folder)}
                            className="flex items-center justify-between py-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full"
                        >
                            <div className="flex items-center space-x-3">
                                <div
                                    className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium"
                                    style={{ backgroundColor: folder.color || "#6B7280" }}
                                >
                                    {folder.icon || "📁"}
                                </div>
                                <span className="text-gray-900 font-medium">{folder.name}</span>
                            </div>
                        </button>
                    ))}
                    {folders && folders.length === 0 && (
                        <Button
                            className="cursor-pointer w-full"
                            onClick={setIsAddingFolder.bind(null, true)}
                        >
                            <Plus /> Add Folder
                        </Button>
                    )}
                    <Button
                        className="cursor-pointer w-full"
                        onClick={setIsAddingFolder.bind(null, true)}
                    >
                        <Plus /> Add Folder
                    </Button>
                </div>
            </div>
            <AddFolderDialog open={isAddingFolder} onOpenChange={setIsAddingFolder} />
            {
                <FolderCommand
                    folder={selectedFolder ?? undefined}
                    onClose={setSelectedFolder.bind(null, null)}
                />
            }
            <ConversationsCommand
                open={isSearching}
                onOpenChange={setIsSearching}
                search={search}
            />
        </>
    );
};

export default Conversations;
