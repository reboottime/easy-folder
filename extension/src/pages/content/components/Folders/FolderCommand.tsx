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
    folder: IFolder;
}

export default function FolderCommand({ folder }: FolderCommandProps) {
    const {
        data,
        isLoading,
        error
    } = useGetConversations({
        folderId: folder._id
    });

    const onConversationSelect = (conversation: IConversation) => {
        window.history.pushState({}, '', `/chat/a/${conversation.conversationId}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <CommandDialog open={!!folder}>
            <CommandInput placeholder="Search conversations..." />
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

                {!isLoading && !error && data?.conversations.length === 0 && (
                    <CommandEmpty>No conversations found in this folder.</CommandEmpty>
                )}

                {(data?.conversations?.length ?? 0) > 0 && (
                    <CommandGroup heading="Conversations">
                        {data?.conversations.map((conversation) => (
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