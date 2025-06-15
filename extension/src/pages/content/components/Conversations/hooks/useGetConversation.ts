import { useMemo } from "react";
import { useGetConversations } from "@src/pages/content/queries/conversations.queries";
import useGetConversationRawData from "./useGetConversationRawData";

export default function useGetConversation() {
    const { conversationId, title } = useGetConversationRawData();
    const { data: conversations, ...rest } = useGetConversations();

    const conversation = useMemo(() => {
        if (!conversationId) return null;

        return (
            conversations?.find((item) => item.conversationId === conversationId) ?? {
                conversationId,
                note: "",
                title,
                folderId: null,
            }
        );
    }, [conversationId, title, conversations]);


    return { ...rest, data: conversation };
}