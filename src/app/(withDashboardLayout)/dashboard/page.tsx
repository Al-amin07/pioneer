export default function DashboardPage() {
  return (
    <div className="">
      {/* Header */}
      <header className=" mx-auto mb-10">
        <h1 className="text-4xl font-bold text-[#5272FF]">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your tasks, track your progress, and stay organized.
        </p>
      </header>

      {/* Overview Cards */}
      <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-[#5272FF]">
          <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
          <p className="text-3xl font-bold mt-2 text-[#5272FF]">18</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">10</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border-l-4 border-amber-500">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold mt-2 text-amber-500">8</p>
        </div>
      </section>

    
    </div>
  );
}
