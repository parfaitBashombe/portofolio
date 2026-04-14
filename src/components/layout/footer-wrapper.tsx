import Footer from "./footer";
import { ISocialLink } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const FooterWrapper = async () => {
  let socialLinks: ISocialLink[] = [];

  try {
    const res = await fetch(`${BASE_URL}/api/social-links`, {
      cache: "no-store",
    });
    if (res.ok) socialLinks = await res.json();
  } catch (err) {
    console.error(err);
  }

  return <Footer socialLinks={socialLinks} />;
};
