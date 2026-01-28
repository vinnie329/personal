import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  '01-otc-pending-order.png',
  '02-payoff.png',
  '03-strike-selection.png',
  '04-pending-order.png',
  '05-order-filled.png',
  '06-order-not-filled.png',
  '07-portfolio.png',
  '08-positin-modal.png',
  '09-expiry-selection-active.png',
];

export default function AevoOtc() {
  return (
    <div className="project-page">
      <Link href="/">
        <Logo className="project-logo" animateOnLoad />
      </Link>

      <header className="project-header">
        <div className="project-title">
          <h1>Aevo - OTC Altcoin Options Settled Onchain</h1>
        </div>
      </header>

      <main className="project-content">
        {IMAGES.map((imageName) => (
          <img
            key={imageName}
            src={`/projects/aevo-otc/${imageName}`}
            alt={`Aevo OTC ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
            className="project-image"
          />
        ))}
      </main>
    </div>
  );
}
