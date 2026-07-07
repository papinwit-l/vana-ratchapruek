import { getPosts, getFeaturedMedia, getImageUrl, getAltText } from "./api";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type GalleryData = {
  exterior: GalleryImage[];
  interior: GalleryImage[];
};

const FALLBACK: GalleryData = {
  exterior: [],
  interior: [],
};

export async function getGallery(): Promise<GalleryData> {
  try {
    const posts = await getPosts("gallery", {
      orderby: "menu_order",
      order: "asc",
    });

    const gallery: GalleryData = { exterior: [], interior: [] };

    for (const post of posts) {
      const media = getFeaturedMedia(post);
      const src = getImageUrl(media, "large");

      // Skip posts without a featured image
      if (!src) continue;

      const image: GalleryImage = {
        src,
        alt: getAltText(media, post.title.rendered),
      };

      const category = (post.acf as { gallery_category?: string })
        ?.gallery_category;

      if (category === "interior") {
        gallery.interior.push(image);
      } else {
        gallery.exterior.push(image);
      }
    }

    return gallery;
  } catch {
    return FALLBACK;
  }
}
