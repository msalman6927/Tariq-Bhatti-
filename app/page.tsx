'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const WA_LINK = 'https://wa.me/923136010673';
const FOODPANDA_LINK = 'https://www.foodpanda.pk/restaurant/garg/a-one-juice-point';
const MAPS_LINK = 'https://maps.app.goo.gl/k8Le8ZCPxenc8uyv7';

const HERO_SLIDES = [
  { emoji: '🍎', category: 'Special Juices',  name: 'Red Anaar & Apple',  desc: 'Freshly blended pomegranate & apple for a vitamin-packed boost.',          price: 'Rs. 400', priceUnit: '/ glass',   photo: '1663955706695-de874fa93c4d' },
  { emoji: '🥛', category: 'Power Shakes',    name: 'Kaju Badam Shake',   desc: 'Rich cashew & almond blend, packed with energy and flavor.',               price: 'Rs. 650', priceUnit: '/ glass',   photo: '1588710929895-6ee7a0a4d155' },
  { emoji: '🍓', category: 'Smoothies',       name: 'Berry Smoothie',     desc: 'A vibrant blend of mixed berries, creamy and refreshing.',                  price: 'Rs. 280', priceUnit: '/ glass',   photo: '1654923064926-be7e64267a31' },
  { emoji: '🍦', category: 'Special Ice Cream', name: 'Falooda Special',  desc: 'Classic Pakistani falooda with ice cream, basil seeds & rose syrup.',       price: 'Rs. 350', priceUnit: '/ serving', photo: '1630823186728-b17c9f82a32d' },
  { emoji: '🌿', category: 'Fresh Drinks',    name: 'Mint Margarita',     desc: 'Cool fresh mint with lime, a perfect summer refresher.',                    price: 'Rs. 200', priceUnit: '/ glass',   photo: '1653542772393-71ffa417b1c4' },
  { emoji: '🫐', category: 'Special Juices',  name: 'Falsa Sharbat',      desc: 'Tangy-sweet falsa berries blended into a chilled, vibrant purple delight.', price: 'Rs. 150', priceUnit: '/ glass',   photo: '1542518392-13317b1ee2a2' },
];

function unsplashUrl(id: string, w = 400, h = 300) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

function renderPrice(price: string) {
  if (/^\d+\/\d+$/.test(price.trim())) {
    const [r, l] = price.split('/');
    return (
      <div className="list-card-price">
        <span>Regular Rs. {r.trim()}</span>
        <span>Large Rs. {l.trim()}</span>
      </div>
    );
  }
  if (price.startsWith('S-')) {
    return <div className="list-card-price"><span>{price}</span></div>;
  }
  return <div className="list-card-price"><span>Rs. {price}</span></div>;
}

