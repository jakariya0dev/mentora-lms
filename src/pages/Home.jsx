import HeadTag from "../components/common/HeadTag";
import Banner from "../components/home/Banner";
import CallToAction from "../components/home/CallToAction";
import Feedback from "../components/home/Feedback";
import JoinAsTeacher from "../components/home/JoinAsTeacher";
import NewCourses from "../components/home/NewCourses";
import PlatformStats from "../components/home/PlatformStats";
import PopularCourses from "../components/home/PopularCourses";
import TrustedClients from "../components/home/TrustedClients";
import WhyChoose from "../components/home/WhyChoose";

export default function Home() {
  return (
    <section>
      <HeadTag title="Mentora | Learning Platform" />
      <Banner />
      <TrustedClients />
      <WhyChoose />
      <PopularCourses />
      <NewCourses />
      <Feedback />
      <PlatformStats />
      <JoinAsTeacher />
      <CallToAction />
    </section>
  );
}
