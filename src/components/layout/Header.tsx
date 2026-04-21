"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = (newLocale: "fr" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-atlas-charcoal flex items-center justify-center">
              <span className="text-white font-[var(--font-heading)] font-bold text-lg tracking-tight">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-[var(--font-heading)] font-semibold text-[15px] tracking-tight leading-none transition-colors ${
                  scrolled ? "text-atlas-navy" : "text-white"
                }`}
              >
                ATLAS
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] uppercase leading-none mt-0.5 transition-colors ${
                  scrolled ? "text-atlas-slate" : "text-white/70"
                }`}
              >
                Batiment Modulaire
              </span>
            </div>
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
                      ? scrolled
                        ? "text-atlas-navy"
                        : "text-white"
                      : scrolled
                        ? "text-atlas-slate hover:text-atlas-navy"
                        : "text-white/70 hover:text-white"
                  }`}
                >
                  {t(link.key)}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className={`absolute bottom-0 left-4 right-4 h-[2px] ${
                        scrolled ? "bg-atlas-red" : "bg-atlas-red"
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium tracking-wide uppercase transition-colors rounded-sm ${
                  scrolled
                    ? "text-atlas-slate hover:text-atlas-navy"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
                <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-sm border border-atlas-warm overflow-hidden min-w-[100px]"
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
                  </motion.div>
                )}
              </AnimatePresence>
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
            className={`lg:hidden p-2 transition-colors ${
              scrolled ? "text-atlas-navy" : "text-white"
            }`}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-atlas-warm overflow-hidden"
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
                    className={`block px-4 py-3 text-[14px] font-medium tracking-wide uppercase transition-colors rounded-sm ${
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
