"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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

// const formSchema = z.object({
//     age: z.coerce.number().min(1, "La edad es requerida."),
//     sex: z.string().min(1, "El sexo es requerido."),
//     cp: z.coerce.number().min(0, "El tipo de dolor en el pecho es requerido."),
//     trestbps: z.coerce.number().min(1, "La presión arterial en reposo es requerida."),
//     chol: z.coerce.number().min(1, "El nivel de colesterol es requerido."),
//     fbs: z.coerce.number().min(0, "El nivel de azúcar en ayunas es requerido."),
//     restecg: z.coerce.number().min(0, "Los resultados del electrocardiograma son requeridos."),
//     thalach: z.coerce.number().min(1, "La frecuencia cardiaca máxima es requerida."),
//     exang: z.coerce.number().min(0, "El dolor inducido por el ejercicio es requerido."),
//     oldpeak: z.coerce.number().min(0, "La depresión del ST es requerida."),
//     slope: z.coerce.number().min(0, "La pendiente del ST es requerida."),
//     ca: z.coerce.number().min(0, "El número de vasos coloreados es requerido."),
//     thal: z.coerce.number().min(0, "El tipo de talasemia es requerido."),
// })


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
    cp: "Tipo de dolor en el pecho (0-3), [0:leve] [3:fuerte]", // options
    trestbps: "Presión arterial en reposo (mmHg)",
    chol: "colestoral sérico en (mg/dl)",
    fbs: "Nivel de azúcar en ayunas (>120 mg/dL: 1, si no: 0)", //options
    restecg: "Resultados del electrocardiograma", //options
    thalach: "Frecuencia cardiaca máxima alcanzada",
    exang: "Angina producida por el ejercicio (1 = Sí, 0 = No)", //options
    oldpeak: "Depresión del ST inducida por el ejercicio",
    slope: "Pendiente del segmento ST", //options
    ca: "Número de vasos coloreados por fluoroscopia (0-3)", //options
    thal: "Tipo de talasemia (0-3)", //options
}

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

    function generateValuesToCompute(field, value) {
        const opciones = Options[field]?.opciones || [];
        return opciones.indexOf(value);
    }

    function onSubmit(values) {
        console.log(values)
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
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 mr-20 grid grid-cols-2 gap-x-20">
                        {Object.keys(formSchema.shape).map((field, des) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field}
                                render={({ field: formField }) => (


                                    <FormItem>
                                        <FormLabel>{field}</FormLabel>
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
                                                                <SelectValue placeholder={`Seleccione ${field}`} />
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
                            <Button className="bg-[#27ab4b] pl-10 pr-10 hover:bg-[#1eb5c9]" type="submit">Enviar</Button>
                        </div>
                    </form>

                </Form>

            </div>
        </div>
    )
}
