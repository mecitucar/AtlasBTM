"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/solutions", key: "solutions" },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langDropRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastScroll.current && y > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
      );
      const links = mobileMenuRef.current.querySelectorAll(".mobile-link");
      gsap.from(links, {
        x: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.out", delay: 0.1,
      });
    } else {
      gsap.to(mobileMenuRef.current,
        { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" }
      );
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!langDropRef.current) return;
    if (langOpen) {
      gsap.fromTo(langDropRef.current,
        { opacity: 0, y: -8, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(langDropRef.current,
        { opacity: 0, y: -8, scale: 0.95, duration: 0.15, ease: "power2.in" }
      );
    }
  }, [langOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-atlas-charcoal/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.2)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo-transparent.png"
              alt="Atlas Batiment Modulaire"
              width={180}
              height={50}
              className="h-11 w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t(link.key)}
                  {isActive && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-atlas-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium tracking-wide uppercase transition-colors rounded-sm text-white/70 hover:text-white"
              >
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div
                ref={langDropRef}
                className={`absolute top-full right-0 mt-1 bg-white shadow-lg rounded-sm border border-atlas-warm overflow-hidden min-w-[100px] ${
                  langOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => switchLocale("fr")}
                  className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium tracking-wide hover:bg-atlas-sand transition-colors ${
                    locale === "fr" ? "text-atlas-navy bg-atlas-sand" : "text-atlas-slate"
                  }`}
                >
                  Francais
                </button>
                <button
                  onClick={() => switchLocale("en")}
                  className={`block w-full text-left px-4 py-2.5 text-[13px] font-medium tracking-wide hover:bg-atlas-sand transition-colors ${
                    locale === "en" ? "text-atlas-navy bg-atlas-sand" : "text-atlas-slate"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <Link
              href="/contact"
              className="bg-atlas-red hover:bg-atlas-red-dark text-white text-[13px] font-bold tracking-wide uppercase px-6 py-2.5 transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 transition-colors text-white"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        ref={mobileMenuRef}
        className="lg:hidden bg-white border-t border-atlas-warm overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`mobile-link block px-4 py-3 text-[14px] font-medium tracking-wide uppercase transition-colors rounded-sm ${
                  isActive
                    ? "text-atlas-navy bg-atlas-sand"
                    : "text-atlas-slate hover:text-atlas-navy hover:bg-atlas-sand/50"
                }`}
              >
                {t(link.key)}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-atlas-warm mt-4 flex gap-2">
            <button
              onClick={() => { switchLocale("fr"); setMobileOpen(false); }}
              className={`flex-1 py-2.5 text-[13px] font-medium tracking-wide uppercase rounded-sm transition-colors ${
                locale === "fr"
                  ? "bg-atlas-red text-white"
                  : "bg-atlas-sand text-atlas-slate"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => { switchLocale("en"); setMobileOpen(false); }}
              className={`flex-1 py-2.5 text-[13px] font-medium tracking-wide uppercase rounded-sm transition-colors ${
                locale === "en"
                  ? "bg-atlas-red text-white"
                  : "bg-atlas-sand text-atlas-slate"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
