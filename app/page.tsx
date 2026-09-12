'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CANDIDATE = 'Tariq Ahmed Bhatti';
const WA_LINK = 'https://wa.me/923009696293?text=' + encodeURIComponent(`Assalam o Alaikum, main ${CANDIDATE} ki campaign aur Sahiwal Chamber Elections 2026-28 ke hawale se rabta karna chahta/chahti hoon.`);
const AGENDA = [
  { id: 'unity', label: 'Tajir Ittehad', icon: '🤝', title: 'Tajir Ittehad & Active Support', text: 'Sahiwal ke chote aur bade tajiron ke masail ko chamber ki satah par fori hal karwana hamari tarjeeh hai.', image: '/Agenda 1 - Traders Unity & Support.jpg' },
  { id: 'digital', label: 'Digital Chamber', icon: '◈', title: 'Modern & Digital Chamber', text: 'Chamber ke nizam ko modern aur paperless banana. Her member ke liye online sahuliyat ko aasan aur transparent banana.', image: '/Agenda 2 - Digital Chamber & Innovation.jpg' },
  { id: 'growth', label: 'Economic Growth', icon: '↗', title: 'Economic Growth & Facilitation', text: 'Local businesses ke liye naye commercial mauqa paida karna aur tax/regulatory masail mein legal support dena.', image: '/Agenda 3 - Economic Growth & Market Success.jpg' },
];
const SLIDES = [
  { name: 'Tajiron ki Awaaz', category: 'Sahiwal Chamber Elections 2026-28', text: `Vote & Support ${CANDIDATE} (Boby Shoes). Slogan: Tajiron ki Awaaz, Sahiwal ki Tarraqi!`, image: '/tariq_pic 1.jpg' },
  { name: 'Sahiwal ki Tarraqi', category: 'Executive Committee Member', text: 'Ittehad Group, Democratic Group aur Apna Group ke saath business community ki mazboot numayindagi.', image: '/tariq_pic 2.jpg' },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('unity');
  const [slideIndex, setSlideIndex] = useState(0);
  const [typeText, setTypeText] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const backTopRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const active = document.querySelector<HTMLElement>('.menu-panel.active');
    if (!active) return;
    const cards = active.querySelectorAll<HTMLElement>('.reveal');
    cards.forEach(card => card.classList.remove('visible'));
    const frame = requestAnimationFrame(() => cards.forEach(card => {
      if (card.getBoundingClientRect().top < window.innerHeight - 60) card.classList.add('visible');
    }));
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = `${(y / max) * 100}%`;
      backTopRef.current?.classList.toggle('visible', y > 400);
      navRef.current?.classList.toggle('scrolled', y > 80);
      document.querySelectorAll('.reveal:not(.visible)').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 80) element.classList.add('visible');
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setTypeText(''), 0);
    return () => clearTimeout(timer);
  }, [slideIndex]);

  useEffect(() => {
    const word = SLIDES[slideIndex].name;
    if (typeText.length < word.length) {
      const timer = setTimeout(() => setTypeText(word.slice(0, typeText.length + 1)), 110);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setSlideIndex(index => (index + 1) % SLIDES.length), 2200);
    return () => clearTimeout(timer);
  }, [typeText, slideIndex]);

  useEffect(() => {
    if (carouselRef.current) carouselRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    if (heroBgRef.current) heroBgRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
  }, [slideIndex]);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const share = async () => {
    const data = { title: `${CANDIDATE} | Sahiwal Chamber Elections 2026-28`, text: `Tajiron ki Awaaz, Sahiwal ki Tarraqi! Vote & Support ${CANDIDATE}.`, url: window.location.href };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard?.writeText(window.location.href);
  };

  return (
    <>
      <div id="scroll-progress" ref={progressRef} />
      <button id="back-to-top" ref={backTopRef} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">↑</button>
      <div id="sidebar-overlay" className={sidebarOpen ? 'open' : ''} onClick={() => setSidebarOpen(false)} />
      <nav id="sidebar" className={sidebarOpen ? 'open' : ''}>
        <div className="sidebar-header"><a href="#hero" className="sidebar-brand" onClick={() => scrollTo('hero')}><span className="a">TARIQ</span> <span className="one">AHMED BHATTI</span></a><button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button></div>
        <div className="sidebar-links"><a href="#hero" onClick={() => scrollTo('hero')}>◉ Home</a><a href="#menu" onClick={() => scrollTo('menu')}>◇ Agenda</a><a href="#order" onClick={() => scrollTo('order')}>✦ Alliance</a><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="sidebar-order">🤝 Rabta Karein</a></div>
      </nav>
      <header id="navbar" ref={navRef} role="banner">
        <a href="#hero" className="nav-brand" onClick={() => scrollTo('hero')}><span className="a">TARIQ</span> <span className="one">AHMED BHATTI</span></a>
        <ul className="nav-links"><li><a href="#hero" onClick={event => { event.preventDefault(); scrollTo('hero'); }}>Home</a></li><li><a href="#menu" onClick={event => { event.preventDefault(); scrollTo('menu'); }}>Agenda</a></li><li><a href="#order" onClick={event => { event.preventDefault(); scrollTo('order'); }}>Alliance</a></li><li><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="nav-order-btn">Rabta Karein</a></li></ul>
        <button className={`hamburger ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(value => !value)} aria-label="Toggle menu"><span /><span /><span /></button>
      </header>

      <main id="main-content">
        <section id="hero" aria-label={`${CANDIDATE} campaign hero`}>
          <div className="hero-bg-carousel"><div className="hero-bg-track" ref={heroBgRef}>{SLIDES.map((slide, index) => <div className="hero-bg-slide" key={index}><Image src={slide.image} alt={`${CANDIDATE} campaign portrait`} fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center' }} priority={index === 0} /></div>)}</div><div className="hero-bg-overlay" /></div>
          <div className="hero-mesh" /><div className="hero-noise" />
          <div className="hero-content">
            <div className="hero-text reveal from-left"><div className="hero-badge"><div className="hero-badge-dot" /> Elections 2026-28</div><h1 className="hero-title"><span className="brand-a">Sahiwal Chamber</span> <span className="brand-one">Elections</span><span className="subtitle">{CANDIDATE} · Owner of Boby Shoes</span></h1><div className="hero-typewriter"><span className="typewriter-label">Our vision:</span><span className="typewriter-text">{typeText}</span><span className="typewriter-cursor">|</span></div><p className="hero-desc">Vote &amp; Support {CANDIDATE} (Boby Shoes). Slogan: Tajiron ki Awaaz, Sahiwal ki Tarraqi!</p><div className="hero-btns"><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary"><span>🤝</span><span>Rabta Karein (WhatsApp)</span></a><button className="btn-secondary" onClick={share}><span>📢</span><span>Doston ko Share Karein</span></button></div><div className="hero-stats"><div className="hero-stat"><span className="hero-stat-num">2026-28</span><span className="hero-stat-label">Election Session</span></div><div className="hero-stat"><span className="hero-stat-num">SLCCI</span><span className="hero-stat-label">Target Body</span></div><div className="hero-stat"><span className="hero-stat-num">01</span><span className="hero-stat-label">Executive Seat</span></div></div></div>
            <div className="hero-carousel reveal from-right"><div className="carousel-track" ref={carouselRef}>{SLIDES.map((slide, index) => <div className="carousel-slide" key={index}><div className="slide-glow" /><div className="slide-emoji">✦</div><div className="slide-category">{slide.category}</div><div className="slide-name">{slide.name}</div><div className="slide-desc">{slide.text}</div><div className="slide-price">Associate Class <span>Executive Committee</span></div><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">Support {CANDIDATE.split(' ')[0]}</a></div>)}</div><div className="carousel-nav"><button className="carousel-btn" onClick={() => setSlideIndex(index => (index - 1 + SLIDES.length) % SLIDES.length)}>‹</button><button className="carousel-btn" onClick={() => setSlideIndex(index => (index + 1) % SLIDES.length)}>›</button></div><div className="carousel-dots">{SLIDES.map((_, index) => <button key={index} className={`carousel-dot ${index === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(index)} aria-label={`Show slide ${index + 1}`} />)}</div></div>
          </div>
        </section>

        <section id="menu" className="section" aria-label={`About ${CANDIDATE} and campaign agenda`}>
          <div className="container">
            <div className="section-header reveal from-bottom"><div className="section-tag">About The Candidate</div><h2 className="section-title">Business Leadership with <span className="accent">Purpose</span></h2><p className="section-desc">{CANDIDATE}, Owner of Boby Shoes, is dedicated to serving Sahiwal&apos;s local trader community with practical representation, transparency and action.</p><div className="section-divider" /></div>
            <div className="candidate-profile reveal from-bottom"><div className="candidate-photo"><Image src="/2. About Section .jpg" alt={`${CANDIDATE} executive business profile`} width={720} height={520} /></div><div className="candidate-copy"><div className="section-tag">Boby Shoes · Sahiwal</div><h3>Local experience. Collective progress.</h3><p>From the shop floor to the chamber, Tariq understands the daily realities of Sahiwal&apos;s businesses. His candidacy is rooted in listening to traders, removing friction and turning shared concerns into measurable progress.</p><div className="candidate-meta"><span>Post</span><strong>Executive Committee Member (Associate Class)</strong></div></div></div>
            <div className="section-header reveal from-bottom agenda-heading"><div className="section-tag">Our Agenda</div><h2 className="section-title">Three Priorities. <span className="accent">One Voice.</span></h2></div>
            <div className="menu-tabs reveal from-bottom">{AGENDA.map(item => <button key={item.id} className={`menu-tab ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}><span>{item.icon}</span> {item.label}</button>)}</div>
            {AGENDA.map(item => <div key={item.id} className={`menu-panel ${activeTab === item.id ? 'active' : ''}`}><div className="menu-list-grid agenda-grid"><article className="menu-list-card agenda-card reveal from-bottom"><div className="list-card-img-wrap"><Image src={item.image} alt={item.title} width={720} height={420} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /><div className="list-card-img-overlay" /><span className="list-card-emoji-badge">{item.icon}</span></div><div className="list-card-body"><div className="list-card-name">{item.title}</div><p className="agenda-description">{item.text}</p></div></article></div></div>)}
          </div>
        </section>

        <section id="order" className="section" aria-label="Alliance and campaign call to action"><div className="order-aurora"><div className="aurora-blob aurora-blob-1" /><div className="aurora-blob aurora-blob-2" /><div className="aurora-blob aurora-blob-3" /></div><div className="container"><div className="order-content"><div className="order-text reveal from-left"><div className="section-tag">Supported Alliance</div><h2 className="order-title">United for <span className="yellow">Business</span><br /><span className="red">Excellence</span></h2><p className="order-desc">Ittehad Group, Democratic Group, aur Apna Group ka sanjha azam—Sahiwal ki tajir baradri ki izzat aur khushhaali!</p><div className="order-features"><div className="order-feature"><span className="order-feature-icon">✦</span><span className="order-feature-text">Ittehad Group</span></div><div className="order-feature"><span className="order-feature-icon">✦</span><span className="order-feature-text">Democratic Group</span></div><div className="order-feature"><span className="order-feature-icon">✦</span><span className="order-feature-text">Apna Group</span></div></div></div><div className="order-card reveal from-right"><Image src="/Group Alliance Section .jpg" alt="United alliance for business excellence" width={640} height={420} className="alliance-image" /><div className="order-wa-icon">🤝</div><div className="order-card-title">Aap ka vote, aap ki awaaz</div><p className="order-card-desc">{CANDIDATE} ko support karein aur Sahiwal ki business community ko mazboot banayein.</p><div className="hero-btns"><a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn"><span>🤝</span> Rabta Karein</a><button className="btn-secondary" onClick={share}><span>📢</span> Share Karein</button></div></div></div></div></section>
      </main>

      <footer id="footer" aria-label={`${CANDIDATE} campaign contact`}><div className="container"><div className="footer-grid reveal from-bottom"><div className="footer-brand-col"><a href="#hero" className="footer-brand" onClick={() => scrollTo('hero')}><span className="a">TARIQ</span> <span className="one">AHMED BHATTI</span></a><p className="footer-tagline">Tajiron ki Awaaz, Sahiwal ki Tarraqi! Vote &amp; Support {CANDIDATE}, Owner of Boby Shoes.</p><div className="footer-social"><a href={WA_LINK} className="social-btn fb" aria-label="WhatsApp">✆</a><button onClick={share} className="social-btn ig" aria-label="Share campaign">↗</button></div></div><div><div className="footer-col-title">Campaign</div><ul className="footer-links"><li><a href="#hero">Home</a></li><li><a href="#menu">About &amp; Agenda</a></li><li><a href="#order">Supported Alliance</a></li></ul></div><div><div className="footer-col-title">Election</div><ul className="footer-links"><li><span>Session: 2026-28</span></li><li><span>SLCCI</span></li><li><span>Associate Class</span></li><li><span>Executive Committee Member</span></li></ul></div><div><div className="footer-col-title">Contact</div><div className="footer-contact"><div className="footer-contact-item"><span className="footer-contact-icon">📞</span><div className="footer-contact-text"><a href={WA_LINK}>WhatsApp: +92 300 9696293</a></div></div><div className="footer-contact-item"><span className="footer-contact-icon">📍</span><div className="footer-contact-text"><address style={{ fontStyle: 'normal' }}>Sahiwal, Punjab, Pakistan</address></div></div></div></div></div></div><div className="footer-bottom"><div className="container">© 2026 {CANDIDATE} · Boby Shoes · Sahiwal Chamber Elections 2026-28 · Designed and developed by <a href="https://www.linkedin.com/in/muhammad-salman-rajpoot/" target="_blank" rel="noopener noreferrer">Muhammad Salman</a></div></div></footer>
    </>
  );
}
