import { Icon } from '@iconify/react'
import { Metadata } from "next";
import ListaPropiedades from '@/components/Properties';

export const metadata: Metadata = {
  title: "Gestión Propiedades | Cm Properties",
};

export default function PropertiesManagement() {
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
            Gestión Propiedades
          </p>
        </div>
      </div>
      {/* form */}
      <ListaPropiedades />
    </div>
  )
}
