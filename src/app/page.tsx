import FlowField from '@/components/FlowField';
import ImagePreloader from '@/components/ImagePreloader';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="home-layout">
      <ImagePreloader />
      {/* Left container - 60% width, 32px padding */}
      <div className="left-container">
        <Logo className="site-logo" animateOnLoad />
        <p className="intro-text">
          Hi, I'm Vinnie.<br />
          I'm a product designer.
        </p>
        <p className="intro-subtext">
          I've designed interfaces for Aevo, Ribbon Finance, Kraken, Genius Sports Group and others.
        </p>

        {/* Selected Work Section */}
        <section className="section">
          <h2 className="section-label">Selected Work</h2>
          <a href="/work/aevo-perps" className="link">Aevo - Perps and Options Exchange</a>
          <a href="/work/aevo-otc" className="link">Aevo - OTC Altcoin Options Settled Onchain</a>
          <a href="/work/ribbon-finance" className="link">Ribbon Finance - DeFi's First Decentralised Options Vaults</a>
          <a href="/work/ribbon-lend" className="link">Ribbon Lend - Unsecured lending to KYC/AML'd institutional market makers</a>
          <a href="https://dribbble.com/vinnie_p" className="link" target="_blank" rel="noopener noreferrer">
            Dribbble
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
        </section>

        {/* A/V Explorations Section */}
        <section className="section">
          <h2 className="section-label">A/V Explorations</h2>
          <a href="https://www.instagram.com/f1uxu5/" className="link" target="_blank" rel="noopener noreferrer">
            TouchDesigner
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
        </section>

        {/* Writing Section */}
        <section className="section">
          <h2 className="section-label">Writing</h2>
          <a href="/writing/the-global-rules-based-order-is-dead" className="link">
            The Global Rules-Based Order is Dead (Jan 2026)
          </a>
          <a href="/writing/one-player-vs-multiplayer-software" className="link">
            One-Player vs Multiplayer Software (April 2025)
          </a>
          <a href="https://medium.com/@vinnielive/four-potential-drivers-of-crypto-adoption-59be6bf8a75e" className="link" target="_blank" rel="noopener noreferrer">
            Four Potential Drivers of Crypto Adoption (July 2019)
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
        </section>

        {/* Info Section */}
        <section className="section">
          <h2 className="section-label">Info</h2>
          <a href="https://www.instagram.com/f1uxu5/" className="link" target="_blank" rel="noopener noreferrer">
            Instagram
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
          <a href="https://x.com/vinnie_io" className="link" target="_blank" rel="noopener noreferrer">
            Twitter
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
          <a href="https://vsco.co/the-mustard-co/gallery" className="link" target="_blank" rel="noopener noreferrer">
            VSCO
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
          <a href="https://www.linkedin.com/in/vinnie-padmanabhan/" className="link" target="_blank" rel="noopener noreferrer">
            Linkedin
            <img src="/icons/arrow-up-right.svg" alt="" className="link-icon" />
          </a>
        </section>
      </div>

      {/* Right container - 40% width, flow field background */}
      <div className="right-container">
        <FlowField 
          dashColor="rgba(0, 0, 0, 1.0)" 
          density={1.2} 
        />
      </div>
    </div>
  );
}
