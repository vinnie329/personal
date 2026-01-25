import Link from 'next/link';
import Logo from '@/components/Logo';

export default function AevoPerps() {
  return (
    <div className="project-page">
      {/* Header */}
      <header className="project-header">
        <Link href="/">
          <Logo className="site-logo" />
        </Link>
        
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
        <img 
          src="/projects/aevo-perps/perps-trading-price-chart.png" 
          alt="Aevo trading interface" 
          className="project-image"
        />
      </main>
    </div>
  );
}
