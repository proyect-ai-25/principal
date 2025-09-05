import { Icon } from '@iconify/react'
import { Metadata } from "next";
import ListaContactos from '@/components/Contactus/index';





export const metadata: Metadata = {
    title: "Gestión Contactos | Cm Properties",
};

export default function ContactManagement() {
  return (
    <div className='container max-w-8xl mx-auto px-5 2xl:px-0 pt-32 md:pt-44 pb-14 md:pb-28'>
      <div className='mb-16'>
        <div className='flex gap-2.5 items-center justify-center mb-3'>
          <span>
            <Icon
              icon={'ph:house-simple-fill'}
              width={20}
              height={20}
              className='text-primary'
            />
          </span>
          <p className='text-base font-semibold text-badge dark:text-white/90'>
            Gestión Contactos
          </p>
        </div>
      </div>
      {/* form */}
      <div className='border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl dark:shadow-white/10'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-12'>
          <div className='flex-1/2'>
            <h2 className='text-2xl font-semibold mb-4'>Lista de Contactos</h2>
            <ListaContactos />
          </div>
        </div>
      </div>
    </div>
  )
}
