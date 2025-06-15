import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '@content/queryClient';
import promptsService from '@content/services/prompts.service';

export const promptQueryKeys = {
  prompts: ['prompts'],
  prompt: (promptId: string) => [
    ...promptQueryKeys.prompts,
    promptId
  ]
};

export const useGetPrompts = () => {
  return useQuery({
    queryKey: [...promptQueryKeys.prompts],
    queryFn: promptsService.findAll
  });
};

export const useCreatePrompt = () => {
  return useMutation({
    mutationFn: (createPromptDto: any) => promptsService.create(createPromptDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: promptQueryKeys.prompts
      });
    },
    retry: 1
  });
};

export const useUpdatePrompt = () => {
  return useMutation({
    mutationFn: ({ id, update }: { id: string; update: IUpdatePromptDto }) =>
      promptsService.update(id, update),
    onSuccess: (updatedPrompt, variables) => {
      queryClient.setQueryData(
        promptQueryKeys.prompt(variables.id),
        updatedPrompt
      );

      queryClient.invalidateQueries({
        queryKey: promptQueryKeys.prompts
      });
    },
    retry: 1
  });
};

export const useDeletePrompt = () => {
  return useMutation({
    mutationFn: (id: string) => promptsService.remove(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: promptQueryKeys.prompt(deletedId)
      });

      // Invalidate prompts list
      queryClient.invalidateQueries({
        queryKey: promptQueryKeys.prompts
      });
    },
    retry: 1
  });
};