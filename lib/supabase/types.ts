export type PropertyStatus = "available" | "ongoing" | "sold";
export type InquiryStatus = "new" | "read" | "responded" | "archived";
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost";

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "editor" | "viewer";
  phone: string | null;
  job_title: string | null;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: number;
  slug: string | null;
  title: string;
  location: string;
  type: string;
  price: string;
  price_amount: number | null;
  size: string;
  bedrooms: number | null;
  image: string;
  gallery: string[];
  status: PropertyStatus;
  featured: boolean;
  features: string[];
  description: string | null;
  h1: string | null;
  map_link: string | null;
  pricing: Record<string, string>;
  payment_plan: string | Record<string, string> | null;
  quick_info: Record<string, string>;
  total_units: number;
  sold_units: number;
  auto_sold_out: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  source: string;
  status: InquiryStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  property_id: number | null;
  property_name: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  source: string;
  status: LeadStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  properties: number;
  availableProperties: number;
  soldProperties: number;
  newInquiries: number;
  newLeads: number;
}
