import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { useNavigate } from "react-router-dom"

function AdminRecipes() {
  const navigate = useNavigate()

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/admin/login")
  }

  // fetch recipes (UNCHANGED)
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

  // delete modal
  const confirmDelete = (recipe) => {
    setSelectedRecipe(recipe)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    const { error } = await supabase
      .from("recipes")
      .delete()
      .eq("id", selectedRecipe.id)

    if (!error) {
      setRecipes((prev) => prev.filter((r) => r.id !== selectedRecipe.id))
    } else {
      setError(error.message)
    }

    setShowDeleteModal(false)
    setSelectedRecipe(null)
  }

  // stats
  const totalRecipes = recipes.length
  const categoriesCount = new Set(recipes.map((r) => r.category)).size
  const avgTime =
    totalRecipes === 0
      ? 0
      : Math.round(
          recipes.reduce((sum, r) => sum + (r.cooking_time || 0), 0) /
            totalRecipes
        )

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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Recipes</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/recipes/add")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Add Recipe
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Total Recipes</p>
          <p className="text-3xl font-bold">{totalRecipes}</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Categories</p>
          <p className="text-3xl font-bold">{categoriesCount}</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <p className="text-gray-400 text-sm">Avg Cooking Time</p>
          <p className="text-3xl font-bold">{avgTime} min</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-4 border-b border-slate-700">Title</th>
              <th className="p-4 border-b border-slate-700">Category</th>
              <th className="p-4 border-b border-slate-700">Time</th>
              <th className="p-4 border-b border-slate-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipes.map((r) => (
              <tr
                key={r.id}
                className="text-center hover:bg-slate-800 transition"
              >
                <td className="p-4 border-b border-slate-800">{r.title}</td>
                <td className="p-4 border-b border-slate-800">{r.category}</td>
                <td className="p-4 border-b border-slate-800">
                  {r.cooking_time} min
                </td>
                <td className="p-4 border-b border-slate-800 space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/recipes/edit/${r.id}`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => confirmDelete(r)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-slate-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold text-red-400 mb-3">
              Delete Recipe
            </h2>

            <p className="text-gray-300 mb-6">
              Delete{" "}
              <span className="font-semibold text-white">
                {selectedRecipe.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRecipes
