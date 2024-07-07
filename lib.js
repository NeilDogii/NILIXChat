'use server'
import { SignJWT, jwtVerify } from "jose";
import { Passero_One } from "next/font/google";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';
require("dotenv").config();
const secretKey = "test123"; //PROCESS.ENV.SECRET || 
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(key);
}

export async function decrypt(input) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
export async function fetchData(formData){
  const user = { email: formData.get("email"), password: formData.get("password")};
  return user;
}

export async function fetchDataRegister(formData){
  const user = { name: formData.get("name"), email: formData.get("email"), password: formData.get("password")};
  return user;
}

export async function login(user) {
  const expires = new Date(Date.now() + 1000 * 60 * 10);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });
}



export async function logout() {

  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 1000 * 60 * 10);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}