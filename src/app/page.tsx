import BenefitsSection from "@/features/landPage/components/benefits";
import Footer from "@/features/landPage/components/footer";
import Hero from "@/features/landPage/components/hero";
import FeaturesSection from "@/features/landPage/components/landPageFeatures";
import Navbar from "@/features/landPage/components/navbar";
import ReviewsSection from "@/features/landPage/components/reviewSection";


export default function HomePage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <section className="bg-background">
          <section id="features">
            <FeaturesSection />
          </section>
          <section id="benefits">
            <BenefitsSection />
          </section>
          <ReviewsSection />
        </section>
      </main>
      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}
