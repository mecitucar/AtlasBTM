"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { logo } from "@/lib/images";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/catalog", key: "catalog" },
  { href: "/sectors", key: "solutions", hasDropdown: true },
  { href: "/projects", key: "projects" },
  { href: "/contact", key: "contact" },
] as const;

const sectorKeys = ["prefab", "mining", "construction", "defense", "energy"] as const;

export function Header() {
  const t = useTranslations("nav");
  const ts = useTranslations("solutions");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [mobileSectorsOpen, setMobileSectorsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const langDropRef = useRef<HTMLDivElement>(null);
  const sectorsDropRef = useRef<HTMLDivElement>(null);
  const sectorsTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastScroll = useRef(0);

  const openSectors = useCallback(() => {
    clearTimeout(sectorsTimeout.current);
    setSectorsOpen(true);
  }, []);

  const closeSectors = useCallback(() => {
    sectorsTimeout.current = setTimeout(() => setSectorsOpen(false), 150);
  }, []);

  useEffect(() => {
    const handleScroll = (y: number) => {
      setScrolled(y > 20);
      if (y > lastScroll.current && y > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScroll.current = y;
    };

    const onWindowScroll = () => handleScroll(window.scrollY);

    let currentContainer: HTMLElement | null = null;
    let containerHandler: (() => void) | null = null;

    const attachContainer = () => {
      const el = document.querySelector("[data-scroll-container]") as HTMLElement | null;
      if (el === currentContainer) return;
      if (currentContainer && containerHandler) {
        currentContainer.removeEventListener("scroll", containerHandler);
      }
      currentContainer = el;
      if (el) {
        containerHandler = () => handleScroll(el.scrollTop);
        el.addEventListener("scroll", containerHandler, { passive: true });
      }
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    attachContainer();

    const observer = new MutationObserver(attachContainer);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      if (currentContainer && containerHandler) {
        currentContainer.removeEventListener("scroll", containerHandler);
      }
      observer.disconnect();
    };
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
    if (!sectorsDropRef.current) return;
    if (sectorsOpen) {
      gsap.fromTo(sectorsDropRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
    } else {
      gsap.to(sectorsDropRef.current,
        { opacity: 0, y: -8, duration: 0.15, ease: "power2.in" }
      );
    }
  }, [sectorsOpen]);

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

  const isSectorsPage = pathname.startsWith("/sectors");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-atlas-charcoal border-b-[3px] border-atlas-red"
          : "bg-atlas-charcoal/80 border-b-[3px] border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="shrink-0">
            <Image
              src={logo.transparent}
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

              if ("hasDropdown" in link && link.hasDropdown) {
                return (
                  <div
                    key={link.key}
                    className="relative"
                    onMouseEnter={openSectors}
                    onMouseLeave={closeSectors}
                  >
                    <button
                      onClick={() => setSectorsOpen(!sectorsOpen)}
                      className={`relative flex items-center gap-1 px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                        isActive ? "text-white" : "text-white hover:text-atlas-red"
                      }`}
                    >
                      {t(link.key)}
                      <ChevronDown className={`w-3 h-3 transition-transform ${sectorsOpen ? "rotate-180" : ""}`} />
                      {isActive && (
                        <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-white" />
                      )}
                    </button>
                    <div
                      ref={sectorsDropRef}
                      className={`absolute top-full left-0 mt-1 bg-white shadow-xl border border-atlas-warm overflow-hidden min-w-[260px] ${
                        sectorsOpen ? "pointer-events-auto" : "pointer-events-none"
                      }`}
                      style={{ opacity: 0 }}
                    >
                      <div className="py-2">
                        {sectorKeys.map((sk) => (
                          <Link
                            key={sk}
                            href={`/sectors/${sk}` as any}
                            onClick={() => setSectorsOpen(false)}
                            className="block px-5 py-3 text-[14px] font-medium text-atlas-charcoal hover:text-white hover:bg-atlas-red transition-colors tracking-wide"
                          >
                            {ts(`${sk}.title`)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={`relative px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                    isActive ? "text-white" : "text-white hover:text-atlas-red"
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
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium tracking-wide uppercase transition-colors rounded-sm text-white hover:text-atlas-red"
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

            if ("hasDropdown" in link && link.hasDropdown) {
              return (
                <div key={link.key}>
                  <button
                    onClick={() => setMobileSectorsOpen(!mobileSectorsOpen)}
                    className={`mobile-link w-full flex items-center justify-between px-4 py-3 text-[14px] font-medium tracking-wide uppercase transition-colors rounded-sm ${
                      isActive
                        ? "text-atlas-navy bg-atlas-sand"
                        : "text-atlas-slate hover:text-atlas-navy hover:bg-atlas-sand/50"
                    }`}
                  >
                    {t(link.key)}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSectorsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSectorsOpen && (
                    <div className="ml-4 border-l-2 border-atlas-red/20 pl-2 space-y-0.5 mt-1 mb-2">
                      {sectorKeys.map((sk) => (
                        <Link
                          key={sk}
                          href={`/sectors/${sk}` as any}
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2.5 text-[13px] font-medium text-atlas-slate hover:text-atlas-red transition-colors"
                        >
                          {ts(`${sk}.title`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

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
