import { useCallback, useState, useEffect } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@ui/command";
import { useGetConversations } from "@pages/content/queries/conversations.queries";

interface FolderCommandProps {
    folder?: IFolder;
    onClose: CallableFunction;
}

export default function FolderCommand({ folder, onClose }: FolderCommandProps) {
    const [isOpen, setIsOpen] = useState(false);
    const {
        data: conversations,
        isLoading,
        isFetched,
        error,
    } = useGetConversations({
        folderId: folder?._id,
    });

    const onConversationSelect = useCallback((conversation: IConversation) => {
        window.history.pushState({}, "", `/chat/a/${conversation.conversationId}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
    }, []);

    useEffect(() => {
        setIsOpen(!!folder);
        return () => {
            setIsOpen(false);
        };
    }, [folder]);

    if (!folder) return null;

    return (
        <CommandDialog
            open={isOpen}
            onOpenChange={(val) => {
                setIsOpen(val);
                onClose();
            }}
        >
            <CommandInput placeholder={`Search conversations in ${folder.name}...`} />
            <CommandList>
                {isLoading && (
                    <CommandGroup>
                        <CommandItem disabled>Loading conversations...</CommandItem>
                    </CommandGroup>
                )}

                {error && (
                    <CommandGroup>
                        <CommandItem disabled className="text-red-500">
                            Error: {error.message}
                        </CommandItem>
                    </CommandGroup>
                )}

                {isFetched && !error && conversations?.length === 0 && (
                    <CommandEmpty>No conversations found in this folder.</CommandEmpty>
                )}

                {(conversations?.length ?? 0) > 0 && (
                    <CommandGroup heading="Conversations">
                        {conversations?.map((conversation) => (
                            <CommandItem
                                key={conversation._id}
                                onSelect={() => onConversationSelect(conversation)}
                            >
                                {conversation.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    );
}
