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
    <section className="px-6 md:px-0 py-16 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          Our Partner <span className="text-indigo-600">Companies</span>
        </h2>
        <p className="text-gray-500 mb-10 md:mb-16 text-lg">
          We are Trusted by industry leaders around the world
        </p>

        <div className="flex flex-wrap justify-center gap-5 items-center text-6xl text-gray-700">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="hover:bg-amber-100 transition-all duration-500 bg-gray-100 rounded p-6 flex-1"
            >
              <div className="flex items-center justify-center gap-2">
                <partner.icon className="w-8 h-8 md:w-12 md:h-12" />
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
