import { cookies } from "next/headers";
import { getUserData } from "../(stuff)/get-user-data";
import { Suspense } from "react";
import { runningOnEdge } from "../(stuff)/utils";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

export async function NavBar() {
  const renderedOnEdge = runningOnEdge();
  const jar = await cookies();
  if (jar.get("userid")) {
    return (
      <div className="flex">
        <Suspense fallback={<p>loading...</p>}>
          <UserDataTile />
        </Suspense>
        <a>Link 1 </a>
        <a>Link 2 </a>
        <a>Link 3 </a>
        <a>Link 4 </a>
        <p>rendered on edge? {String(renderedOnEdge)}</p>
      </div>
    );
  }
  return (
    <div>
      <p>rendered on edge? {String(renderedOnEdge)}</p>
      <p>LOGIN</p>
    </div>
  );
}

async function UserDataTile() {
  const userData = await getUserData();
  return (
    <p>
      NAME = {userData.name} age = {userData.age}, (dev) data on edge?{" "}
      {String(userData.ranOnEdge)}
    </p>
  );
}
