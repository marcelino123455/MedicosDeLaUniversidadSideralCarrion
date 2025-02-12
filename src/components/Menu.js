'use client'
import { Globallinks } from '@/utils/constantes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
  

const links = Globallinks

export default function Navegacion() {
  const pathName = usePathname()

  return (
    <div>
      <div className="grid grid-cols-2 text-[#04b34a] font-bold text-2xl ">
        <div className='ml-20 mt-6 w-[290px]'>
          <img src='LogoSideral.png'>
          </img>
          {/* <Image
            src="/LogoSideral.png"
            width="230"
            height="100"
            alt="Logotipo Sideral Carrion"
          >

          </Image> */}
        </div>
        <div >
          <nav className='mt-14 flex space-x-8'>
            {/* <div className='hover:text-[#7c2c9c]'>
              <Link href="/">Inicio</Link>
            </div>
            <div className={`hover:text-[#7c2c9c]
              ${pathName==="/nosotros"? "bg-red-500": "" }`
            }>
              <Link href="/nosotros">Nosotros</Link>
            </div>
            <div className='hover:text-[#7c2c9c]'>
              <Link href="/blog">Blog</Link>
            </div> */}
            {links.map((link) => (
              <div key={link.name} className={`hover:text-[#0eb6c7] ${pathName === link.href? "bg-[#73eaf5] rounded-md p-1 -mt-2" :""}`}>
                <Link  href={link.href} >
                {link.name}
              </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <hr className='mt-2'></hr>
    </div>
  )
}
