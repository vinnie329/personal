'use client';

import { useEffect } from 'react';

/**
 * All project image paths used on Selected Work pages.
 * Preloading these on the homepage so they're cached before the user navigates.
 */
const PROJECT_IMAGE_URLS = [
  // aevo-perps
  '/projects/aevo-perps/perps-trading-price-chart.png',
  '/projects/aevo-perps/perps-trading-depth-chart.png',
  '/projects/aevo-perps/options-trading-options-chain.png',
  '/projects/aevo-perps/options-trading-options-chain-1.png',
  '/projects/aevo-perps/options-trading-trade-history.png',
  '/projects/aevo-perps/portfolio-convert-modal-typing.png',
  '/projects/aevo-perps/strategies.png',
  '/projects/aevo-perps/airdrops.png',
  '/projects/aevo-perps/rbn-to-aevo.png',
  '/projects/aevo-perps/cmd-k.png',
  '/projects/aevo-perps/mobile-trading.png',
  // aevo-otc
  '/projects/aevo-otc/01-otc-pending-order.png',
  '/projects/aevo-otc/02-payoff.png',
  '/projects/aevo-otc/03-strike-selection.png',
  '/projects/aevo-otc/04-pending-order.png',
  '/projects/aevo-otc/05-order-filled.png',
  '/projects/aevo-otc/06-order-not-filled.png',
  '/projects/aevo-otc/07-portfolio.png',
  '/projects/aevo-otc/08-positin-modal.png',
  '/projects/aevo-otc/09-expiry-selection-active.png',
  // ribbon-finance
  '/projects/ribbon-finance/01-vault.png',
  '/projects/ribbon-finance/02-catalogue-grid.png',
  '/projects/ribbon-finance/03-catalogue-carousel.png',
  '/projects/ribbon-finance/04-mobile-vault.png',
  '/projects/ribbon-finance/05-vault-scroll.png',
  '/projects/ribbon-finance/06-payoff.png',
  '/projects/ribbon-finance/07-vault-activity.png',
  '/projects/ribbon-finance/08-rbn-claim.png',
  '/projects/ribbon-finance/09-rbn-claiming.png',
  '/projects/ribbon-finance/10-rbn-claimed.png',
  '/projects/ribbon-finance/11-staking.png',
  '/projects/ribbon-finance/12-rewards-calc.png',
  // ribbon-lend
  '/projects/ribbon-lend/01-home.png',
  '/projects/ribbon-lend/02-catalogue.png',
  '/projects/ribbon-lend/03-mobile-home-catalogue.png',
  '/projects/ribbon-lend/04-vault.png',
  '/projects/ribbon-lend/05-vault-scrolled.png',
  '/projects/ribbon-lend/06-deposit.png',
  '/projects/ribbon-lend/07-mobile-vault.png',
  '/projects/ribbon-lend/08-rbn-rewards.png',
  '/projects/ribbon-lend/09-claiming-rbn.png',
  '/projects/ribbon-lend/10-rbn-claimed.png',
  '/projects/ribbon-lend/11-referrals.png',
  '/projects/ribbon-lend/12-mobile-loading.png',
];

export default function ImagePreloader() {
  useEffect(() => {
    // Start preloading when the browser is idle so we don't compete with
    // initial paint; fallback to a short delay if requestIdleCallback isn't available
    const startPreload = () => {
      PROJECT_IMAGE_URLS.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(startPreload, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(startPreload, 500);
    return () => clearTimeout(t);
  }, []);

  return null;
}
