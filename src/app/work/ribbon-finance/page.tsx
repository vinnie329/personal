import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  'vault.webp',
  'catalogue-grid.webp',
  'catalogue-carousel.webp',
  'mobile-vault.webp',
  'vault-scroll.webp',
  'payoff.webp',
  'vault-activity.webp',
  'rbn-claim.webp',
  'rbn-claiming.webp',
  'rbn-claimed.webp',
  'staking.webp',
  'rewards-calc.webp',
];

export default function RibbonFinance() {
  return (
    <div className="project-page">
      <Link href="/">
        <Logo className="project-logo" animateOnLoad />
      </Link>

      <header className="project-header">
        <div className="project-title">
          <h1>Ribbon Finance - DeFi&apos;s First Decentralised Options Vaults</h1>
        </div>
      </header>

      <main className="project-content">
        {IMAGES.map((imageName, i) => (
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/ribbon-finance/${imageName}`}
              alt={`Ribbon Finance ${imageName.replace(/-/g, ' ').replace('.webp', '')}`}
              className="project-image"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
