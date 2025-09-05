"use client";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import useProperties from "@/hooks/properties/useProperties";        // paginación + filtros
//import useCatalogos from "@/hooks/items/useCatalogos";
import FilteredTable from "./FilteredTable";
import PropForm from "./PropForm";
//import TodoForm from "./TodoForm";

const PropertyManagement: React.FC = () => {
    interface SessionUser {
        id?: string | number;
        nombre?: string | number;
        [key: string]: unknown;
    }

    const { data: session } = useSession();
    const user = session?.user as SessionUser | undefined;
    const localId = +(user?.local ?? 0);
    const userId = String(user?.id ?? "");
    const {
        items,
        pageIndex,
        pageCount,
        filters,
        setFilter,
        setSearch,
        setPageIndex,
        loading,
        refetch,
    } = useProperties({ local: localId });

    //const { categorias, proveedores } = useCatalogos();

    const [modalOpen, setModalOpen] = React.useState(false);
    const [editItemId, setEditItemId] = React.useState<number | null>(null);


    const onNew = () => {
        setEditItemId(null);
        setModalOpen(true);
    };

    const onEdit = (id: number) => {
        setEditItemId(id);
        setModalOpen(true);
    };

    const onCloseModal = () => {
        setModalOpen(false);
        setEditItemId(null);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Listado de Registros
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                            <svg
                                className="fill-gray-500 dark:fill-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                    fill=""
                                />
                            </svg>
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Buscar"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            autoComplete="off"
                            autoFocus
                            value=""
                            onFocus={() => {
                                if (inputRef.current) {
                                    inputRef.current.select();
                                }
                            }}
                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                        />
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        onClick={onNew}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nuevo
                    </button>
                    <button className="inline-flex items-center gap-2 rounded-lg border
                                    border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium
                                    text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800
                                    dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400
                                    dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                        onClick={() => {
                            setSearch("");
                            /* setFilter("categoriaId", 0);
                             setFilter("proveedorId", 0);*/
                        }}>
                        Limpiar Filtros
                    </button>
                </div>
            </div>
            <div className="max-w-full overflow-x-auto">
                <FilteredTable
                    items={items}
                    /* categorias={categorias.map(c => ({ value: c.id, label: c.nombre }))}
                     proveedores={proveedores.map(p => ({ value: p.id, label: p.nombre }))}*/
                    filters={filters}
                    onFilterChange={(k: "categoriaId" | "proveedorId" | "search", v: unknown) => {
                        if (k === "search") {
                            setSearch(v as string);
                            setPageIndex(1);
                        } else {
                            setFilter(k, +(v as string));
                            setPageIndex(1);
                        }
                    }}
                    pageIndex={pageIndex}
                    pageCount={pageCount}
                    onPageChange={(newPage) => {
                        setPageIndex(newPage);
                    }}
                    onEdit={onEdit}
                    onDelete={() => refetch()}
                />
            </div>
            {modalOpen && (
                <PropForm
                    isOpen
                    onClose={onCloseModal}
                    todoId={editItemId}
                    userId={userId}
                    localId={localId}
                    onSaved={() => {
                        onCloseModal();
                        refetch();
                    }}
                /*categorias={categorias}
                proveedores={proveedores}*/
                />
            )}
        </div >
    );
};
export default PropertyManagement;
