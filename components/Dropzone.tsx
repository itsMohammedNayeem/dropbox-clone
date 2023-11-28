'use client'

import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import DropzoneComponent from 'react-dropzone'
import { addDoc, updateDoc, collection, serverTimestamp, doc } from 'firebase/firestore'
import { db, storage } from '@/firebase'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import toast from 'react-hot-toast'
import { PlusCircle } from 'lucide-react'

function Dropzone() {
  // max file size is 20MB
  const maxSize = 20 * 1024 * 1024
  const [loading, setLoading] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = async () => {
        await uploadPost(file)
      }
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')

      reader.readAsArrayBuffer(file)
    })
  }

  const uploadPost = async (selectedFile: File) => {
    if (loading) return
    if (!user) return

    const toastId = toast.loading('Uploading file...')
    setLoading(true)

    const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      type: selectedFile.type,
      size: selectedFile.size,
      timestamp: serverTimestamp()
    })

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

    uploadBytes(imageRef, selectedFile).then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef)

      await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
        downloadURL: downloadURL
      })
    })

    toast.success('Uploaded successfully!', { id: toastId })
    setLoading(false)
  }

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {
        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize

        return (
          <section className='m-4'>
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center',
                isDragActive
                  ? 'text-white animate-pulse bg-[#035FFE]'
                  : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400'
              )}>
              <input {...getInputProps()} />
              <div className='flex flex-col items-center space-y-4 hover:cursor-pointer'>
                {!isDragActive && (
                  <>
                    <PlusCircle className='w-8 h-8 text-[#318D2A]' />
                    <p className='text-lg font-light'>Click here or drop a file to upload!</p>
                  </>
                )}
                {isDragActive && !isDragReject && 'Drop to upload this file!'}
                {isDragReject && (
                  <p className='text-destructive mt-2'>File type not accepted, sorry!</p>
                )}
                {isFileTooLarge && <p className='text-destructive mt-2'>File is too large!</p>}
              </div>
            </div>
          </section>
        )
      }}
    </DropzoneComponent>
  )
}

export default Dropzone
