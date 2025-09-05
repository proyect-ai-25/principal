import React from "react";
import { Propiedad } from '@/interface/propiedad';
import Image from "next/image";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { TableCell, TableRow } from "../ui/table";
import { actualizarPropiedad, getPropiedad } from "@/actions/PropiedadesAction";

type Props = {
  item: Propiedad;
  onEdit: (id: number) => void;
  onDeleteSuccess: () => void;
};

export default function PropRow({ item, onEdit, onDeleteSuccess }: Props) {
  const handleActivate = async () => {
    await actualizarPropiedad(item.id, { ...item, estado: 1 });
    onDeleteSuccess();
  };

  const handleDelete = async () => {
    const resp = await getPropiedad(item.id);
    await actualizarPropiedad(item.id, { ...resp.data, estado: 0 });
    onDeleteSuccess();
  };

  return (
    <TableRow>
      <TableCell className="w-[250px] py-3 pr-4 text-gray-500 text-theme-sm dark:text-gray-400">
        <div className="flex items-center gap-3">
          <div>
            <strong>{item.nombre}</strong>
            <div className="text-sm text-gray-500 text-justify">{item.descripcion}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3 pr-4 text-gray-500 text-theme-sm dark:text-gray-400">{item.terrenoAptoNombre}</TableCell>
      <TableCell className="py-3 pr-4 text-gray-500 text-theme-sm dark:text-gray-400">
        <div>
          {item.direccion}
          <div className="text-sm text-gray-500 break-words">
            GeoUbicación:<a href={item.geoLink}>{item.geoLink}</a>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-3 pr-4 text-gray-500 text-theme-sm dark:text-gray-400">
       <div className="text-sm text-gray-500">Precio: {item.precio.toLocaleString("es-ES", {
          style: "currency",
          currency: "USD",
        })}</div>
        <div className="text-sm text-gray-500">Metros: {item.metrosTerreno}</div>
        <div className="text-sm text-gray-500">Altura: {item.alturaTerreno}</div>
      </TableCell>
      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400 text-center">
        {item.estado === 0 ? (
          <button onClick={handleActivate} title="Activar">
            <AiOutlineCheckCircle size={24} />
          </button>
        ) : (
          <>
            <button onClick={() => onEdit(item.id)} title="Editar">
              <AiFillEdit size={24} />
            </button>
            <button onClick={handleDelete} title="Eliminar">
              <AiFillDelete size={24} className="text-red-500" />
            </button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
