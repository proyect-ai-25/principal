import { useState, useEffect } from "react";
import { getPropiedads } from "@/actions/PropiedadesAction";
import type { Propiedad } from "@/interface/propiedad";
import React from "react";

interface FilterParams {
  nombre: string;
  estado?: number;
  terrenoApto?: number;
}

const DEFAULT_PARAMS = {
  pageIndex: 1,
  pageSize: 20,
  search: "",
  terrenoApto: 0,
  estado: 1,
};

export default function useTodos(extra: FilterParams) {
  const [items, setItems] = useState<Propiedad[]>([]);
  const [pageIndex, setPageIndex] = useState(DEFAULT_PARAMS.pageIndex);
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState(DEFAULT_PARAMS);
  const [loading, setLoading] = useState(false);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    const req = { ...filters, pageIndex };
    const resp = await getPropiedads(req);
    setItems(resp.data.data);
    setPageCount(resp.data.pageCount);
    setLoading(false);
  }, [filters, pageIndex]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  const setSearch = (s: string) =>
    setFilters((prev) => ({ ...prev, search: s }));

  const setFilter = (key: "nombre" | "terrenoApto", value: number) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return {
    items,
    pageIndex,
    pageCount,
    filters,
    loading,
    setPageIndex,
    setSearch,
    setFilter,
    refetch,
  };
}
