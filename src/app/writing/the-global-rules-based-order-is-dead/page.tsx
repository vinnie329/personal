import Link from 'next/link';
import Logo from '@/components/Logo';

export const metadata = {
  title: 'The Global Rules-Based Order is Dead — Vinnie',
  description: 'On the end of the rules-based world order and the shift to a multipolar world.',
};

export default function TheGlobalRulesBasedOrderIsDead() {
  return (
    <div className="article-page">
      <Link href="/">
        <Logo className="article-logo" animateOnLoad />
      </Link>

      <header className="article-header">
        <h1 className="article-title">The Global Rules-Based Order is Dead</h1>
        <time className="article-date" dateTime="2026-01">January 2026</time>
      </header>

      <article className="article-content">
        <p>
          The rules-based world order established by the 1944 Bretton Woods Agreement is dead. So too is the legitimacy of institutions such as the IMF, World Bank, UN, WTO, and NATO, which hard-coded American interests into the plumbing of global finance, trade, and security. We have entered a multipolar world where sovereigns face no choice but to aggressively accumulate the resources necessary to guarantee their own security.
        </p>
        <p>
          The events over the last month (see bullets below) confirm that the US is no longer willing to passively watch on as China ramps up its ambitions to secure energy, rare-earth metals, supply chains and military positioning across the world in order to achieve global supremacy. The &ldquo;Donroe Doctrine&rdquo; (<a href="https://x.com/JackFarley96/status/2008266046520885292" target="_blank" rel="noopener noreferrer">which Steve Hou predicted in December 2025</a>) is now in play — a Trump-era reinvention of the 1823 Monroe Doctrine asserting the Western Hemisphere as a core zone of American strategic interest:
        </p>
        <ul>
          <li>
            <strong>Operation Absolute Resolve</strong>
            <p>
              The US secured 50m barrels of Venezuelan heavy crude following the <a href="https://www.youtube.com/watch?v=5LcXCZaYJN4" target="_blank" rel="noopener noreferrer">successful decapitation strike</a> that led to Maduro and his wife being extracted from their Caracas compound and brought to New York City on narco-terrorism and drug-trafficking charges. The message is clear — China&rsquo;s Belt and Road efforts in the Americas (<a href="https://www.youtube.com/watch?v=1wg_H65c-uI" target="_blank" rel="noopener noreferrer">China was importing nearly 80% of Venezuela&rsquo;s &ldquo;shadow&rdquo; oil</a>) will no longer be tolerated.
            </p>
          </li>
          <li>
            <strong>Bid for Greenland</strong>
            <p>
              <a href="https://x.com/wolfejosh/article/2013768012642349120" target="_blank" rel="noopener noreferrer">Josh Wolfe&rsquo;s coverage</a> of the saga is a must-read. Wolfe highlights that European attempts to invoke international law is futile when the mirage of a rules-based order vanishes. With China and Russia continuing to lurk around the arctic, the US understands that securing rare-earths is necessary for its industrial and military strength. Wolfe notes that sovereigns must be guided by &ldquo;the irreducible logic of who controls the inputs for the next generation of weapons&rdquo;.
            </p>
          </li>
          <li>
            <strong>Carney says the quiet part out loud …</strong>
            <p>
              <a href="https://x.com/tparsi/status/2013677260956402059" target="_blank" rel="noopener noreferrer">Carney suggests that the rules-based order was enshrined with US interests and that international law has never been applied in a politically neutral way.</a>
            </p>
          </li>
        </ul>
      </article>
    </div>
  );
}
