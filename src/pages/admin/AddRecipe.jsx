import { useState } from "react"
import { supabase } from "../../supabase"
import { useNavigate } from "react-router-dom"
import { CATEGORIES } from "../../constants/categories"

function AddRecipe() {
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [cookingTime, setCookingTime] = useState("")
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase.from("recipes").insert([
      {
        title,
        category,
        image_url: imageUrl,
        ingredients,
        instructions,
        cooking_time: Number(cookingTime),
      },
    ])

    if (error) {
      setError(error.message)
    } else {
      navigate("/admin/recipes")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6">Add Recipe</h1>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <textarea
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Ingredients"
          rows="4"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 mb-3 rounded bg-gray-700"
          placeholder="Instructions"
          rows="5"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full p-2 mb-6 rounded bg-gray-700"
          placeholder="Cooking time (minutes)"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          required
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/recipes")}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-green-600 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddRecipe
