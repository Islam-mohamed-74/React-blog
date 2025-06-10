import HeroSection from "../component/HeroSection";

export default function Home(props) {
  const { user } = props;
  return (
    <div>
      <HeroSection />
    </div>
  );
}
