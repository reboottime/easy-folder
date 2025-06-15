import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@ui/dialog';
import { FolderForm } from './FolderForm';

interface EditFolderDialogProps {
    folder: IFolder | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit?: (data: any) => void;
    isLoading?: boolean;
}

 const EditFolderDialog: React.FC<EditFolderDialogProps> = ({
    folder,
    open,
    onOpenChange,
    onSubmit,
    isLoading,
}) => {
    const isEditing = !!folder?._id;

    const handleSubmit = (data: any) => {
        onSubmit?.(data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Edit Folder' : 'Create Folder'}
                    </DialogTitle>
                </DialogHeader>
                {folder && <FolderForm
                    folder={folder}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                />}
            </DialogContent>
        </Dialog>
    );
};

export default EditFolderDialog;