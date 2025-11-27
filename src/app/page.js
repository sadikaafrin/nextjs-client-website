import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Gallery></Gallery>
      <Banner></Banner>
      <Testimonials></Testimonials>
    </div>
  );
}


