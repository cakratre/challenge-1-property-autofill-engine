import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import List from "@/components/List";

const Home = () => {
  return (
    <div className="bg-[#EEEEEE]">
      <Navbar />
      <Hero />
      <List />
      <Footer />
    </div>
  )
}

export default Home;