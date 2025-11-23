import { LocationServicePage } from "./LocationServicePage";
import { locationPageData } from "@/pages/routes/locationPages";

export default function MesaAZ() {
  const data = locationPageData['mesa-az'];
  return <LocationServicePage {...data} />;
}
