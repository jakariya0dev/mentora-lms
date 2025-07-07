
import {
  SiAirbnb,
  SiAmazon,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiLinkedin,
  SiSlack,
  SiSpotify,
} from "react-icons/si";

const icons = [
  SiGoogle,
  SiAmazon,
  SiAirbnb,
  SiFacebook,
  SiLinkedin,
  SiSlack,
  SiSpotify,
  SiGithub,
];

export default function TrustedClients() {

  return (
    <section className="bg-gray-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-16">
          Thousands of Companies and Learners Trust Us
        </h2>

        <div className="flex justify-center gap-16 items-center text-6xl text-gray-600">
          {icons.map((Icon, index) => (
            <div
              key={index}
              className="hover:text-gray-800 transition-colors duration-300"
            >
              <Icon />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
