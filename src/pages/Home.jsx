import Banner from "../components/home/Banner";
import Feedback from "../components/home/Feedback";
import PlatformStats from "../components/home/PlatformStats";
import PopularCourses from "../components/home/PopularCourses";
import TrustedClients from "../components/home/TrustedClients";

export default function Home() {
  return (
    <section>
      <Banner />
      <TrustedClients />
      <PopularCourses />
      <Feedback />
      <PlatformStats />
    </section>
  );
}
