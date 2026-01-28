import Link from 'next/link';
import Logo from '@/components/Logo';

const IMAGES = [
  '01-home.png',
  '02-catalogue.png',
  '03-mobile-home-catalogue.png',
  '04-vault.png',
  '05-vault-scrolled.png',
  '06-deposit.png',
  '07-mobile-vault.png',
  '08-rbn-rewards.png',
  '09-claiming-rbn.png',
  '10-rbn-claimed.png',
  '11-referrals.png',
  '12-mobile-loading.png',
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
          <img
            key={imageName}
            src={`/projects/ribbon-lend/${imageName}`}
            alt={`Ribbon Lend ${imageName.replace(/-/g, ' ').replace('.png', '')}`}
            className="project-image"
          />
        ))}
      </main>
    </div>
  );
}
