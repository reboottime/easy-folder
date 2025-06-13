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

export const useGetConversations = (params?: { folderId?: string; bookmarked?: boolean }) => {
  return useQuery({
    queryKey: conversationQueryKeys.conversationsByParams(params),
    queryFn: () => conversationsService.findAll(params),
  });
};

export const useUpdateConversation = () => {
  return useMutation({
    mutationFn: ({ conversationId, update }: { 
      conversationId: string; 
      update: IUpdateConversationDto 
    }) => conversationsService.update(conversationId, update),
    onSuccess: (updatedConversation, variables) => {
      queryClient.setQueryData(
        conversationQueryKeys.conversation(variables.conversationId),
        updatedConversation
      );
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
      queryClient.removeQueries({
        queryKey: conversationQueryKeys.conversation(deletedId)
      });
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.conversations
      });
    },
    retry: 1
  });
};

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: (createFolderDto: ICreateConversationDto) => conversationsService.create(createFolderDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: conversationQueryKeys.conversations
      });
    },
    retry: 1
  });
};