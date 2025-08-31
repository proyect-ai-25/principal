"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/BrandLogo/Logo";
import { useContext, useState } from "react";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import config from "../../../../config";
import { registrarUsuario } from "../../../actions/UsuarioAction"


const SignUp = ({ signUpOpen }: { signUpOpen?: any }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);
    const data = new FormData(e.currentTarget);
    const value = Object.fromEntries(data.entries());
    const finalData = { ...value };


    console.log('register', finalData);
    registrarUsuario(finalData).then(() => {
      router.push("/properties");
    });

    /*fetch(config.apiUrl + "/api/usuario/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Registrado exitosamente");
        setLoading(false);
        //router.push("/properties");
            console.log('register1', JSON.stringify(finalData));
      })
      .catch((err) => {
        toast.error(err.message);
            console.log('err.message', err.message);
        setLoading(false);
      });
    setTimeout(() => {
      signUpOpen(false);
    }, 1200);
    authDialog?.setIsUserRegistered(true);

    setTimeout(() => {
      authDialog?.setIsUserRegistered(false);
    }, 1100);*/
  };

  return (
    <>
      <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>

      <SocialSignUp />

      <span className="z-1 relative my-8 block text-center">
        <span className="-z-1 absolute left-0 top-1/2 block h-px w-full bg-black/10 dark:bg-white/20"></span>
        <span className="text-body-secondary relative z-10 inline-block bg-white px-3 text-base dark:bg-black">
          O
        </span>
      </span>

      <form onSubmit={handleSubmit}>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            required
            className="w-full rounded-md border border-black/10 dark:border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            required
            className="w-full rounded-md border border-black/10 dark:border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            className="w-full rounded-md border border-black/10 dark:border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-[22px]">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="w-full rounded-md border border-black/10 dark:border-white/20 border-solid bg-transparent px-5 py-3 text-base text-dark outline-none transition placeholder:text-gray-300 focus:border-primary focus-visible:shadow-none dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mb-9">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center rounded-md bg-primary px-5 py-3 text-base text-white transition duration-300 ease-in-out hover:!bg-darkprimary dark:hover:!bg-darkprimary"
          >
            Registrarse
          </button>
        </div>
      </form>

      <p className="text-center mb-4 text-base">
        Al crear una cuenta, acepta nuestra Política de{" "}
        <Link href="/" className="text-primary hover:underline">
          Privacidad
        </Link>{" "}
        y{" "}
        <Link href="/" className="text-primary hover:underline">
          términos de servicio.
        </Link>
      </p>

      <p className="text-center text-base">
        ¿Ya tienes una cuenta?
        <Link
          href="/"
          className="pl-2 text-primary hover:bg-darkprimary hover:underline"
        >
          Iniciar sesión
        </Link>
      </p>
    </>
  );
};

export default SignUp;
