import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export const navLinks = [
  {
    label: "Home",
    href: "/",
    title: ["Construction Chemicals", "Tiling Solution & Waterproofing Solution"],
    bgImage: "/img/home.png",
  },
  {
    label: "About",
    href: "/about-us",
    title: "About Us",
    bgImage: "/img/home.png",
  },
  {
    label: "Products",
    href: "/product",
    title: "Products",
    bgImage: "/img/home.png",
  },
  {
    label: "Blog",
    href: "/blog",
    title: "Blog",
    bgImage: "/img/home.png",
  },
  {
    label: "Projects",
    href: "/projects",
    title: "Projects",
    bgImage: "/img/home.png",},
  {
    label: "Contact Us",
    href: "/contact-us",
    title: "Contact Us",
    bgImage: "/img/home.png",
  },
];

export const fallbackPages = {
  "/brochure": {
    title: "Brochure",
    bgImage: "/img/home1.png",
  },
  "/faq": {
    title: "FAQ",
    bgImage: "/img/home1.png",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    bgImage: "/img/home1.png",
  },
  "/terms-condition": {
    title: "Terms & Condition",
    bgImage: "/img/home1.png",
  },
};

export const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/product" },
];

export const informationLinks = [
  { label: "Contact Us", href: "/contact-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Condition", href: "/terms-condition" },
];

export const contactInfo = [
  {
    icon: <FaMapMarkerAlt className=" mt-1 flex-shrink-0" />,
    label: "Address",
    value: "Rexino Chemical Industries, India",
  },
  {
    icon: <FaPhoneAlt className=" flex-shrink-0" />,
    label: "Phone",
    value: "+91 90168 90128",
    href: "tel:+919016890128",
  },
  {
    icon: <FaEnvelope className=" flex-shrink-0" />,
    label: "Email",
    value: "rexinoindustries@gmail.com",
    href: "mailto:rexinoindustries@gmail.com",
  },
];

export const brandingLinks = [
  { src: "/img/branding/tiger.png", alt: "Make in India" },
  { src: "/img/branding/iso.png", alt: "ISO 9001:2015" },
  { src: "/img/branding/bharat.png", alt: "Swachch Bharat" },
];

export const socialLinks = [
  {
    icon: <FaFacebookF className="w-4 h-4" />,
    href: "https://www.facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaLinkedinIn className="w-4 h-4" />,
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
  },
  {
    icon: <FaInstagram className="w-4 h-4" />,
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: <FaYoutube className="w-4 h-4" />,
    href: "https://www.youtube.com",
    label: "YouTube",
  },
];
