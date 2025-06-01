import { Button } from "@/components/atoms";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export const BannerSection = () => {
  return (
    <section className="relative bg-primary text-primary overflow-hidden py-12 lg:py-24">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute top-20 left-20 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute bottom-24 right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-40 right-40 w-48 h-48 bg-pink-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text + Button */}
          <div className="relative z-10">
            <div className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-8 flex flex-col h-full justify-between">
              {/* Internal Halo on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>

              <div className="mb-8 lg:mb-16">
                <span className="inline-block text-sm font-medium px-4 py-1 border border-secondary rounded-full bg-white/90 backdrop-blur-sm">
                  #LOCAL LOVE
                </span>
                <h1 className="mt-4 mb-4 font-bold uppercase text-3xl lg:text-4xl xl:text-5xl leading-tight">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Discover Local Brands & End Fast Fashion
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-secondary max-w-lg leading-relaxed">
                  Support community entrepreneurs, uncover unique pieces, and join the movement to end fast fashion. Be the change!
                </p>
              </div>

              <Link href="/brands">
                <Button className="relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide">
                  <span>Explore Local</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full flex justify-end">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              {/* Halo Behind Image on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              <Image
                src="/images/banner-section/local-brands.jpg"
                alt="Illustration of local fashion – entrepreneurs showcasing sustainable clothing"
                width={700}
                height={600}
                className="object-cover object-top rounded-2xl w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
