import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import HeroScene from "@/components/HeroScene";
import SelectedWork from "@/components/SelectedWork";
import ShippedApps from "@/components/ShippedApps";
import Services from "@/components/Services";
import Lab from "@/components/Lab";
import Instrument from "@/components/Instrument";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main id="content" className="relative w-full">
        {/* 01. HERO / IMPOSSIBLE */}
        <HeroScene />

        {/* 02. SELECTED WORK */}
        <SelectedWork />

        {/* 03. SHIPPED APPS */}
        <ShippedApps />

        {/* 04. SERVICES */}
        <Services />

        {/* 05. LAB */}
        <Lab />

        {/* 06. LIVE / INSTRUMENT */}
        <Instrument />

        {/* 07. CONTACT */}
        <Contact />
      </main>

      {/* 08. FOOTER */}
      <Footer />
    </SmoothScroll>
  );
}
