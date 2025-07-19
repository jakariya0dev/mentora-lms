import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

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
  const { data: feedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/feedbacks`
      );
      console.log("Feedbacks fetched:", response.data?.feedbacks);

      return response.data.feedbacks;
    },
  });
  return (
    <section className="px-6 p-0 py-16 md:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-600">
          Student Feedback
        </h2>

        <Slider {...settings}>
          {feedbacks.map((feedback, index) => (
            <div key={index} className="px-4">
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <div className="flex items-center gap-5">
                  <img
                    src={feedback.userInfo.photoURL || "/default-avatar.png"}
                    alt={feedback.userInfo.name}
                    className="w-20 h-20 rounded-full object-cover mb-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feedback.userInfo.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      Course:{" "}
                      <span className="font-semibold">
                        {feedback?.courseInfo?.title || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">
                  "{feedback.description}"
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
