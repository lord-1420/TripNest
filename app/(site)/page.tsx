import Hero from "@/components/home/Hero";
import TrendingDestinations from "@/components/home/TrendingDestinations";
import CategoryExplorer from "@/components/home/CategoryExplorer";
import HiddenGems from "@/components/home/HiddenGems";
import StayShowcase from "@/components/home/StayShowcase";
import ExperiencesShowcase from "@/components/home/ExperiencesShowcase";
import TripPlanningSteps from "@/components/home/TripPlanningSteps";
import TravelSmarter from "@/components/home/TravelSmarter";
import FinalCta from "@/components/home/FinalCta";
import {
  listCategories,
  listDestinations,
  listAttractions,
  listAccommodations,
  featuredHiddenGems,
  publicStats,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const categories = listCategories("DESTINATION");
  const stats = publicStats();

  const featured = listDestinations({ featured: true, perPage: 6 }).items;
  const trending =
    featured.length >= 6
      ? featured
      : [...featured, ...listDestinations({ perPage: 9 }).items.filter((d) => !featured.some((f) => f.id === d.id))].slice(0, 6);

  const gems = featuredHiddenGems(5);
  const stays = listAccommodations({ perPage: 6, sort: "price_asc" }).items;
  const experiences = listAttractions({ featured: true, perPage: 5 }).items;

  return (
    <>
      <Hero
        counts={{ destinations: stats.destinations, experiences: stats.experiences, stays: stats.stays }}
        categories={categories}
      />
      <CategoryExplorer categories={categories} />
      <TrendingDestinations destinations={trending} />
      <StayShowcase stays={stays} />
      <HiddenGems gems={gems} />
      <ExperiencesShowcase attractions={experiences} />
      <TripPlanningSteps />
      <TravelSmarter />
      <FinalCta />
    </>
  );
}
