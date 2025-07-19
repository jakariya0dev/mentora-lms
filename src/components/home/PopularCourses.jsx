import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import CourseCard from "../common/CourseCard";

// Custom Arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
  >
    <FaArrowLeft className="text-gray-700" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
  >
    <FaArrowRight className="text-gray-700" />
  </button>
);

export default function PopularCourses() {
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/courses/popular`
      );
      // console.log("Popular courses fetched:", response.data.courses);

      return response.data.courses;
    },
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="pt-16 pb-8 md:pt-32 md:pb-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-600 mb-10">
          Popular Courses
        </h2>

        <Slider {...settings}>
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
