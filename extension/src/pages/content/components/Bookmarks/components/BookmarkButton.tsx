import React, { useMemo } from 'react';
import { Button } from '@ui/button';
import { useGetConversations, useUpdateConversation } from '@pages/content/queries/conversations.queries';

interface BookmarkButtonProps {
  conversationId: string;
  className?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  conversationId,
  className = ''
}) => {
  const updateConversation = useUpdateConversation();
  const { data } = useGetConversations();
  const isBookmarked = useMemo(() => {
    return data?.conversations?.filter?.(item => item.conversationId === conversationId);
  }, [data]);

  const handleBookmarkToggle = () => {
    updateConversation.mutate({
      conversationId,
      updateConversationDto: { bookmarked: !isBookmarked }
    });
  };

  return (
    <Button
      onClick={handleBookmarkToggle}
      disabled={updateConversation.isPending}
      className={`bookmark-btn ${className} ${isBookmarked ? 'bookmarked' : ''}`}
      title={isBookmarked ? 'Remove bookmark' : 'bookmark conversation'}
    >
      {updateConversation.isPending ? (
        <span>⏳</span>
      ) : (
        <span>{isBookmarked ? '★' : '☆'}</span>
      )}
    </Button>
  );
};

export default BookmarkButton;
