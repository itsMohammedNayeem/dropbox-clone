import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { ModeToggle } from './ModeToggle'

function Header() {
  return (
    <header className='flex items-center justify-between'>
      <Link href='/' className='flex items-center gap-2'>
        <div className='w-fit bg-[#0160FE]'>
          <Image
            src='https://www.shareicon.net/data/2015/08/10/82855_dropbox_4096x4096.png'
            alt='logo'
            className='invert'
            height={50}
            width={50}
          />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>

      <div className='px-5 flex space-x-2 items-center'>
        <ModeToggle />

        <UserButton afterSignOutUrl='/' />

        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  )
}

export default Header
