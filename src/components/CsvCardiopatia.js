"use client"
import { useState } from "react"

import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useToast } from "@/hooks/use-toast"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export default function CsvCardiopatia() {
    const { toast } = useToast()

    const [loading, setLoding] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [result, setResult] = useState([])
    const [file, setFile] = useState(null);
    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }
    async function onSubmit() {
        if (!file) {
            toast({
                title: "Selecciona un archivo CSV",
                variant: "destructive",
            });
            return;
        }
        setLoding(true)
        const formData = new FormData();
        formData.append("file", file);
        try {
            const response = await fetch("http://127.0.0.1:8000/predict_batch", {
                method: "POST",

                body: formData
            });

            if (!response.ok) {

                throw new Error(`Error en la solicitud: ${response.status}`);
            }

            const data = await response.json();
            setResult(data)

            toast({
                title: "Datos enviados correctamente",
                className: "bg-green-500 text-white",
            })
            setLoaded(true)
            console.log("Respuesta", data)
        } catch (error) {
            console.log("error:", error)

            toast({
                title: "Error al procesar, inténtalo nuevamente",
                description: error.message,
                variant: "destructive",
                // className: "bg-blue-500 text-white",
            });
        } finally {
            setLoding(false)

        }
    }
    function getProbability(numberFloat) {
        if (numberFloat <= 0.3) {
            return ["Probabilidad baja", "bg-white-600 "]
        } else if (numberFloat <= 0.5) {
            return ["Probabilidad media", "bg-green-400"]
        }else if (numberFloat <= 0.7) {
            return ["Probabilidad media alta", "bg-red-100"]
        } else{
            return ["Probabilidad alta", "bg-red-400 text-[#030000]"]
        }
    }

    return (
        <div className="mt-20 ml-20 mr-20">
            <div className="flex flex-col items-center justify-center w-[300px] mx-auto text-center space-y-4">
                <Label  htmlFor="picture">A continuación suba el archivo en csv</Label>
                <Input id="picture" type="file" onChange={handleFileChange} />
                <Button className="" onClick={onSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Enviar CSV"}
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {
                    result.map((paciente, i) => (
                        <div key={i} >
                            <Card className={`mt-5 ${getProbability(paciente.probability)[1]}`}>
                            <CardHeader >
                                <CardTitle>Paciente Número: {paciente.index}</CardTitle>
                                <CardDescription className={`${getProbability(paciente.probability)[1]}`}>{getProbability(paciente.probability)[0]}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {paciente.probability}
                            </CardContent>
                        </Card>
                        </div>

                    ))
                }
            </div>


        </div>
    )
}
