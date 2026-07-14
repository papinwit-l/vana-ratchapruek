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
import { HOUSE_TYPES_DATA } from "@/data/house-type";
import { FACILITIES_DATA } from "@/data/facilities";
import { GALLERY_DATA } from "@/data/gallery";

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
      {/* <HeroSection
        data={{
          slides: [],
          title: "VANA",
          subtitle: "Asset Five Presents",
          tagline: "Balance of Urbanized Living",
          price: "19.9",
          price_unit: "MB*",
        }}
      /> */}
      <HeroSection
        data={{
          slides: [],
          video: "/videos/banner-hero.mp4",
          // videoWebm: "/videos/banner-hero.webm",  // add when you have it
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
          heading: ["วนา", "Balance of Urbanized Living"],
          paragraphs: [
            'สุนทรียภาพใหม่ของที่อยู่อาศัย ที่ร่มรื่นและร่มเย็น ดั่งอาศัยอยู่ใน "วนา" ซึ่งเป็นคำภาษาไทย แปลว่า "ป่า" VANA บ้านที่ออกแบบโดยได้รับแรงบันดาลใจจากการอยู่อาศัยท่ามกลางพงไพรเพื่อตอบรับไลฟ์สไตล์คนเมืองให้อยู่สบาย หรูหราบนทำเลศักยภาพจาก A5 ให้การพักผ่อนของคุณและครอบครัวเป็นพื้นที่รีชาร์จร่างกายผ่อนคลาย และเติมความสุข เสมือนอยู่ท่ามกลางธรรมชาติ',
            'บ้านเดี่ยว 3 ชั้นรูปแบบใหม่บนทำเลใจกลางราชพฤกษ์ เชื่อมต่อชีวิตคนเมืองด้วยการเดินทางเข้าเมืองที่สะดวกสบาย ติดห้างสรรพสินค้าชื่อดังถึง 2 ห้าง และใกล้ชิดติดธรรมชาติด้วยต้นไม้ใหญ่มากมายทั่วทั้งโครงการ ให้ที่พักอาศัยของคุณร่มรื่น ดั่ง "วนา" พร้อมความสงบและเป็นส่วนตัวเพียง 43 ครอบครัว',
          ],
          image: "/images/banner/banner-image-01.webp",
        }}
      />
      <ProjectInfoSection
        data={{
          backgroundImage: "/images/vana-info-bg.webp",
          items: [
            {
              label: "พัฒนาโครงการโดย",
              value: "บริษัท แอสเซท ไฟว์ ดีเวลลอปเม้นท์ จำกัด",
            },
            { label: "ทำเลที่ตั้ง", value: "ถ.ราชพฤกษ์ (ซอยมหาสวัสดิ์ 2)" },
            { label: "ขนาดที่ดิน", value: "17-1-53.2 ไร่" },
            { label: "จำนวนทั้งหมด", value: "43 ยูนิต" },
            { label: "ราคาเริ่มต้น", value: "19.9 ล้านบาท*" },
          ],
        }}
      />
      <HouseTypeSection data={HOUSE_TYPES_DATA} />
      <FacilitiesSection data={FACILITIES_DATA} />
      <GallerySection data={GALLERY_DATA} />
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
