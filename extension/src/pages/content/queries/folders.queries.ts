import { useMutation, useQuery } from '@tanstack/react-query';

import queryClient from '@content/queryClient';
import foldersService from '@content/services/folders.service';

export const folderQueryKeys = {
  folders: ['folders'],
  folder: (folderId: string) => [
    ...folderQueryKeys.folders,
    folderId
  ]
};

export const useGetFolders = () => {
  return useQuery({
    queryKey: [...folderQueryKeys.folders],
    queryFn: foldersService.findAll
  });
};

export const useCreateFolder = () => {
  return useMutation({
    mutationFn: (createFolderDto: any) => foldersService.create(createFolderDto),
    onSuccess: () => {
      // Invalidate and refetch folders list
      queryClient.invalidateQueries({
        queryKey: folderQueryKeys.folders
      });
    },
    retry: 1
  });
};

export const useUpdateFolder = () => {
  return useMutation({
    mutationFn: ({ id, update }: { id: string; update: IUpdateFolderDto }) =>
      foldersService.update(id, update),
    onSuccess: (_, variables) => {
      // Invalidate folders list
      queryClient.invalidateQueries({
        queryKey: folderQueryKeys.folders
      });
      // Also invalidate specific folder if we had individual folder queries
      queryClient.invalidateQueries({
        queryKey: folderQueryKeys.folder(variables.id)
      });
    },
    retry: 1
  });
};

export const useDeleteFolder = () => {
  return useMutation({
    mutationFn: (id: string) => foldersService.delete(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: folderQueryKeys.folder(deletedId)
      });
      // Invalidate folders list
      queryClient.invalidateQueries({
        queryKey: folderQueryKeys.folders
      });
    },
    retry: 1
  });
};
