import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function PhoenixAZ() {
  const data = locationPageData['phoenix-az'];
  return <LocationServicePage {...data} />;
}
