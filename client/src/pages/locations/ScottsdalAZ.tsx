import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function ScottsdalAZ() {
  const data = locationPageData['scottsdale-az'];
  return <LocationServicePage {...data} />;
}
