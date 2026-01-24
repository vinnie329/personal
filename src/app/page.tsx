import FlowField from '@/components/FlowField';

export default function Home() {
  return (
    <div className="home-layout">
      {/* Left container - 60% width, 32px padding */}
      <div className="left-container">
        <img src="/logo.svg" alt="Logo" className="site-logo" />
        <p className="intro-text">
          Hi, I'm Vinnie.<br />
          I'm a product designer.
        </p>
        <p className="intro-subtext">
          I've designed interfaces for Aevo, Ribbon Finance, Kraken, Genius Sports Group and others.
        </p>

        {/* Selected Work Section */}
        <section className="work-section">
          <h2 className="section-label">Selected Work</h2>
          <a href="#" className="work-link">Aevo - Perps and Options Exchange</a>
          <a href="#" className="work-link">Aevo - OTC Altcoin Options Settled Onchain</a>
          <a href="#" className="work-link">Ribbon Finance - DeFi's First Decentralised Options Vaults</a>
          <a href="#" className="work-link">Ribbon Lend - Unsecured lending to KYC/AML'd institutional market makers</a>
          <a href="#" className="work-link">Rugby Prediction Market Prototype</a>
          <a href="#" className="work-link">Aevo and Ribbon Brand Compositions</a>
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
