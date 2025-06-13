// In your parent component
import { useCallback, useEffect, useState } from "react";
import { MessageSquarePlus } from "lucide-react";

import BookmarksCommand from "./components/BookmarksCommand";
import BookmarkButton from "./components/BookmarkButton";

import { useGetConversations } from "@pages/content/queries/conversations.queries";
import { Button } from "@ui/button";

export default function Bookmarks() {
    const [conversationId, setConversationId] = useState("");

    const [bookmarksOpen, setBookmarksOpen] = useState(false);
    const { data } = useGetConversations({
        bookmarked: true,
    });

    const navigateToNewChat = useCallback(() => {
        window.location.href = "https://chat.deepseek.com/";
    }, []);

    useEffect(() => {
        const url = window.location.href;
        const match = url.match(/\/s\/([a-f0-9\-]{36})/i);
        setConversationId(match ? match[1] : "");
    }, [window.location]);

    return (
        <>
            <div className="flex justify-between p-1 bg-white">
                <Button
                    onClick={() => setBookmarksOpen(true)}
                    className="flex items-center gap-2"
                >
                    <span>⭐</span>
                    View All Bookmarks
                    {data?.conversations?.length && (
                        <span className="bg-gray-200 px-2 py-1 rounded text-sm">12</span>
                    )}
                </Button>

                {conversationId && <>
                    <BookmarkButton conversationId={conversationId} /><Button onClick={navigateToNewChat}>
                        <MessageSquarePlus /> New
                    </Button></>}
            </div>

            <BookmarksCommand open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
        </>
    );
}
