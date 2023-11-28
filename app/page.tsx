import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className=''>
      <div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
        <div className='p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5'>
          <h1 className='text-5xl font-bold'>
            Welcome to Dropbox. <br />
            <br />
            Storing everything you for and your business needs. All in one place.
          </h1>

          <p className='pb-20'>
            Dropbox is a modern workspace designed to reduce busywork-so you can focus on the things
            that matter. Sign in and put your creative energy to work. Enhance your personal storage
            with Dropbox, offering a simple and efficient to upload, organize, and access files from
            anywhere. Securely store important documents, photos, videos, and more with Dropbox and
            experience the cloud storage solution that makes it easy to access files from any
            device.
          </p>

          <Link href='/dashboard' className='flex cursor-pointer bg-blue-500 p-5 w-fit'>
            Try it for free!
            <ArrowRight className='ml-10' />
          </Link>
        </div>

        <div className='bg-[#1E1919] dark:bg-slate-800 h-full p-10'>
          <video autoPlay muted loop className='rounded-lg'>
            <source
              src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4'
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <p className='text-center font-bold text-xl pt-5'>Disclaimer</p>
      <p className='text-center font-light p-2'>
        This is made for educational purposes only. I do not own any of the images used in this
        project. All rights belong to their respective owners. I do not own or affiliated with
        Dropbox in any way. This is a clone of the Dropbox website. Copyright disclaimer under
        section 107 of Copyright Act. 1976, allowance is made for fair use of this website for
        education purposes.
      </p>
    </main>
  )
}
