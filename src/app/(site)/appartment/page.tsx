import HeroSub from "@/components/shared/HeroSub";
import Appartment from "@/components/Properties/Appartment";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Lista de Propiedades | Cm Properties",
};

const page = () => {
    return (
        <>
            <HeroSub
                title="Propiedades en la ciudad"
                description="Experimente la elegancia y el confort con nuestras exclusivas villas de lujo, diseñadas para una vida sofisticada."
                badge="Propiedades"
            />
            <Appartment />
        </>
    );
};

export default page;