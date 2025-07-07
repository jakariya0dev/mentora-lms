import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import Slider from "react-slick";
import CourseCard from "../common/CourseCard";

// Dummy course data
const courses = [
  {
    title: "Full-Stack Web Development",
    instructor: "John Doe",
    enrollments: 3200,
    rating: 4.7,
    category: "Web Development",
    price: 59.99,
    image:
      "https://api.brightskills.com/images/course/course-uiux-mastery-on-figma1710237526.jpg",
  },
  {
    title: "UI/UX Design Masterclass",
    instructor: "Jane Smith",
    enrollments: 2900,
    rating: 4.6,
    category: "Design",
    price: 49.99,
    image:
      "https://api.brightskills.com/course/Your%20First%20Step%20in%20Web%20Design/558-X-364_Course-Banner_ii-of-Your-First-Step-in-Web-Design.jpg",
  },
  {
    title: "Freelancing for Beginners",
    instructor: "Alex Johnson",
    enrollments: 2500,
    rating: 4.5,
    category: "Freelancing",
    price: 39.99,
    image:
      "https://api.brightskills.com/course/Create%20Web%20Template%20Design%20Using%20Figma/Create_Web_Template_Design_Using_Figma_558-364.jpg",
  },
  {
    title: "React & Redux Bootcamp",
    instructor: "Emily Brown",
    enrollments: 4000,
    rating: 4.8,
    category: "Web Development",
    price: 64.99,
    image:
      "https://api.brightskills.com/course/Low%20Poly%20Game%20Asset%20Modeling%20&%20Texture/Low-Poly-Game-Asset-Modeling--Texture_Course-Thumbnail.jpg",
  },
  {
    title: "Advanced JavaScript",
    instructor: "Michael Lee",
    enrollments: 2700,
    rating: 4.6,
    category: "Programming",
    price: 44.99,
    image:
      "https://api.brightskills.com/course/3D%20Product%20Modeling%20with%20MAYA/558-X-364_Course-Banner_2-of-3d-product-modeling-with-maya.jpg",
  },
  {
    title: "Digital Marketing Fundamentals",
    instructor: "Sophia Wilson",
    enrollments: 3100,
    rating: 4.4,
    category: "Marketing",
    price: 29.99,
    image:
      "https://api.brightskills.com/course/Complete%20Beginner's%20Guide%20to%20Illustration/Complete-Beginners-Guide-to-Illustration-Course-Thumbnail.jpg",
  },
];

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

// Sort by highest enrollments
const sortedCourses = [...courses].sort(
  (a, b) => b.enrollments - a.enrollments
);

export default function PopularCourses() {
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
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-600 mb-10">
          Popular Courses
        </h2>

        <Slider {...settings}>
          {sortedCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </Slider>
      </div>
    </section>
  );
}
