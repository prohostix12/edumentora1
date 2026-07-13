import Link from "next/link";
import { MapPin } from "lucide-react";
import { btechLocations } from "@/lib/btech-locations";

export default function BTechLocationLinks() {
  return (
    <section className="border-t border-border/70 bg-[#f7f7f7] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <h2
              className="text-lg sm:text-xl font-bold text-heading"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              B.Tech Credit Transfer by District / City
            </h2>
            <p className="text-sm text-paragraph">
              Explore location-specific B.Tech credit transfer support pages.
            </p>
          </div>
        </div>

        <div className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {btechLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/btech-credit-transfer/${location.slug}`}
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-paragraph transition-colors duration-300 hover:text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-3 group-hover:bg-primary" />
              <span>{location.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
