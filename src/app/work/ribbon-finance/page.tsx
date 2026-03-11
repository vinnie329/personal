import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  'vault.png',
  'catalogue-grid.png',
  'catalogue-carousel.png',
  'mobile-vault.png',
  'vault-scroll.png',
  'payoff.png',
  'vault-activity.png',
  'rbn-claim.png',
  'rbn-claiming.png',
  'rbn-claimed.png',
  'staking.png',
  'rewards-calc.png',
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
        {IMAGES.map((imageName) => (
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/ribbon-finance/${imageName}`}
              alt={`Ribbon Finance ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
              className="project-image"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
