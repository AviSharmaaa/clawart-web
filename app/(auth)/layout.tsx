"use client";
import React, { useEffect, useState } from "react";
import auth from "../services/auth";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [session, setSession] = useState<any>(null);
  const router = useRouter()

  async function fetchSession() {
    const _session = await auth.getUserSession();
    if (!_session) router.replace('/');
    setSession(_session);
  }

  useEffect(() => {
    if (!session) {
        fetchSession();
    }
  }, []);

  return children;
}
