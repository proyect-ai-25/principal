import React from "react";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "../ui/table";
import Pagination from "../Tables/Pagination";
import { Propiedad } from '@/interface/propiedad';
import PropRow from "./PropRow";


type Props = {
    items: Propiedad[];
    /*categorias: ItemSelect[];
    proveedores: ItemSelect[];*/
    filters: { search: string; terrenoApto: number;/* proveedorId: number;*/ };
    onFilterChange: (key: keyof Props["filters"], value: unknown) => void;
    pageIndex: number;
    pageCount: number;
    onPageChange: (newPage: number) => void;
    onEdit: (id: number) => void;
    onDelete: () => void;
};

const DESCRIPCION_OPTS = [
    { id: "1", nombre: "Agricultura" },
    { id: "2", nombre: "Ganadería" },
    { id: "3", nombre: "Casas de campo" },
];

export default function FilteredTable({
    items,
    /* categorias,
     proveedores,*/
    filters,
    onFilterChange,
    pageIndex,
    pageCount,
    onPageChange,
    onEdit,
    onDelete,
}: Props) {
    /* const totalPlus = items
         .filter((t) => t.categoriaId === 1)
         .reduce((s, t) => s + t.valor, 0);
     const totalMinus = items
         .filter((t) => t.categoriaId !== 1)
         .reduce((s, t) => s + t.valor, 0);*/

    return (
        <>
            <Table className="table-fixed w-full border-collapse" >
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>
                        <TableCell
                            isHeader
                            className="w-[450px] py-3 pr-4 font-medium text-gray-500 text-start text-theme-xs
                             dark:text-gray-400">
                            Nombre
                        </TableCell>
                        <TableCell
                            isHeader
                            className="w-[150px] py-3 pr-4 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                            Terreno Apto
                            <select
                                name="terrenoApto"
                                value={filters.terrenoApto}
                                onChange={(e) => {
                                    onFilterChange("terrenoApto", e.target.value);
                                    console.log(e.target.value);
                                }}
                                className="mr-2"
                            >
                                <option value="">Seleccione</option>
                                {DESCRIPCION_OPTS.map((opt) => (
                                    <option key={opt.id} value={opt.id}>{opt.nombre}</option>
                                ))}
                            </select>
                        </TableCell>

                        <TableCell
                            isHeader
                            className="w-[350px] py-3 pr-4 font-medium text-gray-500 text-start
                             text-theme-xs dark:text-gray-400">
                            Ubicación
                        </TableCell>



                        <TableCell isHeader
                            className="py-3 font-medium text-gray-500 text-start text-theme-xs
                             dark:text-gray-400">
                            Datos Propiedad
                        </TableCell>

                        <TableCell isHeader
                            className="py-3 font-medium text-gray-500 text-center text-theme-xs
                             dark:text-gray-400">Opciones</TableCell>
                    </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {items.map((t) => (
                        <PropRow
                            key={t.id}
                            item={t}
                            onEdit={onEdit}
                            onDeleteSuccess={onDelete}
                        />
                    ))}
                </TableBody>
            </Table>
            <Pagination
                currentPage={pageIndex}
                totalPages={pageCount}
                onPageChange={onPageChange}
            />
        </>
    );
}
