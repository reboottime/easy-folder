import { useCallback, } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@ui/command";
import { useGetConversations } from "@pages/content/queries/conversations.queries";


interface ConversationsCommandProps {
    open: boolean, onOpenChange: (val: boolean) => void;
    search: string;
}

export default function ConversationsCommand({ open, onOpenChange }: ConversationsCommandProps) {
    const {
        data: conversations,
        isLoading,
        error,
    } = useGetConversations();

    const onConversationSelect = useCallback((conversation: IConversation) => {
        window.history.pushState({}, "", `/chat/a/${conversation.conversationId}`);
        window.dispatchEvent(new PopStateEvent("popstate"));
    }, []);


    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder={`Search conversations ...`} />
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

                {!isLoading && !error && conversations?.length === 0 && (
                    <CommandEmpty>No conversations found.</CommandEmpty>
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
