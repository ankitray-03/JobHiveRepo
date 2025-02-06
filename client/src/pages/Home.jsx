import CompanyStats from "../components/Home/CompanyStats";
import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import WhyUs from "../components/Home/WhyUs";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />
      <WhyUs />
      <Features />
      <CompanyStats />
    </div>
  );
};

export default Home;
