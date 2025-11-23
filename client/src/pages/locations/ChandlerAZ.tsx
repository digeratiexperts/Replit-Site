import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function ChandlerAZ() {
  const data = locationPageData['chandler-az'];
  return <LocationServicePage {...data} />;
}
