import { FiBell, FiCalendar } from "react-icons/fi";

export default function Topbar() {
  const date = new Date();
  const formatted = date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <header className="w-full flex justify-between items-center px-10 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" className="w-10" />
        <h1 className="font-bold text-xl">DREAMY SOFTWARE</h1>
      </div>

      {/* Icons + Date */}
      <div className="flex items-center gap-6">
        <FiBell size={22} className="text-gray-600 cursor-pointer" />
        <FiCalendar size={22} className="text-gray-600 cursor-pointer" />

        <span className="text-gray-700 font-medium">{formatted}</span>
      </div>
    </header>
  );
}
