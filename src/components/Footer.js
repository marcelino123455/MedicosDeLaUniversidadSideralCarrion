import { Globallinks } from '@/utils/constantes'
import Link from 'next/link'
import React from 'react'
import { IoLogoFacebook } from "react-icons/io";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const links = Globallinks
export default function Footer() {
    return (
        <div>
            <hr className='mt-10 mb-10'></hr>

            <div className='w-20 ml-20'>
                <img src='NonLogoCarrion.png'></img>
            </div>

            <div className='mt-5 grid grid-cols-3 ml-20'>
                <div>
                    <span className='font-medium'>
                        Enlaces
                    </span>
                    <div className=''>
                        {links.map((link, index) => (
                            <div key={index} className='mt-2'>
                                <Link href={link.href}> {link.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <span className='font-medium'>
                        Redes sociales
                    </span>

                    <div className='mt-1 flex space-x-2'>
                        <div >
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoLogoFacebook />
                            </a>
                        </div>

                        <div>
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BsInstagram />
                            </a>
                        </div>
                        <div>
                            <a
                                href="https://www.linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>
                <div>
                    <span className='font-medium'>
                        MedicosDeLaUniversidadSideralCarrion
                    </span>
                </div>
            </div>

            <div className='mt-5  text-center'>
                <span>2025</span>
            </div>


        </div>
    )
}
