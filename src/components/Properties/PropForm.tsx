import React, { useEffect, useState } from 'react'
import { Modal } from '../ui/modal'
import ComponentCard from '../Common/ComponentCard'
import Label from '../Form/Label'
import SelectP1 from '../Form/SelectP1'
import Button from '../ui/button/Button'
import { useForm } from "react-hook-form"
import { actualizarPropiedad, getPropiedad, registrarPropiedad } from '@/actions/PropiedadesAction'
import { BoxIcon, ChevronDownIcon } from 'lucide-react'
import InputV2 from '../Form/input/InputFieldV2'
import ButtonV1 from '../ui/button/ButtonV1'

// Opciones para el select de Terreno Apto
const DESCRIPCION_TERRENO_APTO = [
  { id: 1, nombre: "Agricultura", value: 1, label: "Agricultura" },
  { id: 2, nombre: "Ganadería", value: 2, label: "Ganadería" },
  { id: 3, nombre: "Casas de campo", value: 3, label: "Casas de campo" },
  // Agrega más opciones según sea necesario
]

type FormData = {
  id: number
  nombre: string
  descripcion?: string
  terrenoApto?: number
  precio?: number
  metrosConstruccion?: number
  metrosTerreno?: number
  alturaTerreno?: number
  habitaciones?: number
  banos?: number
  parqueaderos?: number
  direccion?: string
  geoLink?: string
  fechaPublicacion?: Date
  fechaCreacion?: Date
  fechaModificacion?: Date
  tipoPropiedadId?: number
  sectorId?: number
  estado?: number
  usuarioId?: string
  usuarioModificacionId?: string
  fotos?: File[];
}

type Props = {
  isOpen: boolean
  onClose: () => void
  itemId: number | null
  userId: string
  onSaved: () => void
}

export default function PropForm({
  isOpen,
  onClose,
  itemId,
  userId,
  onSaved,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      id: 0,
      nombre: "",
      descripcion: "",
      terrenoApto: 0,
      precio: 0,
      metrosTerreno: 0,
      direccion: "",
      geoLink: "",
      fechaPublicacion: new Date(),
      fechaCreacion: new Date(),
      tipoPropiedadId: 6,
      estado: 0,
      fotos: [],
    },
  })

  const [previews, setPreviews] = useState<string[]>([]);
  const onSubmit = async (data: FormData) => {
    data.usuarioId = userId
    data.estado = 1 // Activo por defecto
    data.tipoPropiedadId = 6 // Tipo de propiedad por defecto

    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("precio", String(data.precio));
    formData.append("descripcion", data.descripcion || "");
    formData.append("terrenoApto", String(data.terrenoApto));
    formData.append("metrosTerreno", String(data.metrosTerreno || 0));
    formData.append("alturaTerreno", String(data.alturaTerreno || 0));
    formData.append("direccion", data.direccion || "");
    formData.append("geoLink", data.geoLink || "");
    formData.append("usuarioId", data.usuarioId || "");

    formData.append("tipoPropiedadId", data.tipoPropiedadId.toString() || "6");
    formData.append("estado", data.estado.toString() || "1");

    if (data.fotos && data.fotos.length > 0) {
      data.fotos.forEach((file) => formData.append("fotos", file));
    }

    try {
      if (data.id) {
        await actualizarPropiedad(data.id, formData)
      } else {
        await registrarPropiedad(formData)
      }
      onSaved()
      reset()
      setPreviews([]);
    } catch (err) {
      console.error(err)
      alert("Error guardando el registro")
    }
  }

  useEffect(() => {
    if (itemId) {
      getPropiedad(itemId).then((resp) => {
        console.log("Reset form", resp.data)
        const d = resp.data
        reset({
          id: d.id,
          nombre: d.nombre,
          descripcion: d.descripcion,
          terrenoApto: d.terrenoApto,
          precio: d.precio,
          metrosConstruccion: d.metrosConstruccion,
          metrosTerreno: d.metrosTerreno,
          alturaTerreno: d.alturaTerreno,
          habitaciones: d.habitaciones,
          banos: d.banos,
          parqueaderos: d.parqueaderos,
          direccion: d.direccion,
          geoLink: d.geoLink,
          fechaPublicacion: d.fechaPublicacion,
          tipoPropiedadId: d.tipoPropiedadId,
          sectorId: d.sectorId,
          estado: d.estado,
        })

      })
    }
  }, [itemId, reset])

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
      <ComponentCard title={itemId ? "Editar Registro" : "Nuevo Registro"} className="p-4">
        <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
            <div className="space-x-3 xl:space-x-2">
              <Label>Nombre</Label>
              <InputV2 {...register("nombre", { required: true })} />
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>Precio</Label>
              <InputV2 type="number" {...register("precio", { valueAsNumber: true, min: 0 })} multiple={true} rows={4} />
            </div>
            <div className="flex flex-col lg:col-span-2">
              <Label>Descripción</Label>
              <InputV2 className="w-full" {...register("descripcion")} />
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>Terrreno Apto</Label>
              <div className="relative">
                <SelectP1
                  className="dark:bg-dark-900"
                  options={DESCRIPCION_TERRENO_APTO}
                  {...register("terrenoApto", { required: true })}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>Metros de Terreno</Label>
              <InputV2 type="number" {...register("metrosTerreno", { valueAsNumber: true })} />
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>Altura</Label>
              <InputV2 type="number" {...register("alturaTerreno", { valueAsNumber: true })} />
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>Dirección</Label>
              <InputV2 type="text" {...register("direccion")} />
            </div>
            <div className="space-x-3 xl:space-x-2">
              <Label>GeoLink</Label>
              <InputV2 type="text" {...register("geoLink")} />
            </div>
            {/*<div className="space-x-3 xl:space-x-2">
                            <Label>Categoría</Label>
                            <div className="relative">
                                <SelectV1
                                    className="dark:bg-dark-900"
                                    options={[]}
                                    {...register("categoriaId", { required: true })}
                                />
                                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                    <ChevronDownIcon />
                                </span>
                            </div>
                        </div>*/}

            {/* <div className="space-x-3 xl:space-x-2">
                            <Label>Foto</Label>
                            {watchedImg ? (
                                <FileInput onChange={handleFile} />
                            ) : (
                                <FileInputV1 onChange={handleFile} />
                            )}

                        </div>
                        <div className="space-x-3 xl:space-x-2">
                            {watchedImg && (
                                <Image src={watchedImg} alt="preview" width={50} height={50} />
                            )}
                        </div>*/}

            {/* Campo para subir imágenes */}
            <div className="space-x-3 xl:space-x-2 lg:col-span-2">
              <Label>Fotos</Label>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("fotos")}
                onChange={(e) => {
                  if (e.target.files) {
                    const filesArray = Array.from(e.target.files);
                    setPreviews(filesArray.map((file) => URL.createObjectURL(file)));
                  }
                }}
                className="border rounded p-2 w-full"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {previews.map((src, i) => (
                  <img key={i} src={src} alt={`preview ${i}`} className="w-24 h-24 object-cover rounded" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="md" variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <ButtonV1
                size="md"
                type="submit"
                variant="outline"
                startIcon={<BoxIcon />}>
                Guardar
              </ButtonV1>
            </div>
          </div>
        </form>
      </ComponentCard>
    </Modal>
  )
}
