import { getSocialLinks } from "@/lib/api/social-links";
import { Footer } from "./footer";

export async function FooterWrapper() {
  const socialLinks = await getSocialLinks();
  return <Footer socialLinks={socialLinks} />;
}
