import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import GitHubActivity from '@/components/GitHubActivity';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <GitHubActivity />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}

