import AboutSection from "@/components/home/AboutSection";
import BannerSection from "@/components/home/HeroSection";
import FormSection from "@/components/home/FormSection";
import GallerySection from "@/components/home/GallerySection";
import InformationSection from "@/components/home/InformationSection";
import LocationSection from "@/components/home/LocationSection";
import UnitSection from "@/components/home/UnitSection";
import VideoSection from "@/components/home/VideoSection";
import {
  getAbout,
  getBanners,
  getContact,
  getGallery,
  getInformation,
  getLocation,
  getUnitTypes,
  getVideo,
} from "@/lib/wordpress";
import HeroSection from "@/components/home/HeroSection";
import ConceptSection from "@/components/home/ConceptSection";
import ProjectInfoSection from "@/components/home/ProjectInfoSection";
import HouseTypeSection from "@/components/home/HouseTypeSection";
import FacilitiesSection from "@/components/home/FacilitiesSection";
import { Baby, Cable, Dumbbell, Sofa, TreePine, Waves } from "lucide-react";
import { CONTACT_DATA, LOCATION_DATA } from "@/data/location";

// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default async function HomePage() {
  // await delay(3000); // 3 seconds to see the animation

  const [
    bannerSlides,
    aboutData,
    informationData,
    galleryData,
    unitTypes,
    videoData,
    contactData,
    locationData,
  ] = await Promise.all([
    getBanners(),
    getAbout(),
    getInformation(),
    getGallery(),
    getUnitTypes(),
    getVideo(),
    getContact(),
    getLocation(),
  ]);

  // console.log(aboutData);
  return (
    <>
      <HeroSection
        data={{
          slides: bannerSlides,
          title: "VANA",
          subtitle: "Asset Five Presents",
          tagline: "Balance of Urbanized Living",
          price: "19.9",
          price_unit: "MB*",
        }}
      />
      <FormSection />
      <ConceptSection
        data={{
          heading: ["วนา", "Where Nature Meets Home"],
          paragraphs: [
            'VANA — derived from "วนา" meaning forest — is a sanctuary where nature and modern living coexist in perfect balance. Every detail is designed to bring the serenity of nature into your daily life.',
            "Located on Ratchapruek Road, one of Bangkok's most connected corridors, VANA offers the rare luxury of space, privacy, and convenience — all within reach of the city's pulse.",
          ],
          image: "/images/banner/banner-image-01.png",
        }}
      />
      <ProjectInfoSection
        data={{
          items: [
            { label: "Developer", value: "Asset Five" },
            { label: "Location", value: "Ratchapruek Road" },
            { label: "Land Area", value: "17-1-53.2 Rai" },
            { label: "Total Units", value: "43 Units" },
            { label: "Starting Price", value: "19.9 MB" },
          ],
        }}
      />
      <HouseTypeSection
        data={{
          types: [
            {
              name: "Type L",
              subtitle: "Luxury Collection",
              image: "/images/banner/banner-image-01.png",
              specs: [
                { label: "Land Area", value: "50–60 sq.wah" },
                { label: "Usable Area", value: "210 sq.m." },
                { label: "Bedrooms", value: "4" },
                { label: "Bathrooms", value: "3" },
                { label: "Parking", value: "2 Cars" },
              ],
              floors: [
                {
                  src: "/images/banner/banner-image-02.png",
                  label: "1st Floor Plan",
                },
                {
                  src: "/images/banner/banner-image-03.png",
                  label: "2nd Floor Plan",
                },
              ],
            },
            {
              name: "Type M",
              subtitle: "Premium Collection",
              image: "/images/banner/banner-image-02.png",
              specs: [
                { label: "Land Area", value: "40–50 sq.wah" },
                { label: "Usable Area", value: "180 sq.m." },
                { label: "Bedrooms", value: "3" },
                { label: "Bathrooms", value: "3" },
                { label: "Parking", value: "2 Cars" },
              ],
              floors: [
                {
                  src: "/images/banner/banner-image-01.png",
                  label: "1st Floor Plan",
                },
                {
                  src: "/images/banner/banner-image-03.png",
                  label: "2nd Floor Plan",
                },
              ],
            },
            {
              name: "Type S",
              subtitle: "Classic Collection",
              image: "/images/banner/banner-image-03.png",
              specs: [
                { label: "Land Area", value: "35–40 sq.wah" },
                { label: "Usable Area", value: "155 sq.m." },
                { label: "Bedrooms", value: "3" },
                { label: "Bathrooms", value: "2" },
                { label: "Parking", value: "2 Cars" },
              ],
              floors: [
                {
                  src: "/images/banner/banner-image-02.png",
                  label: "1st Floor Plan",
                },
                {
                  src: "/images/banner/banner-image-01.png",
                  label: "2nd Floor Plan",
                },
              ],
            },
          ],
        }}
      />
      <FacilitiesSection
        data={{
          image: "/images/banner/banner-image-02.png",
          items: [
            {
              icon: "waves",
              title: "Swimming Pool",
              description:
                "Resort-style infinity pool surrounded by tropical landscaping",
            },
            {
              icon: "dumbbell",
              title: "Fitness Center",
              description:
                "Fully-equipped modern gym with panoramic garden views",
            },
            {
              icon: "tree",
              title: "Central Garden",
              description:
                "Expansive green spaces and walking trails through native flora",
            },
            {
              icon: "sofa",
              title: "Clubhouse Lounge",
              description: "Elegant lounge and co-working space for residents",
            },
            {
              icon: "baby",
              title: "Kids Playground",
              description:
                "Safe and engaging play areas designed for children of all ages",
            },
            {
              icon: "cable",
              title: "Underground Power",
              description:
                "All electrical systems placed underground for clean aesthetics",
            },
          ],
        }}
      />
      <GallerySection
        data={{
          images: [
            {
              src: "/images/banner/banner-image-01.png",
              alt: "VANA exterior view",
            },
            { src: "/images/banner/banner-image-02.png", alt: "VANA garden" },
            { src: "/images/banner/banner-image-03.png", alt: "VANA interior" },
            {
              src: "/images/banner/banner-image-01.png",
              alt: "VANA pool area",
            },
            {
              src: "/images/banner/banner-image-02.png",
              alt: "VANA clubhouse",
            },
            { src: "/images/banner/banner-image-03.png", alt: "VANA entrance" },
          ],
        }}
      />
      <LocationSection location={LOCATION_DATA} contact={CONTACT_DATA} />
    </>
  );
}
// Remaining sections (top to bottom):

// ConceptSection (About)
// ProjectInfoSection
// HouseTypeSection
// FacilitiesSection
// GallerySection
// LocationSection (map + nearby places)
