import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/select";
import { Textarea } from "@ui/textarea";

import {
    useCreateConversation,
    useUpdateConversation,
} from "@pages/content/queries/conversations.queries";
import { useGetFolders } from "@pages/content/queries/folders.queries";

type ConversationFormData = {
    folderId: string | null;
    note?: string;
    title: string;
};

const conversationSchema = yup.object().shape({
    folderId: yup.string().nullable().optional(),
    note: yup.string().optional(),
    title: yup.string().required("Title is required"),
}) as yup.ObjectSchema<ConversationFormData>;
interface ConversationFormProps {
    conversation: IConversation | ICreateConversationDto;
    onSubmited: CallableFunction;
}

export function ConversationForm({
    conversation,
    onSubmited,
}: ConversationFormProps) {
    const { data: folders = [] } = useGetFolders();

    const form = useForm<ConversationFormData>({
        resolver: yupResolver(conversationSchema),
        defaultValues: {
            title: conversation.title,
            note: conversation.note || "",
            folderId: conversation.folderId || null,
        },
    });

    const isExisiting = '_id' in conversation;

    const createMutation = useCreateConversation();
    const updateMutation = useUpdateConversation();

    const onSubmit = (data: ConversationFormData) => {
        try {
            if (isExisiting) {
                updateMutation.mutateAsync({
                    conversationId: conversation.conversationId!,
                    update: data,
                });
            } else {
                createMutation.mutateAsync({
                    ...data,
                    ...(data.folderId === "nil"
                        ? { folderId: null }
                        : { folderId: data.folderId! }),
                    conversationId: conversation.conversationId!,
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            onSubmited();
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Note (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Add a note about this conversation..."
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
                                    {folders.map((folder) => (
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
                <div className="flex justify-end space-x-2">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." :  isExisiting? "Update" : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
