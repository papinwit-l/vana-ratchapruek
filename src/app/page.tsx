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
      <AboutSection data={aboutData} />
    </>
  );
}
