import GenericServicePage from "@/pages/GenericServicePage";
import { servicePageData } from "@/pages/routes/servicePages";

/** Dedicated route kept for MegaMenu/bookmarks; narrative lives in pageNarratives. */
export default function ManagedITSupport() {
  const data = servicePageData["managed-it-support"];
  return (
    <GenericServicePage
      {...data}
      serviceKey="managed-it-support"
      canonical="/solutions/managed-it-support"
    />
  );
}
