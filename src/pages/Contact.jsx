import UserNavbar from "../components/UserNavbar"

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNavbar />

      <div className="max-w-xl mx-auto p-10">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <form className="space-y-4">
          <input
            className="w-full p-3 rounded bg-gray-800 text-white"
            placeholder="Your Name"
          />

          <input
            className="w-full p-3 rounded bg-gray-800 text-white"
            placeholder="Your Email"
          />

          <textarea
            className="w-full p-3 rounded bg-gray-800 text-white"
            rows="4"
            placeholder="Your Message"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
