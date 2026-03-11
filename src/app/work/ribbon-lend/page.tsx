import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  'home.png',
  'catalogue.png',
  'mobile-home-catalogue.png',
  'vault.png',
  'vault-scrolled.png',
  'deposit.png',
  'mobile-vault.png',
  'rbn-rewards.png',
  'claiming-rbn.png',
  'rbn-claimed.png',
  'referrals.png',
  'mobile-loading.png',
  'derebit.png',
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
        {IMAGES.map((imageName) => (
          <div key={imageName} className="project-image-wrapper">
            <img
              src={`/projects/ribbon-lend/${imageName}`}
              alt={`Ribbon Lend ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
              className="project-image"
            />
          </div>
        ))}
      </main>
    </div>
  );
}
