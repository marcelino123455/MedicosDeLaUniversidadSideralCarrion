'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"
import React, { useState, useEffect, useRef } from 'react'
import Autoplay from "embla-carousel-autoplay"

const images = [
    { href: "carrusel2.png", content: "Según la Organización Mundial de la Salud (2025), las enfermedades cardiovasculares son la principal causa de muerte a nivel mundial, siendo responsables de aproximadamente 17,9 millones de fallecimientos cada año. Estos trastornos incluyen la cardiopatía coronaria, los accidentes cerebrovasculares y las cardiopatías reumáticas, y más de cuatro de cada cinco defunciones por estas enfermedades se deben a cardiopatías coronarias y accidentes cerebrovasculares. Además, un tercio de estas muertes son prematuras, ocurriendo en personas menores de 70 años.", className: ""  },
    {  href: "carrusel1.png", content: "Así presentamos Hearth-Prevent, una herramienta que promete por la predicción de enfermedades cardiovasculares. Para así fomentar una mejora en la calidad de vida, el desarrollo pleno con nuestros seres queridos y la obtención de nuestras metas a largo plazo.",
        className: ""
     },
    
    { href: "carrusel3.png", content: '"Un chequeo a tiempo puede salvar tu vida"', 
        className: "text-6xl font-bold text-center"
     }
];

export default function Carrusel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const autoplayRef = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
    const [embla, setEmbla] = useState(null); 

    useEffect(() => {
        if (!embla) return;
        const onSelect = () => setCurrentIndex(embla.selectedScrollSnap());
        embla.on("select", onSelect);
        return () => embla.off("select", onSelect);
    }, [embla]);

    return (
        <div className="flex text-black ml-20 mt-10">
            <div>
                <Carousel
                    opts={{ loop: true }}
                    plugins={[autoplayRef.current]}
                    className="flex w-[450px]"
                    onMouseEnter={autoplayRef.current.stop}
                    onMouseLeave={autoplayRef.current.reset}
                    setApi={setEmbla} 
                >
                    <CarouselContent>
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center">
                                        <img className="w-full h-full object-cover" src={image.href} />
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <div className="ml-20 mr-40 flex items-center text-justify">
                <p className={images[currentIndex].className}>
                    {images[currentIndex].content}
                </p>
            </div>
        </div>
    );
}
