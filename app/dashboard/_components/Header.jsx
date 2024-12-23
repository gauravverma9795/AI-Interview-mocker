"use client"

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

  const router = useRouter();

  const MoveInDeshboard = () => {
    router.push('/dashboard');
  }

  const MoveInUpgrade = () => {
    router.push('/dashboard/upgrade');
  }

  const MoveInQuestions = () => {
    router.push('/dashboard/questions');
  }

  const path = usePathname();
  useEffect(() => {

    console.log(path);

  }, [])
  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
      <Image src={'/logo.svg'} width={160} height={100} alt='logo' />
      <ul className='hidden md:flex gap-6  '>

        <li onClick={MoveInDeshboard} className={`hover:text-primary hover:font-bold transition-all cursor-pointer

       ${path == '/dashboard' && 'text-primary font-bold'}
       
        `}
        >Dashboard</li>
        <li onClick={MoveInQuestions} className={`hover:text-primary hover:font-bold transition-all cursor-pointer

${path == '/dashboard/questions' && 'text-primary font-bold'}

 `}>Questions</li>
        <li onClick={MoveInUpgrade} className={`hover:text-primary hover:font-bold transition-all cursor-pointer

${path == '/dashboard/upgrade' && 'text-primary font-bold'}

 `}>Upgrade</li>
        <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer${path == '/dashboard/how' && 'text-primary font-bold'}`}>
          How it Works?
        </li>
        <li>
          <UserButton />
        </li>


      </ul>

    </div>
  )
}

export default Header