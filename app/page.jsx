/** @format */
import Heading from "./components/Heading";
import Hero from "./components/Hero";
// import OurProducts from "./components/OurProducts";
import HomeProducts from "@/app/components/HomeProducts";
import Range from "./components/Range";

export default function Home() {
  return (
    <div>
      <Hero />
      <Heading
        text='Browse The Range'
        subtext='Discover the perfect product for your needs..'
        styles='py-8 text-center'
      />
      <Range />
      {/* <Heading text='Our Products' subtext='' styles='py-8 text-center' /> */}
      <HomeProducts />
    </div>
  );
}
