"use client";

import { useTranslations } from "next-intl";
import { useRef, useState, useCallback, useTransition } from "react";
import { Phone, Mail, MapPin, Send, Upload, ClipboardList, Users, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { BlueprintGrid } from "@/components/ui/BlueprintGrid";
import { sendContactForm } from "@/app/actions/contact";

export function ContactPage() {
  const t = useTranslations("contact");
  const heroRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles(prev => {
      const combined = [...prev, ...Array.from(newFiles)];
      return combined.slice(0, 5);
    });
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    files.forEach((file) => formData.append("files", file));

    startTransition(async () => {
      const result = await sendContactForm(formData);
      if (result.success) {
        setStatus("success");
        form.reset();
        setFiles([]);
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    });
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".ch-label", { y: 30, opacity: 0, duration: 0.6 }, 0.2);
    tl.from(".ch-title", { y: 50, opacity: 0, duration: 0.9 }, 0.3);
    tl.from(".ch-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, 0.7);
    tl.from(".ch-desc", { y: 20, opacity: 0, duration: 0.6 }, 0.9);
  }, { scope: heroRef });

  useGSAP(() => {
    gsap.from(".cf-reveal", {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out",
      scrollTrigger: { trigger: ".cf-form", start: "top 80%" },
    });
    gsap.from(".ci-card", {
      y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
      scrollTrigger: { trigger: ".ci-card", start: "top 85%" },
    });
    gsap.from(".ci-item", {
      x: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: ".ci-card", start: "top 80%" },
    });
  }, { scope: container });

  const inputCls = "w-full px-5 py-4 bg-white border border-atlas-charcoal/10 text-[15px] text-atlas-charcoal placeholder:text-atlas-charcoal/35 focus:outline-none focus:border-atlas-red/40 focus:ring-1 focus:ring-atlas-red/10 transition-all";

  const processSteps = [
    { icon: Phone, num: "01", text: t("process.step1") },
    { icon: ClipboardList, num: "02", text: t("process.step2") },
    { icon: Users, num: "03", text: t("process.step3") },
    { icon: FileText, num: "04", text: t("process.step4") },
  ];

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative h-[calc(100vh-100px)] min-h-[600px] flex items-end overflow-hidden border-b-[3px] border-atlas-red">
        <div className="absolute inset-0">
          <Image src="/images/contact-hero.jpg" alt="Vue aerienne camp modulaire Atlas" fill className="object-cover" sizes="100vw" quality={90} priority />
          <div className="absolute inset-0 bg-atlas-charcoal/50" />
        </div>
        <div className="relative z-10 pb-20 lg:pb-28 pt-32 w-full">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
            <span className="ch-label text-[12px] tracking-[0.3em] uppercase text-atlas-red font-bold block">
              {t("title")}
            </span>
            <h1 className="ch-title font-[var(--font-heading)] text-[clamp(2.5rem,5.5vw,5rem)] font-black text-white mt-5 leading-[0.95] tracking-tighter max-w-[700px]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
              {t("subtitle")}
            </h1>
            <div className="ch-line w-20 h-[3px] bg-atlas-red mt-8 mb-8" />
            <p className="ch-desc text-[19px] text-white/80 leading-relaxed max-w-[500px]">
              {t("quoteSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards - Kirmizi strip */}
      <section className="relative bg-atlas-red overflow-hidden">
        <BlueprintGrid opacity={0.08} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="flex items-center gap-5 py-8 md:pr-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.phone")}</span>
                <span className="text-[17px] text-white font-bold mt-1 block">+224 624 24 19 77</span>
                <span className="text-[15px] text-white/80 font-semibold block">+224 622 38 35 01</span>
              </div>
            </div>
            <div className="flex items-center gap-5 py-8 md:px-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.email")}</span>
                <a href="mailto:atlasbatimodulaire@gmail.com" className="text-[17px] text-white font-bold mt-1 block hover:text-white/80 transition-colors">
                  atlasbatimodulaire@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-5 py-8 md:pl-10">
              <div className="w-12 h-12 bg-white/15 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[12px] text-white/50 uppercase tracking-wider font-medium block">{t("info.address")}</span>
                <span className="text-[17px] text-white font-bold mt-1 block">Maneah, Conakry, Guinee</span>
                <span className="text-[15px] text-white/80 font-semibold block">Kankan, Guinee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form + Process */}
      <section ref={container} className="py-24 lg:py-32 bg-background">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="cf-form">
                <h2 className="cf-reveal font-[var(--font-heading)] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-atlas-charcoal tracking-tight">
                  {t("getQuote")}
                </h2>
                <p className="cf-reveal text-[16px] text-atlas-charcoal/60 mt-3 leading-relaxed max-w-[550px]">
                  {t("quoteSubtitle")}
                </p>
                <div className="cf-reveal w-16 h-[3px] bg-atlas-red mt-6 mb-10" />

                <p className="cf-reveal text-[13px] text-atlas-charcoal/40 mb-8">
                  <span className="text-atlas-red">*</span> {t("form.required")}
                </p>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="cf-reveal">
                    <input type="text" name="name" required placeholder={`${t("form.name")} *`} className={inputCls} />
                  </div>

                  <div className="cf-reveal">
                    <input type="email" name="email" required placeholder={`${t("form.email")} *`} className={inputCls} />
                  </div>

                  <div className="cf-reveal">
                    <input type="text" name="company" placeholder={t("form.company")} className={inputCls} />
                  </div>

                  <div className="cf-reveal">
                    <input type="text" name="subject" placeholder={t("form.subject")} className={inputCls} />
                  </div>

                  <div className="cf-reveal">
                    <textarea
                      name="description"
                      required
                      rows={5}
                      placeholder={`${t("form.description")} *`}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  {/* File Upload */}
                  <div className="cf-reveal">
                    <div
                      className={`border-2 border-dashed rounded-sm py-10 px-6 text-center cursor-pointer transition-colors ${
                        dragOver
                          ? "border-atlas-red/50 bg-atlas-red/5"
                          : "border-atlas-charcoal/15 hover:border-atlas-charcoal/30"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFiles(e.dataTransfer.files);
                      }}
                    >
                      <Upload className="w-8 h-8 text-atlas-charcoal/30 mx-auto mb-3" />
                      <p className="text-[15px] text-atlas-charcoal/70 font-medium">
                        {t("form.attachFiles")}
                      </p>
                      <p className="text-[13px] text-atlas-charcoal/40 mt-1">
                        {t("form.attachFilesLimit")}
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => handleFiles(e.target.files)}
                      />
                    </div>

                    {files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {files.map((file, i) => (
                          <div key={i} className="flex items-center justify-between bg-atlas-charcoal/5 px-4 py-2.5 text-[14px]">
                            <span className="text-atlas-charcoal/70 truncate mr-3">{file.name}</span>
                            <button type="button" onClick={() => removeFile(i)} className="text-atlas-charcoal/40 hover:text-atlas-red transition-colors shrink-0">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-[13px] text-atlas-red/70 mt-3">
                      {t("form.attachFilesNote")}
                    </p>
                  </div>

                  <div className="cf-reveal">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        name="consent"
                        required
                        className="mt-1 w-4 h-4 shrink-0 accent-atlas-red"
                      />
                      <span className="text-[14px] text-atlas-charcoal/60 leading-relaxed">
                        {t("form.consent")}{" "}
                        <Link href="/privacy" className="text-atlas-red hover:text-atlas-red-dark underline transition-colors">
                          {t("form.consentLink")}
                        </Link>.
                      </span>
                    </label>
                  </div>

                  <div className="cf-reveal flex items-center gap-4">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="group inline-flex items-center gap-3 bg-atlas-red hover:bg-atlas-red-dark disabled:opacity-60 disabled:cursor-not-allowed text-white px-9 py-5 text-[15px] font-bold tracking-wider uppercase transition-colors"
                    >
                      {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {t("form.send")}
                    </button>

                    {status === "success" && (
                      <span className="inline-flex items-center gap-2 text-green-600 text-[14px] font-medium">
                        <CheckCircle2 className="w-5 h-5" />
                        {t("form.successMessage")}
                      </span>
                    )}
                    {status === "error" && (
                      <span className="text-atlas-red text-[14px] font-medium">
                        {t("form.errorMessage")}
                      </span>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Teklif Sureci - Side card */}
            <div className="lg:col-span-5">
              <div className="ci-card bg-atlas-charcoal p-8 lg:p-10">
                <h3 className="font-[var(--font-heading)] text-[clamp(1.5rem,2.5vw,2rem)] font-black text-white tracking-tight">
                  {t("process.title")}
                </h3>
                <div className="w-12 h-[3px] bg-atlas-red mt-5 mb-10" />

                <div className="space-y-8">
                  {processSteps.map((step) => (
                    <div key={step.num} className="ci-item flex items-start gap-5">
                      <div className="flex items-center gap-3 shrink-0">
                        <step.icon className="w-5 h-5 text-atlas-red/70" />
                        <span className="text-[18px] font-[var(--font-heading)] font-black text-white">{step.num}</span>
                      </div>
                      <p className="text-[15px] text-white/70 leading-relaxed font-medium pt-0.5">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-atlas-warm/60 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30000!2d-13.404598!3d9.711116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf1cd10f616fa64f%3A0x2a81b09c8ad67c70!2sManeah%2C%20Guinea!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Atlas BTM - Maneah, Conakry, Guinee"
                  />
                  <div className="bg-atlas-charcoal px-4 py-3 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-atlas-red shrink-0" />
                    <div>
                      <span className="text-[13px] font-semibold text-white block">Guinee</span>
                      <span className="text-[12px] text-white/50">Maneah, Conakry, Guinee</span>
                    </div>
                  </div>
                </div>
                <div className="border border-atlas-warm/60 overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30000!2d-9.310239!3d10.382001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf0c50939e60e20f%3A0x765fc481e2b1f25a!2sKankan%2C%20Guinea!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Atlas BTM - Kankan, Guinee"
                  />
                  <div className="bg-atlas-charcoal px-4 py-3 flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-atlas-red shrink-0" />
                    <div>
                      <span className="text-[13px] font-semibold text-white block">Guinee — Kankan</span>
                      <span className="text-[12px] text-white/50">Kankan, Guinee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
