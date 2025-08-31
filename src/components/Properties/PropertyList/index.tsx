import PropertyCard from '@/components/Home/Properties/Card/Card'
import { propertyHomes } from '@/app/api/propertyhomes'
import { Icon } from '@iconify/react'

const PropertiesListing: React.FC = () => {
  return (
    <>
      <section className='pt-0!'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 justify-self-center items-center'>
            <div className="mb-9 justify-self-center items-center">
              <select
                className="flex w-full cursor-pointer items-center justify-center 
                rounded-2xl border border-primary bg-primary hover:bg-transparent
                hover:text-primary px-5 py-3 text-base text-white transition 
                duration-300 ease-in-out "
              >
                <option value="">Seleccionar Tipo de propiedad</option>
                <option value="1">Propiedades en la ciudad</option>
                <option value="2">Propiedades en el campo</option>
              </select>
            </div>
            <div className="mb-9 justify-self-center items-center">
              <button
                type="submit"
                className="flex w-1xl cursor-pointer items-center justify-center
                 rounded-2xl border border-primary bg-primary hover:bg-transparent
                  hover:text-primary px-5 py-3 text-base text-white transition
                   duration-300 ease-in-out "
              >
                <span>
                  <Icon
                    icon={'ph:arrow-up-bold'}
                    width={20}
                    height={20}
                    className='text-secondary mr-2'
                  />
                </span>
                Mayor precio
              </button>

            </div>
            <div className="mb-9 justify-self-center items-center">
              <button
                type="submit"
                className="flex w-1xl cursor-pointer items-center justify-center rounded-2xl 
                border border-primary bg-primary hover:bg-transparent hover:text-primary 
                px-5 py-3 text-base text-white transition duration-300 ease-in-out"
              >
                <span>
                  <Icon
                    icon={'ph:arrow-down-bold'}
                    width={20}
                    height={20}
                    className='text-secondary mr-2'
                  />
                </span>
                Menor precio
              </button>

            </div>
          </div>
        </div>
      </section>
      <section className='pt-0!'>
        <div className='container max-w-8xl mx-auto px-5 2xl:px-0'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10'>
            {propertyHomes.map((item, index) => (
              <div key={index} className=''>
                <PropertyCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default PropertiesListing
