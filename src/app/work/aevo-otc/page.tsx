import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  'otc-pending-order.webp',
  'payoff.webp',
  'strike-selection.webp',
  'pending-order.webp',
  'order-filled.webp',
  'portfolio.webp',
  'positin-modal.webp',
  'expiry-selection-active.webp',
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
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/aevo-otc/${imageName}`}
              alt={`Aevo OTC ${imageName.replace(/-/g, ' ').replace('.webp', '')}`}
              className="project-image"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
