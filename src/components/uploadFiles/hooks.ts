
import { useQuery, useMutation } from '@tanstack/react-query'
import { api } from '../../utils/api'

export type EntityProp = string
export type EntityIdProp = string | number | undefined

export interface FileProps {
  id: string
  name: string
  size: number
  content_type: string
}

export const useHandleFiles = ({ entity, entityId, targetId }: { entity: EntityProp; entityId: EntityIdProp; targetId: string }) => {
  const { data: { data: files } = {}, isLoading, error, refetch } = useQuery({
    queryKey: ['files', entity, entityId],
    queryFn: () => api.get<FileProps[]>('/files/list', {
      params: {
        entity,
        entityId,
        targetId
      }
    }),
  })

  const { mutate: postFiles } = useMutation({
    mutationFn: (newFiles: File[]) => {
      const formData = new FormData()
      newFiles.forEach(file => formData.append('files', file))

      return api.post('/files/upload', { 
        formData,
        params: {
          entity,
          entityId,
          targetId
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess: () => {
      refetch()
    }
  })
  const { mutate: removeFile } = useMutation({
    mutationFn: (fileId: string) => api.delete('/files/delete/', {
      params: {
        targetId,
        entity,
        entityId,
        fileId
      }
    }),
    onSuccess: () => {
      refetch()
    }
  })

  return {
    files,
    isLoading,
    error,
    postFiles,
    removeFile
  }
}
