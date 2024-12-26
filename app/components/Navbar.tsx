import { auth, signOut, signIn } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="font-geist-sans px-5 py-3 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/Logo.png" alt="" width={100} height={70} />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">LogOut</button>
              </form>

              <Link href={`/user/${session}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">LogIn</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
