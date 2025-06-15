import { useState } from "react";
import { Pencil } from "lucide-react";

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

import { ConversationForm } from "./ConversationForm";

interface BookmarkConversationProps {
 conversation: IConversation
}

export default function EditConversation({
    conversation
}: BookmarkConversationProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className={cn("h-4 w-4")} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Conversation</DialogTitle>
          <DialogDescription>{conversation?.title}</DialogDescription>
        </DialogHeader>
        {conversation && (
          <ConversationForm
            conversation={conversation}
            onSubmited={setOpen.bind(null, false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
