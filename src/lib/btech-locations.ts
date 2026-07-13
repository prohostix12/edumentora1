export interface BTechLocation {
  slug: string;
  label: string;
  place: string;
}

export const btechLocations: BTechLocation[] = [
  {
    slug: "alappuzha",
    label: "B Tech Credit Transfer Alappuzha",
    place: "Alappuzha",
  },
  {
    slug: "ernakulam",
    label: "B Tech Credit Transfer Ernakulam",
    place: "Ernakulam",
  },
  {
    slug: "idukki",
    label: "B Tech Credit Transfer Idukki",
    place: "Idukki",
  },
  {
    slug: "palakkad",
    label: "B Tech Credit Transfer Palakkad",
    place: "Palakkad",
  },
  {
    slug: "wayanad",
    label: "B Tech Credit Transfer Wayanad",
    place: "Wayanad",
  },
  {
    slug: "kannur",
    label: "B Tech Credit Transfer Kannur",
    place: "Kannur",
  },
  {
    slug: "kasaragod",
    label: "B Tech Credit Transfer Kasaragod",
    place: "Kasaragod",
  },
  {
    slug: "kollam",
    label: "B Tech Credit Transfer Kollam",
    place: "Kollam",
  },
  {
    slug: "pathanamthitta",
    label: "B Tech Credit Transfer Pathanamthitta",
    place: "Pathanamthitta",
  },
  {
    slug: "kochi",
    label: "BTech Credit Transfer in Kochi",
    place: "Kochi",
  },
  {
    slug: "kottayam",
    label: "B Tech Credit Transfer Kottayam",
    place: "Kottayam",
  },
  {
    slug: "kozhikode",
    label: "B Tech Credit Transfer Kozhikode",
    place: "Kozhikode",
  },
  {
    slug: "malappuram",
    label: "B Tech Credit Transfer Malappuram",
    place: "Malappuram",
  },
  {
    slug: "thrissur",
    label: "B Tech Credit Transfer Thrissur",
    place: "Thrissur",
  },
  {
    slug: "thiruvananthapuram",
    label: "B Tech Credit Transfer Thiruvananthapuram",
    place: "Thiruvananthapuram",
  },
];

export function getBTechLocationBySlug(slug: string) {
  return btechLocations.find((item) => item.slug === slug);
}
