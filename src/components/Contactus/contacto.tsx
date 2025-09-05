
"use client"
import { useRouter } from "next/navigation";
import { registrarContacto } from "@/actions/ContactoAction"


export const Contacto = () => {
    const router = useRouter();
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            nombre: formData.get("nombre"),
            telefono: formData.get("telefono"),
            email: formData.get("email"),
            mensaje: formData.get("mensaje"),
            estado: 1,
            fechaCreacion: new Date().toJSON(),
        };

        registrarContacto(data).then(() => {
            form.reset();
            router.push("/contactus");
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-6'>
                    <input
                        type='text'
                        name='nombre'
                        id='nombre'
                        autoComplete='nombre'
                        placeholder='Nombre*'
                        required
                        className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                    />
                    <input
                        type='number'
                        name='telefono'
                        id='telefono'
                        autoComplete='telefono'
                        placeholder='Número de teléfono*'
                        required
                        className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline w-full'
                    />
                </div>
                <input
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='email'
                    placeholder='Dirección de correo electrónico*'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-full outline-primary focus:outline'
                />
                <textarea
                    rows={8}
                    cols={50}
                    name='mensaje'
                    id='mensaje'
                    placeholder='Escribe aquí tu mensaje'
                    required
                    className='px-6 py-3.5 border border-black/10 dark:border-white/10 rounded-2xl outline-primary focus:outline'></textarea>
                <button className='px-8 py-4 rounded-full bg-primary text-white text-base font-semibold w-full mobile:w-fit hover:cursor-pointer hover:bg-dark duration-300'>
                    Enviar mensaje
                </button>
            </div>
        </form>
    )
}
