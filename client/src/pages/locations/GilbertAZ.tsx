import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function GilbertAZ() {
  const data = locationPageData['gilbert-az'];
  return <LocationServicePage {...data} />;
}
