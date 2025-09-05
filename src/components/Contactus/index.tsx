"use client"
import { getContactos } from '@/actions/ContactoAction'
import { Contacto } from '@/interface/contacto'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';
import Pagination from '../Tables/Pagination';

const ListaContactos: React.FC = () => {


    const [requestItem, setRequestItem] = useState({
        pageIndex: 1,
        pageSize: 10,
        sort: "",
        search: "",
        estado: "1",
    });

    const [paginadorItem, setPaginadorItem] = useState({
        cont: 0,
        pageIndex: 0,
        pageSize: 0,
        pageCount: 0,
        data: [] as Contacto[],
    });

    const handleChangePaginator = (value: number) => {
        setRequestItem((anterior) => ({
            ...anterior,
            pageIndex: value,
        }));
    };
    useEffect(() => {
        const getListaItems = async () => {
            const resp = await getContactos(requestItem);
            setPaginadorItem(resp.data);
            console.log("resp1", resp.data);
        };
        getListaItems();
    }, [])

    return (
        <div>
            <Table>
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                    <TableRow>                        
                        <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Nombre</TableCell>
                        <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Email</TableCell>
                        <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Teléfono</TableCell>
                        <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Mensaje</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginadorItem.data.map((contacto) => (
                        <TableRow key={contacto.id}>
                            <TableCell>{contacto.nombre}</TableCell>
                            <TableCell>{contacto.email}</TableCell>
                            <TableCell>{contacto.telefono}</TableCell>
                            <TableCell>{contacto.mensaje}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className='mt-4'>
                <Pagination
                    totalPages={paginadorItem.pageCount}
                    currentPage={paginadorItem.pageIndex}
                    onPageChange={handleChangePaginator}
                />
            </div>
        </div>
    )

}

export default ListaContactos
