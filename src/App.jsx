import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Now from './components/Now';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Now />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
