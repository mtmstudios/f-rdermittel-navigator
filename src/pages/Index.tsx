import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CalculatorSection from "@/components/landing/CalculatorCard";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSection from "@/components/landing/ProblemSection";
import CustomerStory from "@/components/landing/CustomerStory";
import TargetGroups from "@/components/landing/TargetGroups";
import Process from "@/components/landing/Process";
import WhyUs from "@/components/landing/WhyUs";
import FAQ from "@/components/landing/FAQ";
import ContactForm from "@/components/landing/ContactForm";
import PodcastSection from "@/components/landing/PodcastSection";
import Footer from "@/components/landing/Footer";
import StickyCTA from "@/components/landing/StickyCTA";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <CalculatorSection />
      <SocialProof />
      <ProblemSection />
      <CustomerStory />
      <TargetGroups />
      <Process />
      <WhyUs />
      <ContactForm />
      <FAQ />
      <PodcastSection />
      <Footer />
      <StickyCTA />
    </>
  );
}
