// In your parent component
import { useCallback, useEffect, useState } from "react";
import { MessageSquarePlus } from "lucide-react";

import BookmarksCommand from "./components/BookmarksCommand";
import BookmarkButton from "./components/BookmarkButton";

import { useGetConversations } from "@pages/content/queries/conversations.queries";
import { Button } from "@ui/button";

export default function Bookmarks() {
    const [conversationId, setConversationId] = useState('');

    const [bookmarksOpen, setBookmarksOpen] = useState(false);
    const { data } = useGetConversations({
        bookmarked: true,
    });

    const navigateToNewChat = useCallback(() => {
        window.history.pushState({}, '', '/chat');
        window.dispatchEvent(new PopStateEvent('popstate'));
    }, []);

    useEffect(() => {
        const url = window.location.href;
        const match = url.match(/\/s\/([a-f0-9\-]{36})/i);
        setConversationId(match ? match[1] : '');
    }, [window.location])

    return (
        <div>
            <p className="flex justify-between">
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
                <Button onClick={navigateToNewChat}><MessageSquarePlus /> New Chat</Button>
                {conversationId && <BookmarkButton conversationId={conversationId} />}
            </p>

            <BookmarksCommand open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
        </div>
    );
}
