import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/dialog";
import { FolderForm } from "./FolderForm";
import { useUpdateFolder } from "@src/pages/content/queries/folders.queries";

interface EditFolderDialogProps {
  folder: IFolder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditFolderDialog: React.FC<EditFolderDialogProps> = ({
  folder,
  open,
  onOpenChange,
}) => {
  const isEditing = !!folder?._id;
  const editMutation = useUpdateFolder();

  const handleSubmit = (data: IUpdateFolderDto) => {
    if (!folder?._id) return;

    editMutation.mutateAsync?.({id: folder?._id, update: data});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Folder" : "Create Folder"}
          </DialogTitle>
        </DialogHeader>
        {folder && (
          <FolderForm
            folder={folder}
            onSubmit={handleSubmit}
            isLoading={editMutation.isPending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditFolderDialog;
