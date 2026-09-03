export type StaticTestimonial = {
  id: number;
  name: string;
  location: string;
  property: string;
  rating: number;
  text: string;
  image: string;
  sort_order: number;
};

export const STATIC_TESTIMONIALS: StaticTestimonial[] = [
  {
    id: 1,
    name: "Amina Mwangi",
    location: "Nairobi / Kilifi",
    property: "Chumani Project",
    rating: 5,
    text: "The team walked us through due diligence and the payment plan with no pressure. We visited the site, understood the title, and completed our instalments with regular updates.",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1788437007/who_we_are_lys4wa.jpg",
    sort_order: 0,
  },
  {
    id: 2,
    name: "James Otieno",
    location: "Mombasa",
    property: "Mariakani Bypass",
    rating: 5,
    text: "I wanted an accessible Coast plot without a beach premium. MVUTO showed me Mariakani Bypass, explained every cost, and stayed available until handover.",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_Bypass_qqjx8n.jpg",
    sort_order: 1,
  },
  {
    id: 3,
    name: "Sarah Njeri",
    location: "Diaspora — UK",
    property: "Diani Project",
    rating: 5,
    text: "Buying from abroad usually feels risky. MVUTO sent clear photos, a written plan, and answered every question. I always knew where my paperwork stood.",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    sort_order: 2,
  },
];
