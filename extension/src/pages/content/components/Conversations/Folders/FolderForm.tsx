import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import { Label } from '@ui/label';

const folderSchema = yup.object({
  name: yup.string().required('Name is required').min(1, 'Name cannot be empty'),
  description: yup.string().optional(),
})  as yup.ObjectSchema<IUpdateFolderDto>;;

interface FolderFormProps {
  folder: IFolder | ICreateFolderDto;
  onSubmit: (data: IUpdateFolderDto) => void;
  isLoading?: boolean;
}

export const FolderForm: React.FC<FolderFormProps> = ({ folder, onSubmit, isLoading }) => {
  const isEditing = folder && '_id' in folder;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateFolderDto>({
    resolver: yupResolver(folderSchema),
    defaultValues: {
      name: folder?.name || '',
      description: folder?.description || '',
    },
  });

  if (!folder) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Folder name"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Optional description"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Saving...' : isEditing ? 'Update Folder' : 'Create Folder'}
      </Button>
    </form>
  );
};