const MENU_CATEGORIES = [
  {
    id: 'special-juices', label: 'Special Juices', emoji: '🍊', items: [
      { name: 'Apple Juice',              price: '300/400',  photo: '1632931004138-04f5486f6237' },
      { name: 'Carrot Special Mix Juice', price: '230/350',  photo: '1542444459-b54d41b491c3' },
      { name: 'Red Anaar & Apple Juice',  price: '400/500',  photo: '1739823956361-03a894b57214' },
      { name: 'Peach Juice',              price: '250/350',  photo: '1616434963473-030c8f1ce663' },
      { name: 'Strawberry Juice',         price: '350/500',  photo: '1563599100871-a48ee2c37db4' },
      { name: 'Plum Juice',               price: '300/400',  photo: '1560610986-dfaa60bbec12' },
      { name: 'Pine Apple Juice',         price: '400/550',  photo: '1705246535138-953e01125cb0' },
      { name: 'Peach & Apple Juice',      price: '350/450',  photo: '1595090475026-274ec9ef1753' },
      { name: 'Pine Plot Juice',          price: '350/500',  photo: '1583577612013-4fecf7bf8f13' },
      { name: 'Jamun Juice',              price: '350/500',  photo: '1694019835724-c8a1b92e37c7' },
      { name: 'Fruit Punch',              price: '230/350',  photo: '1664966912622-3d1e667a74e0' },
      { name: 'Mosammi Juice',            price: '230/350',  photo: '1627424496964-b29523d42768' },
      { name: 'Grape Fruit Juice',        price: '150/230',  photo: '1752550901046-ad49e6063dd7' },
      { name: 'Orange Juice',             price: '150/230',  photo: '1740555612192-3e3cf77b5d1f' },
      { name: 'Special Sharbat e Falsa',  price: '800/1000', photo: '1542518392-13317b1ee2a2' },
      { name: 'Red Anaar Juice',          price: '800/1000', photo: '1739823956372-0c0642baf0b6' },
      { name: 'White Anaar Juice',        price: '900/1200', photo: '1585419961436-c6310dbf723e' },
    ]
  },
  {
    id: 'power-shakes', label: 'Power Shakes', emoji: '💪', items: [
      { name: 'Power Shake',          price: '650/750', photo: '1656582117142-ce539fec964f' },
      { name: 'Kaju Badam Mix Shake', price: '650/750', photo: '1588710929895-6ee7a0a4d155' },
      { name: 'Anjeer Shake',         price: '600/800', photo: '1696487774050-ba56e4b62359' },
      { name: 'Mix Shake',            price: '650/750', photo: '1665654232800-5acbeaceae2b' },
      { name: 'Dry Fruit Mix Shake',  price: '650/750', photo: '1728508707516-8c8ded94fb5a' },
    ]
  },
  {
    id: 'fresh-drinks', label: 'Fresh Drinks', emoji: '🍋', items: [
      { name: 'Drink Pina Colada',     price: '460/650', photo: '1767065703431-704a051e4c83' },
      { name: 'Strawberry Lemonade',   price: '300/450', photo: '1673646959767-1f87b64baf36' },
      { name: 'Pink Lemonade',         price: '330/450', photo: '1599137936867-394dff2501a7' },
      { name: 'Super Drink Clear',     price: '350/500', photo: '1653581492265-57917a35698c' },
      { name: 'Fresh Lime',            price: '200/300', photo: '1653581494426-0919bf4d9865' },
      { name: 'Mint Margarita',        price: '200/250', photo: '1686294443320-84a84e2a8479' },
      { name: 'Ginger Mint Margarita', price: '250/350', photo: '1686039961341-69ba6d3f5764' },
      { name: 'Pink Plot',             price: '300/350', photo: '1501784050997-975d9fdb56d8' },
    ]
  },
  {
    id: 'milk-shake', label: 'Milk Shake', emoji: '🥤', items: [
      { name: 'Banana Milk Shake',    price: '200/250', photo: '1665658581674-c4b3cf6f230c' },
      { name: 'Banana Berry Shake',   price: '300/400', photo: '1542444592-0d5997f202eb' },
      { name: 'Banana Khajoor Shake', price: '300/400', photo: '1685967836529-b0e8d6938227' },
      { name: 'Khoya Khajoor Shake',  price: '400/500', photo: '1695490454828-f8df9109da43' },
      { name: 'Mango Shake',          price: '200/250', photo: '1623065422902-30a2d299bbe4' },
      { name: 'Strawberry Shake',     price: '200/250', photo: '1669277038674-9d00b4ff41fa' },
      { name: 'Pine Apple Medium',    price: '400/500', photo: '1628961915805-4c92c885ce61' },
      { name: 'Plum Shake',           price: '300/450', photo: '1722763018789-ce972b1bc0cf' },
      { name: 'Apple Shake',          price: '200/300', photo: '1727989815707-1b9e8f376775' },
      { name: 'Khajoor Shake',        price: '250/350', photo: '1714969620808-4b9d5f3e7e4b' },
    ]
  },
  {
    id: 'ice-cream', label: 'Ice Cream', emoji: '🍦', items: [
      { name: 'Ice Cream 2 Scoop',  price: '190',  photo: '1629385738750-5617b763a80b' },
      { name: 'Ice Cream 3 Scoop',  price: '280',  photo: '1629385744299-74b9cf013f52' },
      { name: 'Ice Cream 4 Scoop',  price: '350',  photo: '1612639267275-7c4ae6a12d84' },
      { name: 'Ice Cream ½ Liter',  price: '500',  photo: '1609079057139-505b3d06fb72' },
      { name: 'Ice Cream 1 Liter',  price: '1000', photo: '1647972488547-247963b61bc3' },
    ]
  },
  {
    id: 'ice-cream-shake', label: 'Ice Cream Shakes', emoji: '🧋', items: [
      { name: 'Magic Ice Cream Shake',          price: '450/650', photo: '1571089465427-cd3c533e809f' },
      { name: 'Strawberry Ice Cream Shake',     price: '450/650', photo: '1717250180243-011d1db559b3' },
      { name: 'Chocolate Ice Cream Shake',      price: '450/650', photo: '1571181405951-1350bfd48223' },
      { name: 'Milk Chocolate Ice Cream Shake', price: '450/650', photo: '1728777185170-90bcc9eb8a61' },
      { name: 'Crazy Ice Cream Shake',          price: '450/650', photo: '1571183911579-687725adb5f8' },
      { name: 'Kit Kat Ice Cream Shake',        price: '400/600', photo: '1594573996499-7569c94240d0' },
      { name: 'Neo Ice Cream Shake',            price: '400/600', photo: '1728777185080-e01920ade04f' },
      { name: 'Ice Blended Coffee',             price: '400/600', photo: '1728777187058-9b68eb1ff2d0' },
      { name: 'Black Force Special Shake',      price: '600/800', photo: '1619158403521-ed9795026d47' },
      { name: 'Kulfa Ice Cream Shake',          price: '450/650', photo: '1630823186728-b17c9f82a32d' },
      { name: 'Khoya Kulfa Ice Cream Shake',    price: '450/650', photo: '1630823182818-22d676cc0eb4' },
      { name: 'Mango Ice Cream Shake',          price: '450/650', photo: '1652780120256-1d3e582cbbef' },
      { name: 'Cold Coffee Ice Cream Shake',    price: '450/650', photo: '1639127826756-e2abaefcd1c9' },
      { name: 'Mango Twist Ice Cream Shake',    price: '450/650', photo: '1617218607489-4d28d612bd07' },
      { name: 'Love Story Ice Cream Shake',     price: '450/650', photo: '1507750549272-e58742b1df80' },
    ]
  },
  {
    id: 'salad-bar', label: 'Salad Bar', emoji: '🥗', items: [
      { name: 'Fruit Salad',       price: 'S-150 / M-450 / L-800', photo: '1602234382521-610b2abf9029' },
      { name: 'Ice Cream Chaat',   price: 'S-300 / M-450 / L-850', photo: '1774041877283-a3aaad1f2ad2' },
      { name: 'Chana Chaat',       price: 'S-300 / M-450 / L-850', photo: '1653850280260-aa3b9e00b230' },
      { name: 'Fruit Chaat Juicy', price: 'S-300 / M-450 / L-850', photo: '1728694509214-350c16740ce8' },
      { name: 'Macaroni Carat',    price: 'S-300 / M-450 / L-850', photo: '1543339503-6dffa8e76647' },
      { name: 'Pasta',             price: 'S-300 / M-450 / L-850', photo: '1760390952135-12da7267ff8f' },
    ]
  },
  {
    id: 'soup', label: 'Soups', emoji: '🍲', items: [
      { name: 'A One Special Soup', price: 'S-250 / M-620 / L-1020', photo: '1713974279491-3c01c9822fb9' },
      { name: 'Hot & Sour',         price: 'S-250 / M-550 / L-950',  photo: '1680359870778-95335809e88b' },
      { name: 'Chicken Corn Soup',  price: 'S-200 / M-550 / L-850',  photo: '1705088294904-c17a2205c1e3' },
    ]
  },
  {
    id: 'coffee', label: 'Coffee Corner', emoji: '☕', items: [
      { name: 'Cream Coffee',  price: '320', photo: '1767469779855-8a5c89352787' },
      { name: 'Cappuccino',    price: '250', photo: '1635090976010-d3f6dfbb1bac' },
      { name: 'Latey',         price: '250', photo: '1703013132195-691ce55017c0' },
      { name: 'Hot Chocolate', price: '350', photo: '1769279412284-eb8b20e8ec47' },
      { name: 'Mogaehinu',     price: '250', photo: '1691723247105-57e32577dc72' },
    ]
  },
];

