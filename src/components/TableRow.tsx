import { Item } from "@/types";
import Image from "next/image";
import React, { useState, useCallback } from "react";

interface TableRowProps {
  item: Item;
  isExpanded: boolean;
  onClick: () => void;
}

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ item, isExpanded, onClick }) => {
    const [expandedPrimary, setExpandedPrimary] = useState<string | null>(null);

    const handlePrimaryClick = useCallback((name: string) => {
      setExpandedPrimary((prevName) => (prevName === name ? null : name));
    }, []);

    const renderPrimaryVariantRows = item.primary_variants.map((variant) => (
      <React.Fragment key={variant.name}>
        <tr
          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => handlePrimaryClick(variant.name)}
        >
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ml-10"
          >
            <div className="text-base font-semibold px-3 truncate">
              {variant.name}
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-normal text-xs">
              <p>
                {variant.secondary_variants.length +
                  " " +
                  item.secondary_variant_name.toLowerCase() +
                  "s"}
              </p>
              <p>arrow</p>
            </div>
          </th>
          <td className="px-6 py-4">{variant.inventory}</td>
          <td className="px-6 py-4">${variant.price}</td>
          <td className="px-6 py-4">{variant.discountPercentage}%</td>
          <td className="px-6 py-4">{variant.discountPercentage}%</td>
          <td className="px-6 py-4">sizes</td>
          <td className="px-6 py-4">{variant.inventory}</td>
          <td className="px-6 py-4">{item.leadTime}</td>
        </tr>

        {expandedPrimary === variant.name &&
          variant.secondary_variants.map((subVariant) => (
            <tr
              key={subVariant.name}
              className="bg-white border-b hover:bg-gray-50 cursor-pointer"
            >
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ml-20"
              >
                <div className="text-base font-semibold px-3 truncate">
                  {subVariant.name}
                </div>
              </th>
              <td className="px-6 py-4">{subVariant.inventory}</td>
              <td className="px-6 py-4">${subVariant.price}</td>
              <td className="px-6 py-4">{subVariant.discountPercentage}%</td>
              <td className="px-6 py-4">{subVariant.discountPercentage}%</td>
              <td className="px-6 py-4">sizes</td>
              <td className="px-6 py-4">{subVariant.inventory}</td>
              <td className="px-6 py-4">{item.leadTime}</td>
            </tr>
          ))}
      </React.Fragment>
    ));

    return (
      <>
        <tr
          key={item.id}
          className="bg-white border-b hover:bg-gray-50 cursor-pointer"
          onClick={onClick}
        >
          <th
            scope="row"
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
          >
            <Image
              className="w-10 h-10 rounded-full"
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
            />
            <div className="text-base font-semibold px-3 truncate max-w-xs">
              {item.title}
            </div>
            <div className="flex items-center gap-2 text-gray-500 font-normal text-xs">
              <p>
                {item.primary_variants.length +
                  " " +
                  item.primary_variant_name.toLowerCase() +
                  "s"}
              </p>
              <p>arrow</p>
            </div>
          </th>
          <td className="px-6 py-4">{item.inventory}</td>
          <td className="px-6 py-4">${item.price}</td>
          <td className="px-6 py-4">{item.discountPercentage}%</td>
          <td className="px-6 py-4">{item.primary_variant_name}</td>
          <td className="px-6 py-4">{item.secondary_variant_name}</td>
          <td className="px-6 py-4">{item.inventory}</td>
          <td className="px-6 py-4">{item.leadTime}</td>
        </tr>
        {isExpanded && renderPrimaryVariantRows}
      </>
    );
  }
);

// Set display name
TableRow.displayName = "TableRow";

export default TableRow;
