import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { ScrollArea } from "@ui/scrollarea";
import { Textarea } from "@ui/textarea";

import {
  useCreatePrompt,
  useDeletePrompt,
  useUpdatePrompt,
} from "@pages/content/queries/prompts.queries";
import { useGetFolders } from "@src/pages/content/queries/folders.queries";

interface PromptFormData {
  content: string;
  folderId: null | string;
  name: string;
}

const promptSchema = yup.object().shape({
  content: yup
    .string()
    .required("Content is required")
    .trim()
    .min(1, "Content cannot be empty")
    .max(5000, "Content must be less than 5000 characters"),
  folderId: yup.string().nullable().optional(),
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(1, "Name cannot be empty")
    .max(100, "Name must be less than 100 characters"),
}) as yup.ObjectSchema<PromptFormData>;

interface PromptDialogProps {
  onOpenChange: (newState: boolean) => void;
  open: boolean;
  prompt?: IPrompt | null; // If provided = edit mode, if not = create mode
}

const PromptDialog: React.FC<PromptDialogProps> = ({
  open,
  onOpenChange,
  prompt,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { data: folders } = useGetFolders();

  const createPrompt = useCreatePrompt();
  const updatePrompt = useUpdatePrompt();
  const deletePrompt = useDeletePrompt();

  const isLoading =
    createPrompt.isPending || updatePrompt.isPending || deletePrompt.isPending;

  const isEditMode = !!prompt;

  const form = useForm<PromptFormData>({
    resolver: yupResolver(promptSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      content: "",
      folderId: null,
    },
  });

  // Reset form when dialog opens/closes or prompt changes
  useEffect(() => {
    if (open) {
      if (isEditMode && prompt) {
        form.reset({
          name: prompt.name,
          content: prompt.content,
          folderId: prompt.folderId || null,
        });
      } else {
        form.reset({
          name: "",
          content: "",
          folderId: null,
        });
      }
    }
    setShowDeleteConfirm(false);
  }, [open, isEditMode, prompt, form]);

  const onSubmit = async (data: PromptFormData) => {
    try {
      const folderId =  data.folderId === "nil" ? null : (data.folderId ?? null);

      if (isEditMode && prompt) {
        const updateData: IUpdatePromptDto = {
          name: data.name.trim(),
          content: data.content.trim(),
          folderId,
        };
        await updatePrompt.mutateAsync({
          id: prompt._id!,
          update: updateData,
        });
      } else {
        const createData: ICreatePromptDto = {
          name: data.name.trim(),
          content: data.content.trim(),
          folderId,
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter prompt name..."
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your prompt content..."
                            disabled={isLoading}
                            className="resize-none min-h-[120px] max-h-[300px] overflow-y-auto"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              <FormField
                control={form.control}
                name="folderId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "nil"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a folder" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="nil">No folder</SelectItem>
                        {folders?.map((folder) => (
                          <SelectItem key={folder._id} value={folder._id}>
                            {folder.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <p className="flex justify-between w-full">
                  {isEditMode && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  )}
                  <div className="flex flex-1 justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isLoading}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={!form.formState.isValid || isLoading}
                    >
                      {isLoading
                        ? isEditMode
                          ? "Saving..."
                          : "Adding..."
                        : isEditMode
                          ? "Save Changes"
                          : "Add Prompt"}
                    </Button>
                  </div>
                </p>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PromptDialog;
