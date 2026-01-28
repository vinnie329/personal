import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  '01-vault.png',
  '02-catalogue-grid.png',
  '03-catalogue-carousel.png',
  '04-mobile-vault.png',
  '05-vault-scroll.png',
  '06-payoff.png',
  '07-vault-activity.png',
  '08-rbn-claim.png',
  '09-rbn-claiming.png',
  '10-rbn-claimed.png',
  '11-staking.png',
  '12-rewards-calc.png',
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
          <img
            key={imageName}
            src={`/projects/ribbon-finance/${imageName}`}
            alt={`Ribbon Finance ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
            className="project-image"
          />
        ))}
      </main>
    </div>
  );
}
