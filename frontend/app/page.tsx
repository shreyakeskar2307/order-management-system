export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Order Management System
      </h1>

      <div className="grid gap-4 w-72">

        <a
          href="/create-order"
          className="bg-blue-500 text-white p-4 rounded-xl text-center shadow hover:bg-blue-600"
        >
          Create Order
        </a>

        <a
          href="/orders"
          className="bg-green-500 text-white p-4 rounded-xl text-center shadow hover:bg-green-600"
        >
          View Orders
        </a>

        <a
          href="/update-status"
          className="bg-purple-500 text-white p-4 rounded-xl text-center shadow hover:bg-purple-600"
        >
          Update Status
        </a>

      </div>
    </div>
  );
}