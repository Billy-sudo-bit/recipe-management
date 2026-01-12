import { Link } from "react-router-dom"

export default function UserNavbar() {
  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">🍽 Recipe App</h1>

      <div className="space-x-6">
        <Link to="/recipes" className="hover:text-blue-400">Recipes</Link>
        <Link to="/about" className="hover:text-blue-400">About</Link>
        <Link to="/services" className="hover:text-blue-400">Services</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        <Link to="/admin/login" className="text-yellow-400 hover:underline">
          Admin
        </Link>
      </div>
    </nav>
  )
}
