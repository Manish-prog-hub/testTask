import { Item } from "@/types";
import Image from "next/image";
import React, { useState, useCallback, useRef, useEffect } from "react";

interface TableRowProps {
  item: Item;
  isExpanded: boolean;
  onClick: () => void;
  onUpdateTitle: (id: number, newTitle: string) => void; // by manish
}

const TableRow: React.FC<TableRowProps> = React.memo(
  ({ item, isExpanded, onClick, onUpdateTitle }) => { // by manish
    const [editable, setEditable] = useState(false); // by manish
    const [title, setTitle] = useState(item.title);// by manish
    const [expandedPrimary, setExpandedPrimary] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handlePrimaryClick = useCallback((name: string) => {
      setExpandedPrimary((prevName) => (prevName === name ? null : name));
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {// by manish
      setTitle(e.target.value);// by manish
    };// by manish

    const handleSaveClick = () => {// by manish
      setEditable(false);// by manish
      if (inputRef.current) {// by manish
        inputRef.current.blur(); // by manish
      }
      onUpdateTitle(item.id, title); // by manish
    };

    const handleEditClick = (e: React.MouseEvent) => {// by manish
      e.stopPropagation(); // by manish
      setEditable(true);// by manish
    };// by manish

    useEffect(() => { // by manish
      if (editable && inputRef.current) {// by manish
        inputRef.current.focus();// by manish
      }// by manish
    }, [editable]);// by manish

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
            className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap w-90"
          >
            <Image
              className="w-10 h-10 rounded-full"
              src={item.image}
              alt={item.title}
              width={100}
              height={100}
            />
            <input // by manish
              ref={inputRef} // by manish
              type="text" // by manish
              value={title} // by manish
              className="w-full px-5 py-2 mx-1" // by manish
              readOnly={!editable} // by manish
              onChange={handleTitleChange} // by manish
            /> 
            <div className="flex items-center gap-2 text-gray-500 font-normal text-xs">
              <p>
                {item.primary_variants.length +
                  " " +
                  item.primary_variant_name.toLowerCase() +
                  "s"}
              </p>
              <p>arrow</p>
            </div>
            <button // by manish
              className="pl-2 text-purple-500" // by manish
              onClick={(e) => { // by manish
                e.stopPropagation(); // by manish
                editable ? handleSaveClick() : handleEditClick(e); // by manish
              }} // by manish
            >
              {editable ? "Save" : "Edit"} 
            </button>
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

TableRow.displayName = "TableRow";

export default TableRow;
