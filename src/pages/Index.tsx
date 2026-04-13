import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSection from "@/components/landing/ProblemSection";
import CustomerStory from "@/components/landing/CustomerStory";
import Calculator from "@/components/landing/Calculator";
import TargetGroups from "@/components/landing/TargetGroups";
import Process from "@/components/landing/Process";
import WhyUs from "@/components/landing/WhyUs";
import FAQ from "@/components/landing/FAQ";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";

export default function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <SocialProof />
      <ProblemSection />
      <CustomerStory />
      <Calculator />
      <TargetGroups />
      <Process />
      <WhyUs />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
