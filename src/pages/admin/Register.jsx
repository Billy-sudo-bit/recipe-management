import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../supabase"

export default function Register() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      alert("Admin account created. You can now log in.")
      navigate("/admin/login")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Register
        </h1>

        {error && (
          <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
          >
            {loading ? "Creating..." : "Create Admin"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <button
            onClick={() => navigate("/admin/login")}
            className="hover:text-white"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}
