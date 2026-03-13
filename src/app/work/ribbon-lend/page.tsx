import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  'home.webp',
  'catalogue.webp',
  'mobile-home-catalogue.webp',
  'vault.webp',
  'vault-scrolled.webp',
  'deposit.webp',
  'mobile-vault.webp',
  'rbn-rewards.webp',
  'claiming-rbn.webp',
  'rbn-claimed.webp',
  'referrals.webp',
  'mobile-loading.webp',
];

export default function RibbonLend() {
  return (
    <div className="project-page">
      <Link href="/">
        <Logo className="project-logo" animateOnLoad />
      </Link>

      <header className="project-header">
        <div className="project-title">
          <h1>Ribbon Lend - Unsecured lending to KYC/AML&apos;d institutional market makers</h1>
        </div>
      </header>

      <main className="project-content">
        {IMAGES.map((imageName, i) => (
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/ribbon-lend/${imageName}`}
              alt={`Ribbon Lend ${imageName.replace(/-/g, ' ').replace('.webp', '')}`}
              className="project-image"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
