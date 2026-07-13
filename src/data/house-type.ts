// data/house-types.ts

export const HOUSE_TYPES_DATA = {
  types: [
    {
      name: "Type L",
      subtitle: "Luxury Collection",
      image: "/images/unit/type-l.webp",
      specs: [
        { label: "เนื้อที่", value: "50–60 ตร.ว." },
        { label: "พื้นที่ใช้สอย", value: "210 ตร.ม." },
        { label: "ห้องนอน", value: "4" },
        { label: "ห้องน้ำ", value: "3" },
        { label: "ที่จอดรถ", value: "2 คัน" },
      ],
      floors: [
        { src: "/images/unit/type-l-f1.webp", label: "1st Floor Plan" },
        { src: "/images/unit/type-l-f2.webp", label: "2nd Floor Plan" },
        { src: "/images/unit/type-l-f3.webp", label: "3rd Floor Plan" },
      ],
    },
    {
      name: "Type M",
      subtitle: "Premium Collection",
      image: "/images/unit/type-m.webp",
      specs: [
        { label: "เนื้อที่", value: "40–50 ตร.ว." },
        { label: "พื้นที่ใช้สอย", value: "180 ตร.ม." },
        { label: "ห้องนอน", value: "3" },
        { label: "ห้องน้ำ", value: "3" },
        { label: "ที่จอดรถ", value: "2 คัน" },
      ],
      floors: [
        { src: "/images/unit/type-m-f1.webp", label: "1st Floor Plan" },
        { src: "/images/unit/type-m-f2.webp", label: "2nd Floor Plan" },
        { src: "/images/unit/type-m-f3.webp", label: "3rd Floor Plan" },
      ],
    },
    {
      name: "Type S",
      subtitle: "Classic Collection",
      image: "/images/unit/type-s.webp",
      specs: [
        { label: "เนื้อที่", value: "35–40 ตร.ว." },
        { label: "พื้นที่ใช้สอย", value: "155 ตร.ม." },
        { label: "ห้องนอน", value: "3" },
        { label: "ห้องน้ำ", value: "2" },
        { label: "ที่จอดรถ", value: "2 คัน" },
      ],
      floors: [
        { src: "/images/unit/type-s-f1.webp", label: "1st Floor Plan" },
        { src: "/images/unit/type-s-f2.webp", label: "2nd Floor Plan" },
        { src: "/images/unit/type-s-f3.webp", label: "3rd Floor Plan" },
      ],
    },
  ],
};
