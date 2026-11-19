import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Marquee } from "@/components/marquee";
import { Work } from "@/components/work";
import { Capabilities } from "@/components/capabilities";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="relative z-10 bg-ink">
          <Work />
          <Marquee />
          <About />
          <Capabilities />
          <Experience />
        </div>
        <Contact />
      </main>
    </>
  );
}
