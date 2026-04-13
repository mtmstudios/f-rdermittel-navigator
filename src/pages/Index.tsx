import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CalculatorSection from "@/components/landing/CalculatorCard";
import TrustSection from "@/components/landing/TrustSection";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSection from "@/components/landing/ProblemSection";
import CustomerStory from "@/components/landing/CustomerStory";
import Process from "@/components/landing/Process";
import FAQ from "@/components/landing/FAQ";
import PodcastSection from "@/components/landing/PodcastSection";
import Footer from "@/components/landing/Footer";
import StickyCTA from "@/components/landing/StickyCTA";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <CalculatorSection />
      <TrustSection />
      <SocialProof />
      <ProblemSection />
      <CustomerStory />
      <Process />
      <FAQ />
      <PodcastSection />
      <Footer />
      <StickyCTA />
    </>
  );
}
