import About from '../components/About/About'
import Competences from '../components/Competences/Competences'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Projects from '../components/Projects/Projects'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <Hero />

      <div className='space-y-16 py-16 pb-0 px-6 sm:px-0'>
        {/* About Section */}
        <About />

        {/* Competences Section */}
        <Competences />

        {/* Projects Section */}
        <Projects />
      </div>

      {/* Full width background */}
      <div className='mt-16 px-6 sm:px-0 bg-muted'>
        {/* Contact Section */}
        <Contact />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}
