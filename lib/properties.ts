export interface PropertyForSale {
  id: string;
  name: string;
  location: string;
  image: string | null;
  price: string;
  deposit: string;
  installments: string;
}

export const propertiesForSale: PropertyForSale[] = [
  {
    id: "chumani",
    name: "Chumani Project",
    location: "Kilifi County",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Chumani_project_xbvsj7.jpg",
    price: "550,000",
    deposit: "200,000",
    installments: "12 monthly installments",
  },
  {
    id: "mariakani-kaloleni",
    name: "Mariakani–Kaloleni",
    location: "Mariakani, Coast Region",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_-Kaloleni_dadglm.jpg",
    price: "585,000",
    deposit: "200,000",
    installments: "12 monthly installments",
  },
  {
    id: "mariakani-bypass",
    name: "Mariakani Bypass",
    location: "Mariakani, Coast Region",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Mariakani_Bypass_qqjx8n.jpg",
    price: "350,000",
    deposit: "150,000",
    installments: "12 monthly installments",
  },
  {
    id: "diani",
    name: "Diani Project",
    location: "Diani, South Coast",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773041195/Diani_project_nugmc5.jpg",
    price: "1.95M",
    deposit: "700,000",
    installments: "12 monthly installments",
  },
  {
    id: "bofa",
    name: "Bofa Project",
    location: "Kilifi County",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Bofa_Project_slgq2b.jpg",
    price: "1.85M",
    deposit: "700,000",
    installments: "12 monthly installments",
  },
  {
    id: "kibao-kiche",
    name: "Kibao Kiche",
    location: "Coast Region",
    image:
      "https://res.cloudinary.com/dyfnobo9r/image/upload/v1773038630/Kibao_Kiche_eryng5.jpg",
    price: "550,000",
    deposit: "200,000",
    installments: "12 monthly installments",
  },
];

export interface PropertyForRent {
  id: string;
  name: string;
  location: string;
  image: string;
  price: string; // monthly rent
}

export const propertiesForRent: PropertyForRent[] = [
  {
    id: "rent-coastal-villa",
    name: "Coastal Villa",
    location: "Nyali, Mombasa",
    image: "https://picsum.photos/id/1/800/600",
    price: "85,000",
  },
  {
    id: "rent-garden-apartment",
    name: "Garden Apartment",
    location: "Diani, South Coast",
    image: "https://picsum.photos/id/2/800/600",
    price: "45,000",
  },
  {
    id: "rent-beach-house",
    name: "Beach House",
    location: "Kilifi",
    image: "https://picsum.photos/id/3/800/600",
    price: "120,000",
  },
  {
    id: "rent-modern-flat",
    name: "Modern Flat",
    location: "Mombasa CBD",
    image: "https://picsum.photos/id/4/800/600",
    price: "55,000",
  },
  {
    id: "rent-family-home",
    name: "Family Home",
    location: "Malindi",
    image: "https://picsum.photos/id/5/800/600",
    price: "65,000",
  },
  {
    id: "rent-studio",
    name: "Studio Apartment",
    location: "Bamburi, Mombasa",
    image: "https://picsum.photos/id/6/800/600",
    price: "32,000",
  },
];

export function getPropertyForSaleById(id: string): PropertyForSale | undefined {
  return propertiesForSale.find((p) => p.id === id);
}

export function getPropertyForRentById(id: string): PropertyForRent | undefined {
  return propertiesForRent.find((p) => p.id === id);
}
