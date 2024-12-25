"use server";

import { runningOnEdge } from "./utils";


export async function getUserData(){
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {name:"john", age: 30, ranOnEdge: runningOnEdge()}
}


