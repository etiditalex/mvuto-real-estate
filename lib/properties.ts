/**
 * Compatibility helpers for existing pages. Listings now live in Supabase
 * (see lib/properties/getProperties.ts) with this catalog as fallback.
 */
export {
  STATIC_PROPERTY_CATALOG as propertiesForSale,
  type CatalogProperty as PropertyForSale,
  propertyPublicPath,
} from "./properties/catalog";
export { getStaticPropertyDetail as getPropertyForSaleById } from "./properties/getProperties";
