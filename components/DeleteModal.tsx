'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useAppStore } from '@/store/store'
import { useUser } from '@clerk/nextjs'
import { db, storage } from '@/firebase'
import { ref, deleteObject } from '@firebase/storage'
import { doc } from '@firebase/firestore'
import { deleteDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'

export function DeleteModal() {
  const { user } = useUser()
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = useAppStore(state => [
    state.isDeleteModalOpen,
    state.setIsDeleteModalOpen,
    state.fileId,
    state.setFileId
  ])

  async function deleteFile() {
    if (!user || !fileId) return

    const toastId = toast.loading('Deleting file...')
    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

    try {
      await deleteObject(fileRef)
        .then(async () => {
          await deleteDoc(doc(db, 'users', user.id, 'files', fileId)).then(() => {
            toast.success('Deleted successfully!', { id: toastId })
          })
        })
        .finally(() => {
          setIsDeleteModalOpen(false)
        })
    } catch (error) {
      toast.error('Something went wrong!')
      setIsDeleteModalOpen(false)
      console.error(error)
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={isOpen => {
        setIsDeleteModalOpen(isOpen)
      }}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the file!
          </DialogDescription>
        </DialogHeader>

        <div className='flex py-3 space-x-2'>
          <Button
            size='sm'
            className='px-3 flex-1'
            variant={'ghost'}
            onClick={() => setIsDeleteModalOpen(false)}>
            <span className='sr-only'>Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type='submit'
            size='sm'
            variant={'destructive'}
            className='px-3 flex-1'
            onClick={() => deleteFile()}>
            <span className='sr-only'>Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
