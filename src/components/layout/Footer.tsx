"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="bg-atlas-navy text-white/80">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
        <div className="py-10 lg:py-10 grid grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-8 lg:gap-10">
          {/* Logo + description */}
          <div className="col-span-2 lg:col-span-1">
            <Image
              src="/images/logo-transparent.png"
              alt="Atlas Bâtiment Modulaire"
              width={200}
              height={56}
              className="h-10 sm:h-11 w-auto mb-4"
            />
            <p className="text-[13px] sm:text-[14px] leading-relaxed text-white/45 max-w-[300px]">
              {t("description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[var(--font-heading)] font-semibold text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white mb-4 lg:mb-5">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {(["home", "about", "products", "projects", "contact"] as const).map(
                (key) => (
                  <li key={key}>
                    <Link
                      href={key === "home" ? "/" : `/${key}`}
                      className="text-[13px] text-white/50 hover:text-white transition-colors"
                    >
                      {nav(key)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Sectors */}
          <div>
            <h4 className="font-[var(--font-heading)] font-semibold text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white mb-4 lg:mb-5">
              {nav("solutions")}
            </h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {[
                { label: "Container Préfabriqué", href: "/sectors/prefab" },
                { label: "Camps Minière", href: "/sectors/mining" },
                { label: "Camps Construction", href: "/sectors/construction" },
                { label: "Industrie Défense", href: "/sectors/defense" },
                { label: "Project Énergétique", href: "/sectors/energy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as any}
                    className="text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-[var(--font-heading)] font-semibold text-[11px] sm:text-[12px] tracking-[0.15em] uppercase text-white mb-4 lg:mb-5">
              {t("contactUs")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-atlas-red shrink-0" />
                <span className="text-[13px] text-white/60">+32 490 10 49 05</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-atlas-red shrink-0" />
                <a
                  href="mailto:atlasbatimodulaire@gmail.com"
                  className="text-[13px] text-white/60 hover:text-white transition-colors break-all"
                >
                  atlasbatimodulaire@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-3.5 h-3.5 text-atlas-red shrink-0" />
                <span className="text-[13px] text-white/60">Europe</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/40">
            &copy; {new Date().getFullYear()} Atlas Bâtiment Modulaire. {t("rights")}
          </p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/contact" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/contact" className="text-[12px] text-white/40 hover:text-white/70 transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
