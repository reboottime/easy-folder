// In your parent component
import { useState } from "react";
import BookmarksCommand from "./components/BookmarksCommand";

import { useGetConversations } from "@pages/content/queries/conversations.queries";

export default function Bookmarks() {
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const { data } = useGetConversations({
    bookmarked: true,
  });

  return (
    <div>
      <button
        onClick={() => setBookmarksOpen(true)}
        className="flex items-center gap-2"
      >
        <span>⭐</span>
        Bookmarks
        {data?.conversations?.length && (
          <span className="bg-gray-200 px-2 py-1 rounded text-sm">12</span>
        )}
      </button>

      <BookmarksCommand open={bookmarksOpen} onOpenChange={setBookmarksOpen} />
    </div>
  );
}
