'use client';

import { useEffect } from 'react';

/**
 * All project image paths used on Selected Work pages.
 * Preloading these on the homepage so they're cached before the user navigates.
 */
const PROJECT_IMAGE_URLS = [
  // aevo-perps
  '/projects/aevo-perps/perps-trading-price-chart.webp',
  '/projects/aevo-perps/perps-trading-depth-chart.webp',
  '/projects/aevo-perps/options-trading-options-chain.webp',
  '/projects/aevo-perps/options-trading-options-chain-1.webp',
  '/projects/aevo-perps/options-trading-trade-history.webp',
  '/projects/aevo-perps/portfolio-convert-modal-typing.webp',
  '/projects/aevo-perps/strategies.webp',
  '/projects/aevo-perps/airdrops.webp',
  '/projects/aevo-perps/rbn-to-aevo.webp',
  '/projects/aevo-perps/cmd-k.webp',
  '/projects/aevo-perps/mobile-trading.webp',
  // aevo-otc
  '/projects/aevo-otc/otc-pending-order.webp',
  '/projects/aevo-otc/payoff.webp',
  '/projects/aevo-otc/strike-selection.webp',
  '/projects/aevo-otc/pending-order.webp',
  '/projects/aevo-otc/order-filled.webp',
  '/projects/aevo-otc/portfolio.webp',
  '/projects/aevo-otc/positin-modal.webp',
  '/projects/aevo-otc/expiry-selection-active.webp',
  // ribbon-finance
  '/projects/ribbon-finance/vault.webp',
  '/projects/ribbon-finance/catalogue-grid.webp',
  '/projects/ribbon-finance/catalogue-carousel.webp',
  '/projects/ribbon-finance/mobile-vault.webp',
  '/projects/ribbon-finance/vault-scroll.webp',
  '/projects/ribbon-finance/payoff.webp',
  '/projects/ribbon-finance/vault-activity.webp',
  '/projects/ribbon-finance/rbn-claim.webp',
  '/projects/ribbon-finance/rbn-claiming.webp',
  '/projects/ribbon-finance/rbn-claimed.webp',
  '/projects/ribbon-finance/staking.webp',
  '/projects/ribbon-finance/rewards-calc.webp',
  // ribbon-lend
  '/projects/ribbon-lend/home.webp',
  '/projects/ribbon-lend/catalogue.webp',
  '/projects/ribbon-lend/mobile-home-catalogue.webp',
  '/projects/ribbon-lend/vault.webp',
  '/projects/ribbon-lend/vault-scrolled.webp',
  '/projects/ribbon-lend/deposit.webp',
  '/projects/ribbon-lend/mobile-vault.webp',
  '/projects/ribbon-lend/rbn-rewards.webp',
  '/projects/ribbon-lend/claiming-rbn.webp',
  '/projects/ribbon-lend/rbn-claimed.webp',
  '/projects/ribbon-lend/referrals.webp',
  '/projects/ribbon-lend/mobile-loading.webp',
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
