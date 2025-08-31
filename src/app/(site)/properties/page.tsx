import HeroSub from "@/components/shared/HeroSub";
import PropertiesListing from "@/components/Properties/PropertyList";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Lista de propiedades | Cm Properties",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Descubra casas diseñadas con inspiración."
                description="Experimente la elegancia y el confort con nuestras exclusivas villas de lujo, diseñadas para una vida sofisticada."
                badge="Propiedades"
            />
            <PropertiesListing />
        </>
    );
};

export default page;
