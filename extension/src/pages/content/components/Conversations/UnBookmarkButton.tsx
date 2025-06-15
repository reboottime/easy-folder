import { Bookmark } from "lucide-react";

import { Button } from "@ui/button";
import { cn } from "@utils/cn";
import { useDeleteConversation } from "@content/queries/conversations.queries";

interface BookmarkConversationProps {
  conversationId: IConversation["conversationId"];
}

export default function UnBookmarkButton({
  conversationId,
}: BookmarkConversationProps) {
  const removeMutation = useDeleteConversation();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        removeMutation.mutateAsync(conversationId);
      }}
    >
      <Bookmark
        className={cn("h-4 w-4", "fill-yellow-600 stroke-yellow-600")}
      />
    </Button>
  );
}
