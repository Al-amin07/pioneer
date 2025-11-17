import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { Search, ChevronDown, Check, ArrowUpDown } from "lucide-react";
interface FilterOption {
  id: string;
  label: string;
  category: string;
}
interface CategorizedOptions {
  [key: string]: FilterOption[];
}
const filterOptions: FilterOption[] = [
  { id: "today", label: "Deadline Today", category: "Date" },
  { id: "5days", label: "Expires in 5 days", category: "Date" },
  { id: "10days", label: "Expires in 10 days", category: "Date" },
  { id: "30days", label: "Expires in 30 days", category: "Date" },
];

const FilterDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(
    new Set()
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside as unknown as EventListener
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as unknown as EventListener
      );
    };
  }, []);
  const toggleFilter = (id: string) => {
    setSelectedFilters((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isSelected = (id: string): boolean => selectedFilters.has(id);
  const categorizedOptions: CategorizedOptions = filterOptions.reduce(
    (acc: CategorizedOptions, option: FilterOption) => {
      if (!acc[option.category]) {
        acc[option.category] = [];
      }
      acc[option.category].push(option);
      return acc;
    },
    {} as CategorizedOptions
  );

  const activeFilterCount: number = selectedFilters.size;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        className="inline-flex justify-center items-center w-full rounded border border-gray-300 shadow-sm px-4 py-[9px] cursor-pointer bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
      
        Filter By
        <ArrowUpDown size={20} className="ml-2"/>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-72 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
          // Adding a subtle transition for appearance
          style={{ transition: "opacity 0.2s, transform 0.2s" }}
        >
          <div className="p-4 space-y-4">
            {/* Filter Options (Search Input Area has been removed) */}
            <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
              {Object.keys(categorizedOptions).map((category: string) => (
                <div key={category} className="py-2">
                  {/* Category Header (e.g., "Date") */}
                  <h3 className="px-3 pt-1 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {category}
                  </h3>

                  {/* List of Checkbox Options */}
                  <ul className="mt-1 space-y-1">
                    {categorizedOptions[category].map(
                      (option: FilterOption) => (
                        <li key={option.id}>
                          <label
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-150 ease-in-out 
                                      ${
                                        isSelected(option.id)
                                          ? "bg-indigo-50 text-indigo-700 font-medium"
                                          : "hover:bg-gray-50 text-gray-800"
                                      }`}
                            onClick={() => toggleFilter(option.id)}
                          >
                            {/* Custom Checkbox (mimicking iOS-style checkbox) */}
                            <div
                              className={`shrink-0 w-5 h-5 border-2 rounded mr-3 flex items-center justify-center 
                                           ${
                                             isSelected(option.id)
                                               ? "border-indigo-500 bg-indigo-500"
                                               : "border-gray-300 bg-white"
                                           }`}
                            >
                              {isSelected(option.id) && (
                                <Check size={12} className="text-white" />
                              )}
                            </div>

                            {/* Label Text */}
                            <span className="text-sm">{option.label}</span>
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
