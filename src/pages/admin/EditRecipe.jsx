import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { useNavigate, useParams } from "react-router-dom"
import { CATEGORIES } from "../../constants/categories"

function EditRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRecipe() {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        setError(error.message)
      } else {
        setTitle(data.title)
        setCategory(data.category)
        setImageUrl(data.image_url || "")
        setIngredients(data.ingredients)
        setInstructions(data.instructions)
        setCookingTime(data.cooking_time)
      }

      setLoading(false)
    }

    fetchRecipe()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("recipes")
      .update({
        title,
        category,
        image_url: imageUrl,
        ingredients,
        instructions,
        cooking_time: Number(cookingTime),
      })
      .eq("id", id)

    if (error) {
      setError(error.message)
    } else {
      navigate("/admin/recipes")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Loading recipe...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1">Title</label>
            <input
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Image URL</label>
            <input
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Ingredients</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              rows="5"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Instructions</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              rows="6"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Cooking Time (minutes)</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
              value={cookingTime}
              onChange={(e) => setCookingTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
          >
            Update Recipe
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditRecipe
