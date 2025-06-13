import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@ui/dialog";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { Label } from "@ui/label";
import {
  useCreatePrompt,
  useDeletePrompt,
  useUpdatePrompt,
} from "@pages/content/queries/prompts.queries";

interface PromptFormData {
  name: string;
  content: string;
}

// Yup validation schema
const promptSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters"),
  content: yup
    .string()
    .required("Content is required")
    .trim()
    .min(1, "Content cannot be empty")
    .max(5000, "Content must be less than 5000 characters"),
});

interface PromptDialogProps {
  open: boolean;
  onOpenChange: (newState: boolean) => void;
  prompt?: IPrompt | null; // If provided = edit mode, if not = create mode
}

export const PromptDialog: React.FC<PromptDialogProps> = ({
  open,
  onOpenChange,
  prompt,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const createPrompt = useCreatePrompt();
  const updatePrompt = useUpdatePrompt();
  const deletePrompt = useDeletePrompt();

  const isLoading =
    createPrompt.isPending || updatePrompt.isPending || deletePrompt.isPending;

  const isEditMode = !!prompt;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    clearErrors,
  } = useForm<PromptFormData>({
    resolver: yupResolver(promptSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      content: "",
    },
  });

  // Reset form when dialog opens/closes or prompt changes
  useEffect(() => {
    if (open) {
      if (isEditMode && prompt) {
        reset({
          name: prompt.name,
          content: prompt.content,
        });
      } else {
        reset({
          name: "",
          content: "",
        });
      }
      // Clear any existing errors when dialog opens
      clearErrors();
    }
    setShowDeleteConfirm(false);
  }, [open, isEditMode, prompt, reset, clearErrors]);

  const onSubmit = async (data: PromptFormData) => {
    try {
      if (isEditMode && prompt) {
        const updateData: IUpdatePromptDto = {
          name: data.name.trim(),
          content: data.content.trim(),
        };
        await updatePrompt.mutateAsync({
          id: prompt._id!,
          updatePromptDto: updateData,
        });
      } else {
        const createData: ICreatePromptDto = {
          name: data.name.trim(),
          content: data.content.trim(),
        };
        await createPrompt.mutateAsync(createData);
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving prompt:", error);
      // Handle error (show toast, etc.)
    }
  };

  const handleDelete = async () => {
    if (!prompt?._id) return;

    try {
      await deletePrompt.mutateAsync(prompt._id);
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Prompt" : "Add New Prompt"}
          </DialogTitle>
        </DialogHeader>

        {showDeleteConfirm ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to delete "{prompt?.name}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt-name">Name</Label>
              <Input
                id="prompt-name"
                {...register("name")}
                placeholder="Enter prompt name..."
                disabled={isLoading}
                className={
                  errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt-content">Content</Label>
              <Textarea
                id="prompt-content"
                {...register("content")}
                placeholder="Enter your prompt content..."
                rows={6}
                disabled={isLoading}
                className={`resize-none ${errors.content ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <div>
                {isEditMode && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={isLoading}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <DialogClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={!isValid || isLoading}>
                  {isLoading
                    ? isEditMode
                      ? "Saving..."
                      : "Adding..."
                    : isEditMode
                      ? "Save Changes"
                      : "Add Prompt"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
