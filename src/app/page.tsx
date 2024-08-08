"use client"

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Table from "@/components/Table";
import data from "@/data.json";
import { Item } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Item[]>(data);

  // Load data from session storage on mount
  useEffect(() => {
    const storedQuery = sessionStorage.getItem("searchQuery");
    const storedData = sessionStorage.getItem("filteredData");

    if (storedQuery) {
      setSearchQuery(storedQuery);
    }

    if (storedData) {
      setFilteredData(JSON.parse(storedData));
    } else {
      setFilteredData(data); // Ensure that filteredData is set to initial data if session storage is empty
    }
  }, []);

  // Update session storage whenever searchQuery or filteredData changes
  useEffect(() => {
    sessionStorage.setItem("searchQuery", searchQuery);
    sessionStorage.setItem("filteredData", JSON.stringify(filteredData));
  }, [searchQuery, filteredData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredData(
      data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Navbar onSearch={handleSearch} />
      <Table data={filteredData} />
    </main>
  );
}
