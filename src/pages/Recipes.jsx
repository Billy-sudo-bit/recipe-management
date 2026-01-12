import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import { CATEGORIES } from "../constants/categories"
import { useNavigate } from "react-router-dom"

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchRecipes() {
      let query = supabase.from("recipes").select("*")

      if (selectedCategory) {
        query = query.eq("category", selectedCategory)
      }

      if (search.trim()) {
        query = query.ilike("title", `%${search}%`)
      }

      const { data } = await query
      setRecipes(data || [])
    }

    fetchRecipes()
  }, [selectedCategory, search])

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-6">🍽 Recipes</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-6 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedCategory === ""
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm ${
                selectedCategory === cat
                  ? "bg-blue-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        {recipes.length === 0 ? (
          <p className="text-gray-400">No recipes found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
                className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <img
                  src={
                    recipe.image_url ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">
                    {recipe.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Category: {recipe.category}
                  </p>

                  <p className="text-sm text-gray-400">
                    ⏱ {recipe.cooking_time} minutes
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <footer className="text-center text-gray-400 mt-20">
          <button
              onClick={() => navigate("/admin/login")}
              className="text-sm hover:text-white underline"
          >
          Admin Login
          </button>
        </footer>

      </div>
    </div>
  )
}

export default Recipes
