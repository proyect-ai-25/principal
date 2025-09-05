
export interface Propiedad {
  id: number
  nombre: string
  descripcion: string
  terrenoApto: number
  terrenoAptoNombre: string
  precio: number
  metrosConstruccion: number
  metrosTerreno: number
  alturaTerreno: number
  habitaciones: number
  banos: number
  parqueaderos: number
  direccion: string
  geoLink: string
  fechaPublicacion: Date
  tipoPropiedadId: number
  sectorId: number
  estado: number
}