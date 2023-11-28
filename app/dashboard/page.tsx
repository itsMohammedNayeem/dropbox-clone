import Dropzone from '@/components/Dropzone'
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { FileType } from '@/typings'
import TableWrapper from '@/components/table/TableWrapper'

async function Dashboard() {
  const { userId } = auth()

  const docResults = await getDocs(collection(db, 'users', userId!, 'files'))
  const skeletonFiles: FileType[] = docResults.docs.map(doc => {
    return {
      id: doc.id,
      filename: doc.data().filename || doc.id,
      fullName: doc.data().fullName,
      type: doc.data().type,
      size: doc.data().size,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadURL: doc.data().downloadURL
    }
  })

  return (
    <div className='border-t'>
      <Dropzone />
      <section className='container space-y-5'>
        <h2 className='text-2xl font-bold'>All Files</h2>
        <div className='mt-4'>
          {/* Table wrapper */}
          <TableWrapper skeletonFiles={skeletonFiles} />
        </div>
      </section>
    </div>
  )
}

export default Dashboard
