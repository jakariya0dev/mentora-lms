import Slider from "react-slick";

// Dummy feedback data
const feedbacks = [
  {
    name: "Alice Johnson",
    title: "Advanced React",
    text: "I was struggling with React hooks and context before taking this course. The instructor broke down each concept in a way that finally made sense. Now I’m confident working on complex components and managing state effectively in my own projects. Highly recommend for anyone wanting to go beyond the basics!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mark Benson",
    title: "UI/UX Design",
    text: "This was more than just a design course – it completely transformed how I approach building user experiences. The instructor provided tons of real-life case studies and practical exercises that helped me grasp core UX principles. I’ve already redesigned parts of my portfolio based on what I learned here.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Lee",
    title: "Full-Stack Development",
    text: "Incredible course! It covered frontend and backend thoroughly with hands-on projects that mirrored real industry practices. The instructor’s feedback on assignments helped me refine my coding standards and approach. This course helped me land my first freelance gig as a full-stack developer.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    title: "Python for Beginners",
    text: "I had zero experience in coding before I enrolled. This course was extremely beginner-friendly and helped me build a strong foundation in Python. The teacher was very patient and used analogies that made complex topics easier to digest. Now I’m building my own scripts and automations!",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false, 
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

export default function Feedback() {
  return (
    <section className="py-16 md:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-600">
          Student Feedback
        </h2>

        <Slider {...settings}>
          {feedbacks.map((item, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Course: <span className="font-semibold">{item.title}</span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"{item.text}"</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
