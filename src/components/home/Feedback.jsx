import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";
import renderStars from "../../utils/renderStarts";
import ContentNotFound from "../common/ContentNotFound";

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
      // console.log("Feedbacks fetched:", response.data?.feedbacks);

      return response.data.feedbacks;
    },
  });

  if (feedbacks.length === 0)
    return <ContentNotFound title="No Feedbacks Found" />;

  return (
    <section className="px-6 p-0 py-16 md:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-gray-600">
          Student Feedbacks
        </h2>

        <Slider {...settings}>
          {feedbacks.map((feedback, index) => (
            <div key={index} className="px-4 h-[100%]">
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col mb-2">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full object-cover border-4 border-amber-400">
                    <img
                      loading="lazy"
                      width="100%"
                      height="100%"
                      src={feedback.userInfo.photoURL || "/default-avatar.png"}
                      alt={feedback.userInfo.name}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {feedback.userInfo.displayName || "N/A"}
                    </h3>
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">
                        {feedback?.courseInfo?.title || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <p className="text-yellow-500 text-center mb-4 text-2xl">
                  {renderStars(feedback.rating)}
                </p>
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
