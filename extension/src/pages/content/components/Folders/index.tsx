import React, { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";

import { useGetFolders } from "@pages/content/queries/folders.queries";

import FolderCommand from "./FolderCommand";
import AddFolderDialog from "./AddFolderDialog";
import Folder from "./Folder";
interface FoldersProps {
    folders: IFolder[];
}

const Folders: React.FC<FoldersProps> = ({ }) => {
    const { data, isLoading, error } = useGetFolders();
    const [isAddingFolder, setIsAddingFolder] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);

    const onAddFolder = () => {
        setIsAddingFolder(true);
    };

    const filteredFolders = useMemo(() => {
        if (!search) return data?.folders ?? [];

        return data?.folders?.filter((folder: IFolder) =>
            folder.name.toLowerCase().includes(search.toLowerCase()),
        ) ?? []
    }, [data, search]);

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 p-4 max-w-md space-y-4">
                {/* Search Box */}
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Header with Folders title and + button */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Folders</h2>
                    <button
                        onClick={onAddFolder}
                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                        aria-label="Add folder"
                    >
                        <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="text-xs text-gray-500 ml-2">Always visible</span>
                </div>

                {isLoading && <p>Is Loading Folders...</p>}
                {error && <p>Failed to load folders: {error.message}</p>}

                {/* Folders List */}
                <div className="space-y-2">
                    {filteredFolders.map((folder) => (
                        <Folder
                            key={folder._id}
                            folder={folder}
                            onFolderClick={setSelectedFolder}
                        />
                    ))}
                </div>
            </div>

            {selectedFolder && <FolderCommand folder={selectedFolder} />}
            <AddFolderDialog
                onOpenChange={setIsAddingFolder}
                open={isAddingFolder}
            />
        </>
    );
};

export default Folders;