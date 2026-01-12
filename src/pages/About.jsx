import UserNavbar from "../components/UserNavbar"

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNavbar />

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>

        <p className="text-gray-300 leading-relaxed">
          This recipe platform helps users discover delicious meals
          across different categories.  
          Our goal is to make cooking easier, faster, and more enjoyable.
        </p>

        <p className="text-gray-400 mt-4">
          Built with React, Tailwind CSS, and Supabase.
        </p>
      </div>
    </div>
  )
}
