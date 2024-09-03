"use client";
import database from "@/app/services/database";
import React, { useEffect } from "react";

export default function Home() {
  const getCanvases = async () => {
    await database.getCanvases();
  };

  useEffect(() => {
    getCanvases();
  }, []);
  return <div>Home</div>;
}
