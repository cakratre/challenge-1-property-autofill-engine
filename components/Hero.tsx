"use client";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section>
        <div className="flex items-center justify-center bg-[#EEEEEE] px-2 pt-10 pb-10">
          <div className="flex flex-col items-center text-center">

              {/* Heading */}
              <h1 className="mx-auto max-w-4xl font-normal text-[#171717] tracking-tight text-6xl sm:text-7xl lg:text-9xl">
                Property Auto-Fill Listing Engine
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl font-normal text-[#171717]/60 text-xs xl:text-xl mb-5">
                Kami membantu Anda membangun sistem yang efisien, skalabel, dan siap
                menghadapi tantangan era digital melalui teknologi terkini.
              </p>

              {/* CTA */}
              <div className="flex flex-wrap justify-center w-full gap-2 z-10 relative">

                <Link
                    href="/vieroai"
                    className="flex items-center justify-start p-7 rounded-full border border-[#171717]/15 w-full sm:w-auto text-[#171717] hover:bg-[#171717]/5 transition-colors cursor-pointer z-10"
                    style={{ pointerEvents: "auto" }}
                >
                    <ArrowRight size={24} className="mr-5" />
                    Mulai Listing Property Anda
                </Link>

                <Link
                    href="/projects"
                    className="flex items-center justify-start p-7 rounded-full bg-[#171717] border border-[#171717]/15 w-full sm:w-auto text-[#EEEEEE] hover:bg-[#171717]/90 transition-colors cursor-pointer z-10"
                    style={{ pointerEvents: "auto" }}
                >
                    <Eye size={24} className="mr-5" />
                    Lihat Semua Property
                </Link>
              </div>
          </div>
        </div>
    </section>
  );
};

export default Hero;
