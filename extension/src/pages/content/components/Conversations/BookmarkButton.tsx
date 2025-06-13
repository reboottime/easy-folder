import { useMemo, useState } from "react";
import { Bookmark } from "lucide-react";

import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@ui/dialog";
import { cn } from "@utils/cn";
import {
  useDeleteConversation,
  useGetConversations,
} from "@pages/content/queries/conversations.queries";
import { ConversationForm } from "./ConversationForm";

interface BookmarkConversationProps {
  conversationId: string;
  title: string;
}

export default function BookmarkConversation({
  conversationId,
  title,
}: BookmarkConversationProps) {
  const [open, setOpen] = useState(false);
  const { data: conversations, isFetched } = useGetConversations();
  const removeMutation = useDeleteConversation();

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

  if (!conversationId || !isFetched) return null;

  if (conversation._id) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          removeMutation.mutateAsync(conversation.conversationId!);
        }}
      >
        <Bookmark
          className={cn("h-4 w-4", "fill-yellow-600 stroke-yellow-600")}
        />
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Bookmark className={cn("h-4 w-4")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bookmark Conversation</DialogTitle>
          <DialogDescription>{conversation.title}</DialogDescription>
        </DialogHeader>
        {isFetched && (
          <ConversationForm
            conversation={conversation}
            onUpdated={setOpen.bind(null, false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
