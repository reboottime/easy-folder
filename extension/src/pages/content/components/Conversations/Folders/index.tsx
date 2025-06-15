import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@ui/context-menu';

import EditFolderDialog from './EditFolderDialog';
import DeleteConfirmation from './DeleteConfirmation';

interface FolderListProps {
  folders: IFolder[];
  setSelectedFolder: (folder: IFolder) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, setSelectedFolder }) => {
  const [editingFolder, setEditingFolder] = useState<IFolder | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<IFolder | null>(null);

  return (
    <>
      {folders
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((folder) => (
          <ContextMenu key={folder._id}>
            <ContextMenuTrigger asChild>
              <button
                onClick={() => setSelectedFolder(folder)}
                className="flex items-center justify-between py-1 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center text-white font-medium"
                    style={{ backgroundColor: folder.color || "#DBEAFE" }}
                  >
                    {folder.icon || "📁"}
                  </div>
                  <span className="text-gray-900 font-medium">
                    {folder.name}
                  </span>
                </div>
              </button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => setEditingFolder(folder)}>
                Edit
              </ContextMenuItem>
              <ContextMenuItem onClick={() => setDeletingFolder(folder)}>
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}

      <EditFolderDialog
        folder={editingFolder}
        open={!!editingFolder}
        onOpenChange={(open) => !open && setEditingFolder(null)}
      />

      <DeleteConfirmation
        folder={deletingFolder}
        open={!!deletingFolder}
        onOpenChange={(open) => !open && setDeletingFolder(null)}
      />
    </>
  );
};

export default FolderList;
