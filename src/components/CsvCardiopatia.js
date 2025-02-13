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

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
            return ["Probabilidad media", "bg-[#c9ffd3]"]
        } else if (numberFloat <= 0.7) {
            return ["Probabilidad media alta", "bg-[#ffeed4]"]
        } else {
            return ["Probabilidad alta", "bg-[#ffc0ba] text-[#030000]"]
        }
    }
    function getNegrita(numberFloat) {
        if (numberFloat > 0.7) {
            return "font-bold italic"; 
        }  
        if (numberFloat > 0.5) {
            return "font-bold";     
        }  
        return "";
    }

    return (
        <div className="mt-20 ml-20 mr-20">

            <div className="flex flex-col items-center justify-center w-[300px] mx-auto text-center space-y-4">
                <Label htmlFor="picture">A continuación suba el archivo en csv</Label>
                <Input id="picture" type="file" onChange={handleFileChange} />
                <Button className="bg-[#27ab4b] pl-10 pr-10 hover:bg-[#1eb5c9]" onClick={onSubmit} disabled={loading}>
                    {loading ? "Enviando..." : "Enviar CSV"}
                </Button>
            </div>
            <h2 className="mt-10 mb-10 mx-auto flex flex-col items-center justify-cente">
            </h2>

            <Dialog className="mt-10 max-h-[80vh] w-full" open={loaded} onOpenChange={setLoaded}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                </DialogTrigger> */}
                <DialogContent className="max-w-4xl w-full h-auto max-h-screen overflow-y-auto">

                    <DialogHeader className="mt-10 mx-auto font-bold text-[#04b34a]">
                ORDEN DE ATENCION DE LOS PACIENTES CON POSIBLES PROBLEMAS CARDIACOS
                <DialogTitle> </DialogTitle>
                        <DialogDescription>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                {
                    result.map((paciente, i) => (
                        <div key={i} >
                            <Card className={`mt-5 ${getProbability(paciente.probability)[1]}`}>
                                <CardHeader >
                                    <CardTitle>Paciente Número {paciente.index}</CardTitle>
                                    <CardDescription className={`${getProbability(paciente.probability)[1]}`}>Orden de atención {i + 1}</CardDescription>
                                </CardHeader>
                                <CardContent className={`${getNegrita(paciente.probability)}`}>
                                
                                {getProbability(paciente.probability)[0]}
                                </CardContent>
                            </Card>
                        </div>

                    ))
                }
            </div>
                    <DialogFooter>
                        {/* <Button type="submit">Save changes</Button> */}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* <div className="grid grid-cols-2 gap-4">
                {
                    result.map((paciente, i) => (
                        <div key={i} >
                            <Card className={`mt-5 ${getProbability(paciente.probability)[1]}`}>
                                <CardHeader >
                                    <CardTitle>Paciente Número {paciente.index} con orden de atención: {i + 1}</CardTitle>
                                    <CardDescription className={`${getProbability(paciente.probability)[1]}`}>{getProbability(paciente.probability)[0]}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {paciente.probability}
                                </CardContent>
                            </Card>
                        </div>

                    ))
                }
            </div> */}


        </div>
    )
}
