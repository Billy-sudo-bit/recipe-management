import { useNavigate } from "react-router-dom"
import { supabase } from "../../supabase"

function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/admin/recipes")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Manage Recipes
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut()
            navigate("/admin/login")
          }}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard
