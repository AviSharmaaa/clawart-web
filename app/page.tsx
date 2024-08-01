"use client";
import Image from "next/image";
import auth from "./services/auth";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Image src="/clawart.svg" width={350} height={350} alt="Clawart logo" />
      <p className="text-center max-w-[80%]">
        Welcome to Purrfect Doodles! Your one-stop destination for adorable
        cat-themed doodles. Dive into a world of creativity and cuteness, where
        every doodle brings a smile to your face. Let's get started!
      </p>
      <div className="mt-14">
        <button
          className="flex bg-[#4db6ac] hover:bg-[#00a884] text-white font-bold py-2 px-4 rounded-full gap-2"
          onClick={async () => {
            await auth.loginViaGoogle();
          }}
        >
          <Image src="/google.svg" width={25} height={25} alt="Github logo" />{" "}
          Sign In via Google
        </button>
        <div className="mt-10"></div>
        <button
          className="flex bg-[#4db6ac] hover:bg-[#00a884] text-white font-bold py-2 px-4 rounded-full gap-2"
          onClick={async () => {
            await auth.loginViaGithub();
          }}
        >
          <Image src="/github.svg" width={25} height={25} alt="Github logo" />{" "}
          Sign In via Github
        </button>
      </div>
    </main>
  );
}
