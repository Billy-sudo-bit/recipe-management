import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { useNavigate } from "react-router-dom"

function AdminRecipes() {
  const navigate = useNavigate()

  const handleLogout = async () => {
  await supabase.auth.signOut()
  navigate("/admin/login")
}
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .order("title")

      if (error) {
        setError(error.message)
      } else {
        setRecipes(data || [])
      }

      setLoading(false)
    }

    fetchRecipes()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return

    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", id)

    if (error) {
      setError(error.message)
    } else {
      setRecipes((prev) => prev.filter((r) => r.id !== id))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading recipes...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-red-500 p-10">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Recipes</h1>

        <button
          onClick={() => navigate("/admin/recipes/add")}
          className="bg-green-600 px-4 py-2 rounded"
        >   
          Add Recipe
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
        >
          Logout
        </button>
      </div>

      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Time</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {recipes.map((r) => (
            <tr key={r.id} className="text-center">
              <td className="p-3 border">{r.title}</td>
              <td className="p-3 border">{r.category}</td>
              <td className="p-3 border">{r.cooking_time} min</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() =>
                    navigate(`/admin/recipes/edit/${r.id}`)
                  }
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminRecipes
