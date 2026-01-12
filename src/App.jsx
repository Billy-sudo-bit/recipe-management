import { Routes, Route } from "react-router-dom"
import Recipes from "./pages/Recipes"
import RecipeDetail from "./pages/RecipeDetail"
import Login from "./pages/admin/Login"
import AdminRecipes from "./pages/admin/Recipes"
import AddRecipe from "./pages/admin/AddRecipe"
import EditRecipe from "./pages/admin/EditRecipe"
import ProtectedRoute from "./components/ProtectedRoute"
import Register from "./pages/admin/Register"
import About from "./pages/About"
import Services from "./pages/Services"
import Contact from "./pages/Contact"

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Recipes />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<RecipeDetail />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/register" element={<Register />} />

      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />

      {/* Admin = Manage Recipes */}
      <Route
        path="/admin/recipes"
        element={
          <ProtectedRoute>
            <AdminRecipes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/recipes/add"
        element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/recipes/edit/:id"
        element={
          <ProtectedRoute>
            <EditRecipe />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
