"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PhoneScreen, Slide } from "@/lib/slides";

type PresentationProps = {
  slides: Slide[];
};

const initials = ["АК", "ДС", "МТ", "ЕЖ"];

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M8 3H3v5" />
      <path d="M16 3h5v5" />
      <path d="M21 16v5h-5" />
      <path d="M3 16v5h5" />
    </svg>
  );
}

function BrandLogo({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`brand-logo ${centered ? "centered" : ""}`} aria-label="BirGe">
      <img src="/birge-logo.jpg" alt="" />
      <span>BirGe</span>
    </div>
  );
}

function renderWithHighlight(text: string, highlight?: string) {
  if (!highlight || !text.includes(highlight)) return text;
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="accent-phrase">{highlight}</span>
      {after}
    </>
  );
}

function PhoneMockup({ screen, scale = 0.5, shadow = false }: { screen: PhoneScreen; scale?: number; shadow?: boolean }) {
  const hasCaption = scale <= 0.52;

  return (
    <figure className={`phone-figure ${hasCaption ? "has-caption" : ""}`} style={{ "--phone-scale": scale } as React.CSSProperties}>
      <div className={`phone ${shadow ? "phone-shadow" : ""}`}>
        <div className="phone-status">
          <span>9:41</span>
          <span className="phone-battery" />
        </div>
        <PhoneBody screen={screen} />
        {screen.kind === "home" ? (
          <div className="phone-tabs">
            <span className="active">Лента</span>
            <span>Команда</span>
            <span>Корзина</span>
          </div>
        ) : (
          <div className="phone-home-indicator" />
        )}
      </div>
      {hasCaption ? <figcaption>{screen.label}</figcaption> : null}
    </figure>
  );
}

function PhoneImage({ src, alt, scale = 0.76, shadow = false }: { src: string; alt: string; scale?: number; shadow?: boolean }) {
  return (
    <figure className="phone-figure" style={{ "--phone-scale": scale } as React.CSSProperties}>
      <div className={`phone phone-photo ${shadow ? "phone-shadow" : ""}`}>
        <img src={src} alt={alt} />
      </div>
    </figure>
  );
}

function ProductCard({ name, oldPrice, teamPrice }: { name: string; oldPrice: string; teamPrice: string }) {
  return (
    <div className="phone-product">
      <div className="phone-product-image">фото товара</div>
      <div className="phone-product-info">
        <div className="phone-product-name">{name}</div>
        <div className="phone-product-price">
          <span className="old">{oldPrice}</span>
          <span className="team">{teamPrice}</span>
        </div>
      </div>
    </div>
  );
}

