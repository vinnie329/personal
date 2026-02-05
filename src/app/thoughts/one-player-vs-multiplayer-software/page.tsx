import Link from 'next/link';
import Logo from '@/components/Logo';

export const metadata = {
  title: 'One-Player vs Multiplayer Software — Vinnie',
  description: 'On one-player vs multiplayer software in a world of abundant super intelligence.',
};

export default function OnePlayerVsMultiplayerSoftware() {
  return (
    <div className="article-page">
      <Link href="/">
        <Logo className="article-logo" animateOnLoad />
      </Link>

      <header className="article-header">
        <h1 className="article-title">One-Player vs Multiplayer Software</h1>
        <time className="article-date" dateTime="2025-04">April 2025</time>
      </header>

      <article className="article-content">
        <p>
          In a world of abundant super intelligence, is it possible that all one-player software (software that doesn't have any network effects) becomes free?
        </p>
        <p>
          We are heading towards a world where anyone can access a fleet of ai agents that can write software better than the best programmers in the world today. In this world, the cost of producing software likely tends towards zero and every dollar of profit across every conceivable vertical of one-player software could be competed away. Oh you like Notion? Just ask your LLM coding agent of choice to spin up an exact clone. What about Duolingo? All done in seconds.
        </p>
        <p>
          One-player software that is built on top of some proprietary data (Palantir Foundry), has some hardware dependency (devices like an Oura ring), has some regulatory protection / barrier (air traffic control software) or some truly unique <a href="https://www.youtube.com/watch?v=QdBZY2fkU-0" target="_blank" rel="noopener noreferrer">brand / product experience</a> likely still has the ability to charge non-zero fees.
        </p>
        <p>
          Otherwise multiplayer software (any software with real network effects) are likely the only pieces of software that have any real economic durability.
        </p>
      </article>
    </div>
  );
}
