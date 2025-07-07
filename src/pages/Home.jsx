import Banner from "../components/home/Banner";
import PopularCourses from "../components/home/PopularCourses";
import TrustedClients from "../components/home/TrustedClients";

export default function Home() {
  return (
    <section>
      <Banner />
      <TrustedClients />
      <PopularCourses />
    </section>
  );
}
