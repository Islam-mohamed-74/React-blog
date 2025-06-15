import { Link } from "react-router";
import ContactSection from "../component/ContactSection";
import HeroSection from "../component/HeroSection";
import RecentBlog from "../component/RecentBlog";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentBlog />
      <ContactSection />
    </div>
  );
}
