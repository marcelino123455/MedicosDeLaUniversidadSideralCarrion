"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useState } from "react"




const formSchema = z.object({
    age: z.coerce.number().min(1, "La edad es requerida."),
    sex: z.number().min(0, "El sexo es requerido."),
    cp: z.number().min(0, "El tipo de dolor en el pecho es requerido."),
    trestbps: z.coerce.number().min(0, "La presión arterial en reposo es requerida."),
    chol: z.coerce.number().min(0, "El nivel de colesterol es requerido."),
    fbs: z.number().min(0, "El nivel de azúcar en ayunas es requerido."),
    restecg: z.number().min(0, "Los resultados del electrocardiograma son requeridos."),
    thalach: z.coerce.number().min(0, "La frecuencia cardiaca máxima es requerida."),
    exang: z.number().min(0, "El dolor inducido por el ejercicio es requerido."),
    oldpeak: z.coerce.number().min(0, "La depresión del ST es requerida."),
    slope: z.number().min(0, "La pendiente del ST es requerida."),
    ca: z.number().min(0, "El número de vasos coloreados es requerido."),
    thal: z.number().min(0, "El tipo de talasemia es requerido."),
})

const Descriptions = {
    age: "La edad debe estar en años",
    sex: "Ingrese 'M' para masculino y 'F' para femenino", //options
    cp: "Tipo de dolor en el pecho", // options
    trestbps: "Presión arterial en reposo (mmHg)",
    chol: "colestoral sérico en (mg/dl)",
    fbs: "Nivel de azúcar en ayunas", //options
    restecg: "Resultados del electrocardiograma", //options
    thalach: "Frecuencia cardiaca máxima alcanzada",
    exang: "Angina producida por el ejercicio", //options
    oldpeak: "Depresión del ST inducida por el ejercicio",
    slope: "Pendiente del segmento ST", //options
    ca: "Número de vasos coloreados por fluoroscopia (0-3)", //options
    thal: "Tipo de talasemia (0-3)", //options
}

const titles = {
    age: "Edad",
    sex: "Sexo",
    cp: "Tipo de dolor en el pecho",
    trestbps: "Presión arterial en reposo",
    chol: "Colesterol sérico",
    fbs: "Nivel de azúcar en ayunas (>120 mg/dL)",
    restecg: "Resultados del electrocardiograma",
    thalach: "Frecuencia cardiaca máxima",
    exang: "Angina inducida por el ejercicio",
    oldpeak: "Depresión del ST inducida por el ejercicio",
    slope: "Pendiente del segmento ST",
    ca: "Número de vasos coloreados por fluoroscopia",
    thal: "Tipo de talasemia",
};



const Options = {
    age: {
        hasOPtion: false

    },
    sex: {
        hasOPtion: true,
        opciones: ["F", "M"]
    },
    cp: {
        hasOPtion: true,
        opciones: ["Angina típica", "Angina atípica", "Dolor no anginoso", "Asintomático"]
    },
    trestbps: {
        hasOPtion: false
    },
    chol: {
        hasOPtion: false
    },
    fbs: {
        hasOPtion: true,
        opciones: ["No", "Si"]
    },
    restecg: {
        hasOPtion: true,
        opciones: ["Normal", "Tener anomalía de la onda ST-T (inversiones de la onda T y/o elevación o depresión del ST > 0,05 mV)", "Mostrando hipertrofia ventricular izquierda probable o definitiva según los criterios de Estes"]
    },
    thalach: {
        hasOPtion: false
    },
    exang: {
        hasOPtion: true,
        opciones: ["No", "Si"]
    },
    oldpeak: {
        hasOPtion: false
    },
    slope: {
        hasOPtion: true,
        opciones: ["Pendiente ascendente", "Plano", "Pendiente descendente"]
    },
    ca: {
        hasOPtion: true,
        opciones: ["0", "1", "2", "3"]
    },
    thal: {
        hasOPtion: true,
        opciones: ["Normal", "Defecto solucionado", "Defecto reversible y la etiqueta"]
    },

}


export default function Cardiopatia() {
    const [loading, setLoding] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [result, setResult] = useState("")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age: 0,
            sex: -1,
            cp: -1,
            trestbps: 0,
            chol: 0,
            fbs: -1,
            restecg: -1,
            thalach: 0,
            exang: -1,
            oldpeak: 0,
            slope: -1,
            ca: -1,
            thal: -1,
        },
    })
    const { toast } = useToast()


    function generateValuesToCompute(field, value) {
        const opciones = Options[field]?.opciones || [];
        return opciones.indexOf(value);
    }

    function interpretateResult(number) {
        return number === 0
            ? "Felicidades, al parecer no presentas alguna enfermedad cardiovascular."
            : "Hemos detectado que puedes tener una enfermedad cardiovascular. No te preocupes, consulta con tu médico a tiempo.";
    }
    
    async function onSubmit(values) {
        console.log("values:", values)
        setLoding(true)

        try {
            const response = await fetch("http://127.0.0.1:8000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
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
        } finally{
            setLoding(false)

        }
    }

    return (
        <div className='ml-20 mt-10'>
            <div>
                <h2>
                    Bienvenido al detector de enfermedades cardíacas.
                </h2>
                <p className='mt-5'>
                    Para su empleo requerimos que llene el siguiente formulario, procesaremos la data y en un momento le entregaremos los resultados.

                </p>

            </div>
            <div className="ml-20 mr-20 mt-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 mr-20 grid grid-cols-2 gap-x-20">
                        {Object.keys(formSchema.shape).map((field, des) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field}
                                render={({ field: formField }) => (


                                    <FormItem>
                                        <FormLabel>{titles[field] + " [" + field + "]"}</FormLabel>
                                        <FormControl>
                                            {Options[field]?.hasOPtion === false ? (<Input type="text" {...formField} />)
                                                :
                                                (
                                                    // <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            const index = generateValuesToCompute(field, value);
                                                            formField.onChange(index);
                                                        }}
                                                        value={Options[field]?.opciones[parseInt(formField.value)] || ""}
                                                    >

                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={`Seleccione ${titles[field].charAt(0).toLowerCase() + titles[field].slice(1)}`} />

                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {Options[field]?.opciones?.map((opcion, index) => (
                                                                <SelectItem key={index} value={opcion}>
                                                                    {opcion}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>)
                                            }

                                        </FormControl>

                                        <FormDescription>
                                            {Descriptions[field] || "Descripción no disponible"}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <div className="mt-10 mx-auto">
                            <Button className="bg-[#27ab4b] pl-10 pr-10 hover:bg-[#1eb5c9]" type="submit">{loading===true?"Cargando . . .":"Enviar"}</Button>
                        </div>
                    </form>

                </Form>

                <div>
                    {loaded &&
                        <Dialog open={loaded} onOpenChange={setLoaded}>
                            {/* <DialogTrigger asChild>
                                <Button variant="outline">Share</Button>
                            </DialogTrigger> */}
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Resultados</DialogTitle>
                                    <DialogDescription>
                                        {/* Anyone who has this link will be able to view this. */}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex items-center space-x-2">
                                    <div className="text-justify grid flex-1 gap-2">
                                        {
                                            interpretateResult(result.condition)
                                        }
                                    </div>
                                </div>
                                <DialogFooter className="sm:justify-start">
                                    <DialogClose asChild>
                                        <Button className="bg-[#27ab4b] pl-10 pr-10 hover:bg-[#1eb5c9]" type="button" >
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }

                </div>
            </div>
        </div>
    )
}
