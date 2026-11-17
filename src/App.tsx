import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import ExecutedProjects from "./components/ExecutedProjects"
import Highlights from "./components/Highlights"
import RecentProjects from "./components/RecentProjects"
import PropertySpotlight from "./components/PropertySpotlight"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"

function App() {
  return (
    
    <div className="min-h-screen bg-[#f1f3f6]">
      <Navbar/>
      <Hero/>
      <ExecutedProjects/>
      <Highlights/>
      <RecentProjects/>
      <PropertySpotlight/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default App