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

// const icons = [
//   SiGoogle,
//   SiAmazon,
//   SiAirbnb,
//   SiFacebook,
//   SiLinkedin,
//   SiSlack,
//   SiSpotify,
//   SiGithub,
// ];

const partners = [
  { name: "Google", icon: SiGoogle },
  { name: "Amazon", icon: SiAmazon },
  { name: "Airbnb", icon: SiAirbnb },
  { name: "Facebook", icon: SiFacebook },
  { name: "LinkedIn", icon: SiLinkedin },
  { name: "Slack", icon: SiSlack },
  { name: "Spotify", icon: SiSpotify },
  { name: "GitHub", icon: SiGithub },
];

export default function TrustedClients() {
  return (
    <section className="bg-gray-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          Our Partner <span className="text-indigo-600">Companies</span>
        </h2>
        <p className="text-gray-500 mb-10 md:mb-16 text-lg md:text-xl">
          We are Trusted by industry leaders around the world
        </p>

        <div className="flex flex-wrap justify-center gap-16 items-center text-6xl text-gray-600">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="hover:text-gray-800 transition-colors duration-300"
            >
              <div className="flex items-center justify-center gap-2">
                <partner.icon className="w-8 h-8 md:w-16 md:h-16" />
                <p className="text-3xl md:text-5xl font-semibold">
                  {partner.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
