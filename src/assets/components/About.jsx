import { ArrowRight } from "lucide-react"
import Header from "./Header"
import bg3 from "../../Images/bg3.jpg";
import {Link} from "react-router-dom";
export default function About() {

  return (
    <>
    <Header/>
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight"> Our Dedication to Excellence.</h2>
            <p className="text-gray-600 max-w-lg">
            Through a meticulous and thoughtful design process, we craft solutions that embody sustainability,
             enduring value, and cutting-edge innovation. Our goal is to create impactful 
            designs that stand the test of time while addressing the unique needs of our clients.
            </p>
            <button className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
              <Link to="/home">Explore our project </Link>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t rounded-r">
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600">Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600">Projects completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold">0</p>
              <p className="text-gray-600">Awards won</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <h3 className="text-xl font-bold">Got an idea?</h3>
            <p className="text-green-600 hover:text-green-700 font-medium">
              <Link to='/contact'>Let's make it happen.</Link> 
            </p>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative h-[400px] md:h-[600px]">
          <img
            src={bg3}
            alt="Hands holding seeds representing growth and sustainability"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>

    </>
  )
}

