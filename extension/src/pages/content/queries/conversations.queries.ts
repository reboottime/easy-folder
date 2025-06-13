import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '@src/pages/content/queryClient';
import conversationsService from '@utils/conversations.service';

export const conversationQueryKeys = {
  conversations: ['conversations'],
  conversationsByParams: (params?: { folderId?: string; bookmarked?: boolean }) => [
    ...conversationQueryKeys.conversations,
    'list',
    params
  ],
  conversation: (conversationId: string) => [
    ...conversationQueryKeys.conversations,
    conversationId
  ]
};

export const prefetchConversations = (params?: { folderId?: string; bookmarked?: boolean }) => {
  queryClient.prefetchQuery({
    queryKey: conversationQueryKeys.conversationsByParams(params),
    queryFn: () => conversationsService.findAll(params)
  });
};

export const useGetConversations = (params?: { folderId?: string; bookmarked?: boolean }) => {
  return useQuery({
    queryKey: conversationQueryKeys.conversationsByParams(params),
    queryFn: () => conversationsService.findAll(params)
  });
};

export const useUpdateConversation = () => {
  return useMutation({
    mutationFn: ({ conversationId, updateConversationDto }: { 
      conversationId: string; 
      updateConversationDto: any 
    }) => conversationsService.update(conversationId, updateConversationDto),
    onSuccess: (updatedConversation, variables) => {
      // Update specific conversation in cache
      queryClient.setQueryData(
        conversationQueryKeys.conversation(variables.conversationId),
        updatedConversation
      );
      
      // Invalidate all conversation lists to reflect changes
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.conversations
      });
    },
    retry: 1
  });
};

export const useDeleteConversation = () => {
  return useMutation({
    mutationFn: (conversationId: string) => conversationsService.remove(conversationId),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: conversationQueryKeys.conversation(deletedId)
      });
      
      // Invalidate all conversation lists
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.conversations
      });
    },
    retry: 1
  });
};

export const useDeleteConversationOptimistic = () => {
  return useMutation({
    mutationFn: (conversationId: string) => conversationsService.remove(conversationId),
    onMutate: async (deletedId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ 
        queryKey: conversationQueryKeys.conversations 
      });
      
      // Snapshot previous values for all conversation queries
      const previousQueries = queryClient.getQueriesData({ 
        queryKey: conversationQueryKeys.conversations 
      });
      
      // Optimistically update all conversation lists
      queryClient.getQueriesData({ 
        queryKey: conversationQueryKeys.conversations 
      }).forEach(([queryKey, data]) => {
        if (data && typeof data === 'object' && 'conversations' in data) {
          queryClient.setQueryData(queryKey, {
            ...data,
            conversations: (data as any).conversations.filter(
              (conv: IConversation) => conv._id !== deletedId
            )
          });
        }
      });
      
      return { previousQueries };
    },
    onError: (err, deletedId, context) => {
      // Rollback on error
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ 
        queryKey: conversationQueryKeys.conversations 
      });
    },
    retry: 1
  });
};