import { useState } from "react";

import { Button } from "@ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/dialog";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { useCreateFolder } from "@pages/content/queries/folders.queries";

interface AddFolderDialogProps {
    trigger?: React.ReactNode;
    open?: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddFolderDialog({
    trigger,
    open,
    onOpenChange,
}: AddFolderDialogProps) {
    const [folderName, setFolderName] = useState("");
    const [validationError, setValidationError] = useState<string | null>(null);

    const createFolder = useCreateFolder();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!folderName.trim()) {
            setValidationError("Folder name is required");
            return;
        }

        setValidationError(null);

        const createFolderDto: ICreateFolderDto = {
            name: folderName.trim(),
        };

        createFolder.mutate(createFolderDto, {
            onSuccess: () => {
                // Reset form and close dialog
                setFolderName("");
                setValidationError(null);
                onOpenChange(false);
            },
            onError: (error) => {
                // Handle error - mutation error will be available in createFolder.error
                console.error("Failed to create folder:", error);
            }
        });
    };

    const handleCancel = () => {
        setFolderName("");
        setValidationError(null);
        createFolder.reset(); // Clear any previous errors
        onOpenChange(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            handleCancel();
        } else {
            onOpenChange(newOpen);
        }
    };

    // Get error from either validation or mutation
    const error = validationError || createFolder.error?.message;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Folder</DialogTitle>
                    <DialogDescription>
                        Create a new folder to organize your conversations and prompts.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={folderName}
                                onChange={(e) => setFolderName(e.target.value)}
                                className="col-span-3"
                                placeholder="Enter folder name"
                                disabled={createFolder.isPending}
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-500 text-center">{error}</div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={createFolder.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createFolder.isPending || !folderName.trim()}
                        >
                            {createFolder.isPending ? "Creating..." : "Create Folder"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}