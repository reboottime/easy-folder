import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@ui/command";
import { useGetConversations } from "@pages/content/queries/conversations.queries";

interface BookmarksCommandProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function BookmarksCommand({ open, onOpenChange }: BookmarksCommandProps) {
    const {
        data,
        isLoading,
        error
    } = useGetConversations({
        bookmarked: true
    });

    const onConversationSelect = (conversation: IConversation) => {
        onOpenChange(false); // Close the dialog after selection
        window.history.pushState({}, '', `/chat/a/${conversation.conversationId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search bookmarked conversations..." />
            <CommandList>
                {isLoading && (
                    <CommandGroup>
                        <CommandItem disabled>Loading bookmarked conversations...</CommandItem>
                    </CommandGroup>
                )}
                {error && (
                    <CommandGroup>
                        <CommandItem disabled className="text-red-500">
                            Error: {error.message}
                        </CommandItem>
                    </CommandGroup>
                )}
                {!isLoading && !error && data?.conversations.length === 0 && (
                    <CommandEmpty>No bookmarked conversations found.</CommandEmpty>
                )}
                {(data?.conversations?.length ?? 0) > 0 && (
                    <CommandGroup heading="Bookmarked Conversations">
                        {data?.conversations.map((conversation) => (
                            <CommandItem
                                key={conversation._id}
                                onSelect={() => onConversationSelect(conversation)}
                                className="flex items-center gap-2"
                            >
                                <span className="text-yellow-500">⭐</span>
                                {conversation.title}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                )}
            </CommandList>
        </CommandDialog>
    );
}