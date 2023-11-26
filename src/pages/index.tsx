import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Header from "~/componets/header";
import ProfileCarousel from "~/componets/profileCarousel";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sleepingtree&apos;s Season of Discvery Prep</title>
        <meta
          name="description"
          content="Sign up to get ready For Season of discorvery"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#63536f] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Sleepingtree&apos;s{" "}
            <span className="text-[hsl(62,65%,70%)]">Season of Discovery </span>{" "}
            Prep
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              onClick={() => void signIn()}
            >
              <h3 className="text-2xl font-bold">Step one Login →</h3>
              <div className="text-lg">
                you will need to have a discord account
              </div>
            </div>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/profile/edit"
            >
              <h3 className="text-2xl font-bold">Second Step →</h3>
              <div className="text-lg">Create/edit your profile</div>
            </Link>
          </div>
          <div className="flex w-full flex-row flex-wrap items-start gap-2">
            <ProfileCarousel />
          </div>
        </div>
      </main>
    </>
  );
}
