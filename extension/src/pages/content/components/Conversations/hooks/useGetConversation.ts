import { useGetConversations } from "@src/pages/content/queries/conversations.queries";
import {  useMemo } from "react";

export default function useGetConversation(conversationId: string, title: string) {
    const { data: conversations, ...rest } = useGetConversations();

    const conversation = useMemo(() => {
        return (
            conversations?.find((item) => item.conversationId === conversationId) ?? {
                conversationId,
                note: "",
                title,
                folderId: null,
            }
        );
    }, [conversationId, title]);


    return { ...rest, data: conversation };
}