function TeamBlock() {
  return (
    <>
      <h3 className="phone-heading">Моя команда</h3>
      <div className="phone-code-card">
        <span>Код приглашения</span>
        <strong>BG-7K4F</strong>
      </div>
      <div className="phone-avatars">
        {initials.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="phone-progress">
        <i />
      </div>
      <div className="phone-progress-row">
        <span className="green">Скидка 20%</span>
        <span>максимум 30%</span>
      </div>
      <div className="phone-spacer" />
      <div className="phone-button">Пригласить друга</div>
    </>
  );
}

function PhoneBody({ screen }: { screen: PhoneScreen }) {
  if (screen.kind === "login") {
    return (
      <div className="phone-body">
        <BrandLogo centered />
        <h3 className="phone-heading centered">Вход</h3>
        <div className="phone-field filled">+7 700 123 45 67</div>
        <div className="phone-field">Пароль</div>
        <div className="phone-button">Войти</div>
        <div className="phone-link">Создать аккаунт</div>
      </div>
    );
  }

  if (screen.kind === "sms") {
    return (
      <div className="phone-body">
        <h3 className="phone-heading centered sms-title">Код из SMS</h3>
        <p className="phone-sub centered">Отправили на +7 700 123 45 67</p>
        <div className="phone-code">
          <i>4</i>
          <i>8</i>
          <i>2</i>
          <i className="active" />
        </div>
        <div className="phone-link">Отправить код ещё раз</div>
      </div>
    );
  }

  if (screen.kind === "interests") {
    return (
      <div className="phone-body">
        <h3 className="phone-heading">Что вам интересно?</h3>
        <div className="phone-chips">
          {["Электроника", "Мода", "Дом", "Спорт", "Красота", "Гаджеты", "Детям"].map((chip) => (
            <span key={chip} className={["Электроника", "Дом", "Гаджеты"].includes(chip) ? "selected" : ""}>
              {chip}
            </span>
          ))}
        </div>
        <div className="phone-spacer" />
        <div className="phone-button">Продолжить</div>
      </div>
    );
  }

  if (screen.kind === "home") {
    return (
      <div className="phone-body">
        <div className="phone-search">Поиск товаров</div>
        <p className="phone-section">Для вас</p>
        <ProductCard name="Беспроводные наушники" oldPrice="58 000 ₸" teamPrice="46 400 ₸" />
        <ProductCard name="Кроссовки" oldPrice="42 000 ₸" teamPrice="33 600 ₸" />
      </div>
    );
  }

  if (screen.kind === "team") {
    return (
      <div className="phone-body">
        <TeamBlock />
      </div>
    );
  }

  if (screen.kind === "cart") {
    return (
      <div className="phone-body">
        <h3 className="phone-heading">Корзина</h3>
        <div className="phone-segment">
          <span>Личная</span>
          <span className="active">Командная</span>
        </div>
        <PhoneRow left="Беспроводные наушники" right="58 000 ₸" />
        <PhoneRow left="Кроссовки" right="42 000 ₸" />
        <div className="phone-divider" />
        <PhoneRow left="Скидка −20%" right="−20 000 ₸" tone="green" />
        <PhoneRow left="Итого" right="80 000 ₸" tone="total" />
        <div className="phone-spacer" />
        <div className="phone-button">К оформлению</div>
      </div>
    );
  }

  return (
    <div className="phone-body">
      <h3 className="phone-heading">Checkout</h3>
      <div className="phone-badge">демо-режим</div>
      <PhoneRow left="Товары" right="100 000 ₸" tone="muted" />
      <PhoneRow left="Скидка команды" right="−20 000 ₸" tone="green" />
      <div className="phone-divider" />
      <PhoneRow left="Итого" right="80 000 ₸" tone="total" />
      <div className="phone-spacer" />
      <div className="phone-button">Оплатить · демо</div>
    </div>
  );
}

function PhoneRow({ left, right, tone }: { left: string; right: string; tone?: "green" | "muted" | "total" }) {
  return (
    <div className={`phone-row ${tone ?? ""}`}>
      <span>{left}</span>
      <strong>{right}</strong>
    </div>
  );
}

function SlideView({ slide, revealed = false }: { slide: Slide; revealed?: boolean }) {
  switch (slide.kind) {
    case "title":
      return (
        <section className="slide slide-cover">
          <div className="cover-copy rise">
            <BrandLogo />
            <h1>{slide.title}</h1>
            <p>{slide.subtitle}</p>
            <div className="tag">{slide.tag}</div>
          </div>
          <div className="cover-device rise delay-2">
            <PhoneImage src="/mvp/home.jpg" alt="Главный экран BirGe" scale={0.76} shadow />
          </div>
        </section>
      );
    case "cards":
      return (
        <section className="slide">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />
          <div className="cards3 rise delay-2">
            {slide.cards.map((card) => (
              <article key={card.number} className="info-card">
                <span>{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>
      );
    case "solution":
      return (
        <section className="slide">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />
          <div className="solution-layout">
            <div className="solution-steps rise delay-2">
              {slide.steps.map((step) => (
                <article key={step.number} className="solution-step">
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{renderWithHighlight(step.text, step.highlight)}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="rise delay-3">
              <PhoneMockup screen={slide.phone} scale={0.62} shadow />
            </div>
          </div>
        </section>
      );
    case "flow":
      return (
        <section className="slide">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />
          <div className="flow-diagram rise delay-2">
            <div className="flow-line" />
            {slide.steps.map((step) => (
              <article key={step.number} className={`flow-node ${step.hot ? "hot" : ""}`}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <div className="flow-badge rise delay-3">{slide.badge}</div>
        </section>
      );
    case "mechanics":
      return (
        <section className="slide slide-mechanics">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} centered />
          <div className="mechanics-card rise delay-2">
            <div className="mechanics-team">
              <div className="mechanics-avatars">
                {initials.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <strong>{slide.teamLabel}</strong>
              <em>{slide.discount}</em>
            </div>
            <div className="mechanics-price">
              <span>{slide.oldPrice}</span>
              <strong>{slide.newPrice}</strong>
              <em>{slide.saving}</em>
            </div>
            <div className="mechanics-progress">
              <div>
                <i />
              </div>
              <p>
                <span>{slide.progressLabel}</span>
                <strong>{slide.maxLabel}</strong>
              </p>
            </div>
          </div>
        </section>
      );
    case "mvp":
      return (
        <section className="slide slide-mvp">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />
          <div className="mvp-grid rise delay-2">
            {slide.shots.map((shot) => (
              <figure className="mvp-shot" key={shot.src}>
                <img src={shot.src} alt={shot.label} />
              </figure>
            ))}
          </div>
        </section>
      );
    case "tech":
      return (
        <section className="slide">
          <SlideHeader eyebrow={slide.eyebrow} title={slide.title} />
          <div className="tech-layout rise delay-2">
            <TechColumn title={slide.todayTitle} items={slide.today} accent />
            <TechColumn title={slide.futureTitle} items={slide.future} muted />
            <div className="qr-card">
              <div className="qr-box">
                <img src="/expoQR.png" alt={`${slide.qrTitle} ${slide.qrSubtitle}`} />
              </div>
              <p>{slide.qrNote}</p>
            </div>
          </div>
        </section>
      );
    case "reveal":
      return (
        <section className={`slide slide-reveal ${revealed ? "is-revealed" : ""}`}>
          <img className="reveal-founder-photo" src="/youtube-founder-photo.jpg" alt="Команда с основателем YouTube" />
          <div className="reveal-copy rise">
            <img className="reveal-youtube-logo" src="/youtube-logo.svg" alt="YouTube" />
            <p className="reveal-eyebrow">{slide.eyebrow}</p>
            <h2>{slide.title}</h2>
          </div>
          <div className="reveal-stage rise delay-2" aria-hidden={!revealed}>
            <blockquote>{slide.revealText}</blockquote>
          </div>
        </section>
      );
    case "thanks":
      return (
        <section className="slide slide-thanks">
          <div className="thanks-content rise">
            <BrandLogo centered />
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
            <span>{slide.tag}</span>
            <CompanyLogoRow />
          </div>
        </section>
      );
  }
}

function SlideHeader({ eyebrow, title, centered = false }: { eyebrow: string; title: string; centered?: boolean }) {
  return (
    <header className={`slide-header rise ${centered ? "centered" : ""}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  );
}

function TechColumn({ title, items, accent = false, muted = false }: { title: string; items: string[]; accent?: boolean; muted?: boolean }) {
  return (
    <article className={`tech-column ${accent ? "accent" : ""} ${muted ? "muted" : ""}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function CompanyLogoRow() {
  const logoBaseStyle: React.CSSProperties = {
    height: 58,
    display: "block",
    flex: "0 0 auto",
    borderRadius: 14,
    boxShadow: "0 14px 34px rgba(34, 34, 34, 0.08)"
  };

  return (
    <div
      className="company-logo-row"
      aria-label="Companies where the team has worked"
      style={{ margin: "40px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}
    >
      <img className="company-logo company-flowleads" src="/company-logos/Flow.jpg" alt="Flowleads" style={{ ...logoBaseStyle, width: 198, objectFit: "cover" }} />
      <img className="company-logo company-in" src="/company-logos/Nfac.jpg" alt="in!" style={{ ...logoBaseStyle, width: 58, borderRadius: "50%", objectFit: "cover" }} />
      <img className="company-logo company-cmark" src="/company-logos/CCDEV.jpg" alt="Company logo" style={{ ...logoBaseStyle, width: 58, objectFit: "cover" }} />
      <img className="company-logo company-higgsfield" src="/company-logos/Higg.jpg" alt="Higgsfield" style={{ ...logoBaseStyle, width: 205, objectFit: "cover" }} />
      <img className="company-logo company-yonsei" src="/company-logos/YonseiUniversityEmblem.svg.png" alt="Yonsei University" style={{ ...logoBaseStyle, width: 58, objectFit: "contain" }} />
      <img className="company-logo company-nu" src="/company-logos/NU.png" alt="Nazarbayev University" style={{ ...logoBaseStyle, width: 58, padding: 6, objectFit: "contain", background: "#ffffff" }} />
    </div>
  );
}

export default function Presentation({ slides }: PresentationProps) {
  const [index, setIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  const activeSlide = slides[index];
  const canRevealActiveSlide = activeSlide.kind === "reveal" && !revealed;
  const progress = useMemo(() => ((index + 1) / slides.length) * 100, [index, slides.length]);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setControlsVisible(false), 1800);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((current) => Math.min(slides.length - 1, Math.max(0, typeof nextIndex === "number" ? nextIndex : current)));
      revealControls();
    },
    [revealControls, slides.length]
  );

  const previous = useCallback(() => {
    setIndex((current) => Math.max(0, current - 1));
    revealControls();
  }, [revealControls]);

  const next = useCallback(() => {
    if (slides[index]?.kind === "reveal" && !revealed) {
      setRevealed(true);
      revealControls();
      return;
    }

    setIndex((current) => Math.min(slides.length - 1, current + 1));
    revealControls();
  }, [index, revealControls, revealed, slides, slides.length]);

  useEffect(() => {
    setRevealed(false);
  }, [index]);

  useEffect(() => {
    revealControls();
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, [revealControls]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;

      if (["ArrowRight", "PageDown", " ", "Spacebar"].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, next, previous, slides.length]);

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const node = deckRef.current;
    if (!node || !document.fullscreenEnabled) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await node.requestFullscreen();
    }
    revealControls();
  }, [revealControls]);

  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select, [role='button'], .presentation-controls")) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    if (canRevealActiveSlide) {
      setRevealed(true);
      revealControls();
    } else if (x >= rect.width / 2) next();
    else previous();
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
    if (dx < 0) next();
    else previous();
  };

  return (
    <main
      ref={deckRef}
      className={`presentation-shell ${controlsVisible ? "controls-visible" : ""}`}
      onMouseMove={revealControls}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="progress-track" aria-hidden="true">
        <i style={{ width: `${progress}%` }} />
      </div>
      <div className="stage-wrap" onClick={handleStageClick}>
        <div key={activeSlide.id} className="stage-canvas" aria-live="polite">
          <SlideView slide={activeSlide} revealed={revealed} />
        </div>
      </div>

      <div className="presentation-controls" aria-label="Presentation controls">
        <button type="button" onClick={previous} disabled={index === 0} aria-label="Previous slide">
          <ArrowLeftIcon />
        </button>
        <div className="slide-count" aria-label={`Slide ${index + 1} of ${slides.length}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </div>
        <button type="button" onClick={next} disabled={index === slides.length - 1} aria-label="Next slide">
          <ArrowRightIcon />
        </button>
        <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}>
          <FullscreenIcon />
        </button>
      </div>
    </main>
  );
}