const CARD_EMOJIS: Record<string, string> = {
  'special-juices': '🍊', 'power-shakes': '💪', 'fresh-drinks': '🍋',
  'milk-shake': '🥤', 'ice-cream': '🍦',
  'ice-cream-shake': '🧋', 'salad-bar': '🥗',
  'soup': '🍲', 'coffee': '☕',
};

const FRUITS = ['🍊', '🍋', '🍓', '🥭', '🍍', '🍇', '🍒', '🫐', '🍑', '🍌'];
// Deterministic offsets (0–4.9) to avoid SSR/client hydration mismatch
const FRUIT_OFFSETS = [0.18, 2.43, 4.67, 1.73, 0.25, 4.96, 4.33, 0.74, 3.03, 3.23];
const FRUIT_SIZES   = [1.5, 2, 2.5, 1.5, 2, 2.5, 1.5, 2, 2.5, 1.5];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('special-juices');
  const [slideIndex, setSlideIndex] = useState(0);
  const [typeText, setTypeText] = useState('');
  const carouselRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const backTopRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Background-preload all menu images while user is on hero section
  useEffect(() => {
    const timer = setTimeout(() => {
      MENU_CATEGORIES.forEach(cat => {
        cat.items.forEach(item => {
          const img = new window.Image();
          img.src = `/_next/image?url=${encodeURIComponent(unsplashUrl(item.photo, 400, 300))}&w=828&q=80`;
        });
      });
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  // Re-animate menu cards every time the active tab changes
  useEffect(() => {
    const activePanel = document.querySelector<HTMLElement>('.menu-panel.active');
    if (!activePanel) return;
    const cards = activePanel.querySelectorAll<HTMLElement>('.reveal');
    cards.forEach(c => c.classList.remove('visible'));
    let raf1 = 0, raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        cards.forEach(c => {
          const rect = c.getBoundingClientRect();
          if (rect.top < window.innerHeight - 60) c.classList.add('visible');
        });
      });
    });
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); };
  }, [activeTab]);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.width = `${(scrollY / maxScroll) * 100}%`;
      if (backTopRef.current) {
        if (scrollY > 400) backTopRef.current.classList.add('visible');
        else backTopRef.current.classList.remove('visible');
      }
      if (navRef.current) {
        if (scrollY > 80) navRef.current.classList.add('scrolled');
        else navRef.current.classList.remove('scrolled');
      }
      // Active nav section
      const sections = ['hero', 'menu', 'order', 'footer'];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const links = document.querySelectorAll(`.nav-links a[href="#${id}"], .sidebar-links a[href="#${id}"]`);
          links.forEach(link => {
            if (rect.top <= 100 && rect.bottom > 100) link.classList.add('active');
            else link.classList.remove('active');
          });
        }
      });
      // Reveal animations
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) el.classList.add('visible');
      });
      // Parallax
      document.querySelectorAll('[data-parallax]').forEach(el => {
        const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.3');
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset typewriter whenever the slide changes
  useEffect(() => {
    setTypeText('');
  }, [slideIndex]);

  // Typewriter types the current slide name, then auto-advances to the next slide
  useEffect(() => {
    const word = HERO_SLIDES[slideIndex].name;
    if (typeText.length < word.length) {
      const t = setTimeout(() => setTypeText(word.slice(0, typeText.length + 1)), 110);
      return () => clearTimeout(t);
    }
    // Finished typing — pause then advance slide
    const t = setTimeout(() => setSlideIndex(i => (i + 1) % HERO_SLIDES.length), 2200);
    return () => clearTimeout(t);
  }, [typeText, slideIndex]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    if (heroBgRef.current) {
      heroBgRef.current.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
  }, [slideIndex]);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      {/* Scroll Progress */}
      <div id="scroll-progress" ref={progressRef} />

      {/* Back to Top */}
      <button
        id="back-to-top"
        ref={backTopRef}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        ↑
      </button>

      {/* Sidebar Overlay */}
      <div id="sidebar-overlay" className={sidebarOpen ? 'open' : ''} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <nav id="sidebar" className={sidebarOpen ? 'open' : ''}>
        <div className="sidebar-header">
          <a href="#hero" className="sidebar-brand" onClick={() => scrollTo('hero')}>
            <span className="a">A</span> <span className="one">ONE</span> <span className="juice">JUICE</span>
          </a>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <div className="sidebar-links">
          <a href="#hero" onClick={() => scrollTo('hero')}><span className="sidebar-icon">🏠</span> Home</a>
          <a href="#menu" onClick={() => scrollTo('menu')}><span className="sidebar-icon">🍹</span> Menu</a>
          <a href="#footer" onClick={() => scrollTo('footer')}><span className="sidebar-icon">📞</span> Contact</a>
          <a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer" className="sidebar-order"><span className="sidebar-icon">🛵</span> Place Order</a>
        </div>
      </nav>

      {/* Navbar */}
      <header id="navbar" ref={navRef as React.RefObject<HTMLElement>} role="banner" aria-label="A One Juice navigation">
        <a href="#hero" className="nav-brand" onClick={() => scrollTo('hero')}>
          <span className="a">A</span> <span className="one">ONE</span> <span className="juice">JUICE</span>
        </a>
        <ul className="nav-links">
          <li><a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
          <li><a href="#menu" onClick={e => { e.preventDefault(); scrollTo('menu'); }}>Menu</a></li>
          <li><a href="#footer" onClick={e => { e.preventDefault(); scrollTo('footer'); }}>Contact</a></li>
          <li><a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer" className="nav-order-btn">Place Order</a></li>
        </ul>
        <button
          className={`hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </header>

      <main id="main-content" aria-label="A One Juice & Ice Cream Sahiwal — Main Content">
      {/* ===== HERO SECTION ===== */}
      <section id="hero" aria-label="Hero — A One Juice & Ice Cream Sahiwal">
        {/* Full-width background image carousel */}
        <div className="hero-bg-carousel">
          <div className="hero-bg-track" ref={heroBgRef}>
            {HERO_SLIDES.map((slide, i) => (
              <div key={i} className="hero-bg-slide">
                <Image
                  src={unsplashUrl(slide.photo, 1920, 1080)}
                  alt={`${slide.name} — fresh ${slide.category.toLowerCase()} at A One Juice Sahiwal`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
          <div className="hero-bg-overlay" />
        </div>
        <div className="hero-mesh" />
        <div className="hero-noise" />

        {/* Floating fruits */}
        <div className="floating-fruits">
          {FRUITS.map((fruit, i) => (
            <span
              key={i}
              className="floating-fruit"
              style={{
                left: `${i * 10 + FRUIT_OFFSETS[i]}%`,
                animationDuration: `${12 + i * 2}s`,
                animationDelay: `${i * 1.2}s`,
                fontSize: `${FRUIT_SIZES[i]}rem`,
              }}
            >{fruit}</span>
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-text reveal from-left">
            <div className="hero-badge">
              <div className="hero-badge-dot" />
              Now Open · Fresh Daily
            </div>
            <h1 className="hero-title">
              <span className="brand-a">A</span>{' '}
              <span className="brand-one">ONE</span>{' '}
              <span className="brand-juice">JUICE</span>
              <span className="subtitle">&amp; Ice Cream</span>
            </h1>
            <div className="hero-typewriter">
              <span className="typewriter-label">Try our</span>
              <span className="typewriter-text">{typeText}</span>
              <span className="typewriter-cursor">|</span>
            </div>
            <p className="hero-desc">
              Premium fresh juices, power shakes, smoothies, ice creams and more —
              crafted with the finest ingredients for an unforgettable taste experience.
            </p>
            <div className="hero-btns">
              <a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <span>🛵</span><span>Place Order</span>
              </a>
              <button className="btn-secondary" onClick={() => scrollTo('menu')}>
                <span>🍹</span><span>Explore Menu</span>
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">50+</span>
                <span className="hero-stat-label">Menu Items</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">100%</span>
                <span className="hero-stat-label">Fresh Daily</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">⭐</span>
                <span className="hero-stat-label">Top Rated</span>
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="hero-carousel reveal from-right">
            <div className="carousel-track" ref={carouselRef}>
              {HERO_SLIDES.map((slide, i) => (
                <div className="carousel-slide" key={i}>
                  <div className="slide-glow" />
                  <div className="slide-emoji">{slide.emoji}</div>
                  <div className="slide-category">{slide.category}</div>
                  <div className="slide-name">{slide.name}</div>
                  <div className="slide-desc">{slide.desc}</div>
                  <div className="slide-price">{slide.price} <span>{slide.priceUnit}</span></div>
                  <a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px', marginTop: '4px' }}>
                    <span>Order Now</span>
                  </a>
                </div>
              ))}
            </div>
            <div className="carousel-nav">
              <button className="carousel-btn" onClick={() => setSlideIndex(i => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}>‹</button>
              <button className="carousel-btn" onClick={() => setSlideIndex(i => (i + 1) % HERO_SLIDES.length)}>›</button>
            </div>
            <div className="carousel-dots">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} className={`carousel-dot ${i === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== MENU SECTION ===== */}
      <section id="menu" className="section" aria-label="Menu — Fresh Juices, Shakes & Ice Cream in Sahiwal">
        <div className="container">
          <div className="section-header reveal from-bottom">
            <div className="section-tag">Our Menu</div>
            <h2 className="section-title">
              Crafted with <span className="accent">Fresh</span> Ingredients
            </h2>
            <p className="section-desc">
              From classic fresh juices to premium ice cream shakes — every sip is made with love and quality ingredients.
            </p>
            <div className="section-divider" />
          </div>

          {/* Category Tabs */}
          <div className="menu-tabs reveal from-bottom">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          {MENU_CATEGORIES.map(cat => (
            <div key={cat.id} className={`menu-panel ${activeTab === cat.id ? 'active' : ''}`}>
              <div className="menu-list-grid">
                {cat.items.map((item, idx) => (
                  <a
                    key={idx}
                    href={FOODPANDA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-list-card reveal from-bottom"
                    style={{ transitionDelay: `${(idx % 8) * 0.07}s` }}
                  >
                    <div className="list-card-img-wrap">
                      <Image
                        src={unsplashUrl(item.photo, 400, 300)}
                        alt={`${item.name} — fresh drink at A One Juice Sahiwal`}
                        width={400}
                        height={300}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        loading="lazy"
                      />
                      <div className="list-card-img-overlay" />
                      <span className="list-card-emoji-badge">{CARD_EMOJIS[cat.id] || '🍹'}</span>
                    </div>
                    <div className="list-card-body">
                      <div className="list-card-name">{item.name}</div>
                      {renderPrice(item.price)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ORDER SECTION ===== */}
      <section id="order" className="section" aria-label="Order fresh juice via FoodPanda — A One Juice Sahiwal">
        <div className="order-aurora">
          <div className="aurora-blob aurora-blob-1" />
          <div className="aurora-blob aurora-blob-2" />
          <div className="aurora-blob aurora-blob-3" />
        </div>
        <div className="container">
          <div className="order-content">
            <div className="order-text reveal from-left">
              <div className="section-tag">Easy Ordering</div>
              <h2 className="order-title">
                Order <span className="yellow">Fresh</span> &amp;<br />
                <span className="red">Delicious</span> Anytime
              </h2>
              <p className="order-desc">
                Skip the queue — place your order on FoodPanda and get fresh juices
                &amp; ice cream delivered to your doorstep in minutes.
              </p>
              <div className="order-features">
                <div className="order-feature">
                  <span className="order-feature-icon">⚡</span>
                  <span className="order-feature-text">Fast preparation — your order ready in minutes</span>
                </div>
                <div className="order-feature">
                  <span className="order-feature-icon">🌿</span>
                  <span className="order-feature-text">100% fresh ingredients, made to order</span>
                </div>
                <div className="order-feature">
                  <span className="order-feature-icon">📦</span>
                  <span className="order-feature-text">Home delivery available via FoodPanda</span>
                </div>
                <div className="order-feature">
                  <span className="order-feature-icon">💯</span>
                  <span className="order-feature-text">Satisfaction guaranteed, every time</span>
                </div>
              </div>
            </div>
            <div className="order-card reveal from-right">
              <div className="order-wa-icon">🛵</div>
              <div className="order-card-title">Order via FoodPanda</div>
              <p className="order-card-desc">
                Place your order on FoodPanda and get fresh juices delivered to your doorstep!
              </p>
              <a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer" className="wa-btn">
                <span>🛵</span> Place Order Now
              </a>
              <div className="order-phone">
                <div className="order-phone-num">📞 <a href="tel:+923136010673">+92 313 6010673</a></div>
                <div className="order-phone-num">📞 <a href="tel:+923136010673">+92 313 6010673</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>

      {/* ===== FOOTER ===== */}
      <footer id="footer" aria-label="A One Juice Footer — Contact & Info">
        <div className="container">
          <div className="footer-grid reveal from-bottom">
            <div className="footer-brand-col">
              <a href="#hero" className="footer-brand" onClick={() => scrollTo('hero')}>
                <span className="a">A</span> <span className="one">ONE</span> <span className="juice">JUICE</span>
              </a>
              <p className="footer-tagline">
                Premium fresh juices, shakes, smoothies &amp; ice cream crafted with the finest ingredients.
                Quality you can taste in every sip.
              </p>
              <div className="footer-social">
                <a href="#" className="social-btn fb" aria-label="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="social-btn ig" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-btn tt" aria-label="TikTok">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <div className="footer-col-title">Quick Links</div>
              <ul className="footer-links">
                <li><a href="#hero" onClick={e => { e.preventDefault(); scrollTo('hero'); }}>Home</a></li>
                <li><a href="#menu" onClick={e => { e.preventDefault(); scrollTo('menu'); }}>Menu</a></li>
                <li><a href="#footer" onClick={e => { e.preventDefault(); scrollTo('footer'); }}>Contact</a></li>
                <li><a href={FOODPANDA_LINK} target="_blank" rel="noopener noreferrer">Place Order</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Menu</div>
              <ul className="footer-links">
                <li><a href="#menu" onClick={e => { e.preventDefault(); setActiveTab('special-juices'); scrollTo('menu'); }}>Special Juices</a></li>
                <li><a href="#menu" onClick={e => { e.preventDefault(); setActiveTab('power-shakes'); scrollTo('menu'); }}>Power Shakes</a></li>
                <li><a href="#menu" onClick={e => { e.preventDefault(); setActiveTab('milk-shake'); scrollTo('menu'); }}>Milk Shakes</a></li>
                <li><a href="#menu" onClick={e => { e.preventDefault(); setActiveTab('ice-cream'); scrollTo('menu'); }}>Ice Cream</a></li>
                <li><a href="#menu" onClick={e => { e.preventDefault(); setActiveTab('coffee'); scrollTo('menu'); }}>Coffee</a></li>
              </ul>
            </div>

            <div>
              <div className="footer-col-title">Contact Us</div>
              <div className="footer-contact">
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📞</span>
                  <div className="footer-contact-text">
                    <a href="tel:+923136010673">+92 313 6010673</a>
                    <a href="tel:+923136010673">+92 313 6010673</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">💬</span>
                  <div className="footer-contact-text">
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer">WhatsApp: +92 313 6010673</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📍</span>
                  <div className="footer-contact-text">
                    <address style={{ fontStyle: 'normal' }}>
                      Main Bazar, Sahiwal,<br />Punjab, Pakistan
                    </address>
                    <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">View on Google Maps</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="footer-contact-icon">🕐</span>
                  <div className="footer-contact-text">Open Daily · Morning to Late Night</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            © 2026 A ONE JUICE. All Rights Reserved. · Designed &amp; Developed by <a href="https://www.linkedin.com/in/muhammad-salman-rajpoot/" target="_blank" rel="noopener noreferrer" style={{color:'#FFD700',textDecoration:'none'}}>Muhammad Salman</a>
          </div>
        </div>
      </footer>
    </>
  );
}
