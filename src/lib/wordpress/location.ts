import { getPosts } from "./api";

export type Distance = {
  value: string;
  label: string;
};

export type LocationData = {
  mapImage: string;
  googleMapsUrl: string;
  distances: Distance[];
  description: string;
};

const FALLBACK: LocationData = {
  mapImage: "/images/location-map.png",
  googleMapsUrl: "",
  distances: [
    { value: "1.3 km", label: "from Jomtien Beach" },
    { value: "6.9 km", label: "from Pattaya Beach" },
  ],
  description:
    "<p>Positioned on the <strong>sea-facing side of Jomtien</strong>, <strong>KAILANI</strong> occupies one of the area&#8217;s most underserved corridors for high-end private villa developments.</p>\n<p>With the beach less than a kilometre away and limited competing inventory in the immediate vicinity, the project benefits from both <em>lifestyle desirability and long-term scarcity value.</em></p>\n",
};

export async function getLocation(): Promise<LocationData> {
  try {
    const posts = await getPosts("location", { per_page: 1 }, { embed: false });
    const post = posts[0];
    if (!post) return FALLBACK;

    const acf = post.acf as {
      map_image?: string;
      google_maps_embed?: string;
      distances?: string;
      description?: string;
    };

    // console.log(acf);

    return {
      mapImage: acf.map_image || FALLBACK.mapImage,
      googleMapsUrl: acf.google_maps_embed || FALLBACK.googleMapsUrl,
      description: acf.description || "",
      distances: acf.distances
        ? acf.distances
            .split(/\r?\n/)
            .filter(Boolean)
            .map((line) => {
              const [value, label] = line.split("|").map((s) => s.trim());
              return { value: value || "", label: label || "" };
            })
        : FALLBACK.distances,
    };
  } catch {
    return FALLBACK;
  }
}
