import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AevoPerps() {
  return (
    <div className="project-page">
      <Link href="/">
        <Logo className="project-logo" />
      </Link>
      
      {/* Header */}
      <header className="project-header">
        <div className="project-title">
          <h1>Aevo - Perps and Options Exchange</h1>
          <a 
            href="https://aevo.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="project-external-link"
          >
            <img src="/icons/arrow-up-right.svg" alt="Visit site" className="link-icon" />
          </a>
        </div>
      </header>

      {/* Project Images */}
      <main className="project-content">
        {[
          'perps-trading-price-chart.png',
          'perps-trading-depth-chart.png',
          'options-trading-options-chain.png',
          'options-trading-options-chain-1.png',
          'options-trading-trade-history.png',
          'portfolio-convert-modal-typing.png',
          'strategies.png',
          'airdrops.png',
          'rbn-to-aevo.png',
          'cmd-k.png',
          'mobile-trading.png',
        ].map((imageName) => (
          <img
            key={imageName}
            src={`/projects/aevo-perps/${imageName}`}
            alt={`Aevo ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
            className="project-image"
          />
        ))}
      </main>
    </div>
  );
}
