import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AevoPerps() {
  return (
    <div className="project-page">
      <Link href="/">
        <Logo className="project-logo" animateOnLoad />
      </Link>
      
      {/* Header */}
      <header className="project-header">
        <div className="project-title">
          <h1>Aevo - Perps and Options Exchange</h1>
        </div>
      </header>

      {/* Project Images */}
      <main className="project-content">
        {[
          'perps-trading-price-chart.webp',
          'perps-trading-depth-chart.webp',
          'options-trading-options-chain.webp',
          'options-trading-options-chain-1.webp',
          'options-trading-trade-history.webp',
          'portfolio-convert-modal-typing.webp',
          'strategies.webp',
          'airdrops.webp',
          'rbn-to-aevo.webp',
          'cmd-k.webp',
          'mobile-trading.webp',
        ].map((imageName, i) => (
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/aevo-perps/${imageName}`}
              alt={`Aevo ${imageName.replace(/-/g, ' ').replace('.webp', '')}`}
              className="project-image"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
