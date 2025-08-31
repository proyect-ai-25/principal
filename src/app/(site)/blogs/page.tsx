import BlogList from "@/components/Blog";
import HeroSub from "@/components/shared/HeroSub";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:
        "Blog Grids | Homely ",
};

const Blog = () => {
    return (
        <>
            <HeroSub
                title="Perspectivas inmobiliarias."
                description="Manténgase a la vanguardia en el mercado inmobiliario con asesoramiento y actualizaciones de expertos."
                badge="Blog"
            />
            <BlogList />
        </>
    );
};

export default Blog;
