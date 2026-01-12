import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { supabase } from "../supabase"

function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipe() {
      const { data } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single()

      setRecipe(data)
      setLoading(false)
    }

    fetchRecipe()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p>Recipe not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:underline"
        >
          ← Back to recipes
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{recipe.title}</h1>

        {/* Image */}
        <img
          src={
            recipe.image_url ||
            "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={recipe.title}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />

        {/* Meta Info */}
        <div className="flex flex-wrap gap-6 text-gray-300 mb-6">
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p>
            <strong>Cooking Time:</strong> {recipe.cooking_time} minutes
          </p>
        </div>

        <hr className="border-gray-700 mb-6" />

        {/* Ingredients */}
        <h2 className="text-2xl font-semibold mb-4">🧾 Ingredients</h2>

        <ul className="list-disc list-inside space-y-1 text-gray-200 mb-8">
          {recipe.ingredients
            .split("\n")
            .map((line, index) => (
              <li key={index}>{line}</li>
            ))}
        </ul>

        {/* Instructions */}
        <h2 className="text-2xl font-semibold mb-4">👩‍🍳 Instructions</h2>

        <p className="text-gray-200 leading-relaxed whitespace-pre-line">
          {recipe.instructions}
        </p>
      </div>
    </div>
  )
}

export default RecipeDetail
