import UserNavbar from "../components/UserNavbar"

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNavbar />

      <div className="max-w-5xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">📖 Browse Recipes</h3>
            <p className="text-gray-400">
              Explore recipes by category and cooking time.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">🧑‍🍳 Admin Management</h3>
            <p className="text-gray-400">
              Admins can add, edit, and manage recipes easily.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast & Simple</h3>
            <p className="text-gray-400">
              Clean UI, fast loading, and simple navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
