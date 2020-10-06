import Head from "next/head";
import axios from "axios";
import Layout from "../components/hoc/Layout";
import Posts from "../components/Posts/Posts";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Router from "next/router";
import { signin, signout, useSession } from "next-auth/client";
import Link from "next/link";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div>
      <p>
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signin}>Sign in</button>
          </>
        )}
        {session && (
          <>
            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-8 w-8 rounded-full"
            />
            <br />
            Signed in as {session.user.email} <br />
            <button onClick={signout}>Sign out</button>
            <Link href="/accueil">
              <a>Accueil</a>
            </Link>
          </>
        )}
      </p>
    </div>
  );
}