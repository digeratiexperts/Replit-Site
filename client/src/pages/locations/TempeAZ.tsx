import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function TempeAZ() {
  const data = locationPageData['tempe-az'];
  return <LocationServicePage {...data} />;
}
