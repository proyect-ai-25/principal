import HeroSub from "@/components/shared/HeroSub";
import ResidentialList from "@/components/Properties/Residential";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Lista de propiedades | Cm Properties",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Propiedades en el campo"
                description="Experimente la elegancia y el confort con nuestras exclusivas villas de lujo, diseñadas para una vida sofisticada."
                badge="Propiedades"
            />
            <ResidentialList />
        </>
    );
};

export default page;