import Image from "next/image";
import { NavBar } from "./(components)/nav-bar";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <NavBar />
      <form action={switchAuth}>
        <button>refreshAuth</button>
      </form>
    </div>
  );
}

async function switchAuth() {
  "use server";
  const jar = await cookies();
  if (Boolean(jar.get("userid"))) {
    jar.delete("userid");
  } else {
    jar.set("userid", crypto.randomUUID());
  }
  return revalidatePath("/");
}
