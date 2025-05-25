import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ConnectPage from "@/components/instagram/ConnectPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js Instagram Connect Page | OLA AI Dashboard Instagram Connect Page",
  description: "This is the connect page for Instagram",
};

export default function Connect() {
  return (
    <div>
      <PageBreadcrumb
        links={{ name: "Instagram", href: "/instagram/" }}
        pageTitle="Connect & Disconnect"
      />
      <ConnectPage />
    </div>
  );
}
