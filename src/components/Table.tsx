"use client";
import React, { useState, useCallback } from "react";
import TableRow from "./TableRow";
import data from "@/data.json";
import { Item } from "@/types";

const Table: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [items, setItems] = useState<Item[]>(data); // by manish

  const handleRowClick = useCallback((id: number) => {
    setExpandedRow((prevId) => (prevId === id ? null : id));
  }, []);

  const handleUpdateTitle = (id: number, newTitle: string) => { // by manish
    setItems((prevItems) => // by manish
      prevItems.map((item) => // by manish
        item.id === id ? { ...item, title: newTitle } : item // by manish
      ) // by manish
    ); // by manish
  };// by manish

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Search bar
            </th>
            {/* <th scope="col" className="px-6 py-3">
            </th> */}
            <th scope="col" className="px-6 py-3">
              Stock
            </th>
            <th scope="col" className="px-6 py-3">
              WHS
            </th>
            <th scope="col" className="px-6 py-3">
              Discount %
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Sizes
            </th>
            <th scope="col" className="px-6 py-3">
              Inventory
            </th>
            <th scope="col" className="px-6 py-3">
              Lead Time
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Item) => (
            <TableRow
              key={item.id}
              item={item}
              isExpanded={expandedRow === item.id}
              onClick={() => handleRowClick(item.id)}
              onUpdateTitle={handleUpdateTitle} // by manish   
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
