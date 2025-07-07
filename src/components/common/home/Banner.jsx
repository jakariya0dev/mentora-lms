import bannerImg from "../../../assets/images/banner.jpg";

export default function Banner() {
  return (
    <header
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
      className="hero min-h-[80vh] bg-base-200"
    >
      <div className="bg-gradient-to-r from-black/90 via-black/50 to-transparent h-full w-full p-5 md:p-10">
        <div className="max-w-7xl mx-auto text-white flex items-center h-full">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl leading-tight font-bold">
              Learn Any Skill to Advance Your <span className="underline decoration-amber-400 underline-offset-10 decoration-8">Career</span>
            </h1>
            <p className="md:mb-8 mb-5 text-xl">
              We're a modern LMS platform helping learners upskill in tech,
              design, and freelancing. Learn from expert mentors. Build your
              career your way.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button className="btn btn-primary">Explore Courses</button>
              <div className="avatar-group -space-x-6">
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold">3000+</p>
                <p className="text-lg font-semibold">Happy Students</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
