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
    { href: "non1.png", content: "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem" },
    { href: "non2.png", content: "2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem" },
    { href: "non3.png", content: "3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem" }
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
                <p className="">
                    {images[currentIndex].content}
                </p>
            </div>
        </div>
    );
}
