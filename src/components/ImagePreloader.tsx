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
  '/projects/aevo-otc/otc-pending-order.png',
  '/projects/aevo-otc/payoff.png',
  '/projects/aevo-otc/strike-selection.png',
  '/projects/aevo-otc/pending-order.png',
  '/projects/aevo-otc/order-filled.png',
  '/projects/aevo-otc/portfolio.png',
  '/projects/aevo-otc/positin-modal.png',
  '/projects/aevo-otc/expiry-selection-active.png',
  // ribbon-finance
  '/projects/ribbon-finance/vault.png',
  '/projects/ribbon-finance/catalogue-grid.png',
  '/projects/ribbon-finance/catalogue-carousel.png',
  '/projects/ribbon-finance/mobile-vault.png',
  '/projects/ribbon-finance/vault-scroll.png',
  '/projects/ribbon-finance/payoff.png',
  '/projects/ribbon-finance/vault-activity.png',
  '/projects/ribbon-finance/rbn-claim.png',
  '/projects/ribbon-finance/rbn-claiming.png',
  '/projects/ribbon-finance/rbn-claimed.png',
  '/projects/ribbon-finance/staking.png',
  '/projects/ribbon-finance/rewards-calc.png',
  // ribbon-lend
  '/projects/ribbon-lend/home.png',
  '/projects/ribbon-lend/catalogue.png',
  '/projects/ribbon-lend/mobile-home-catalogue.png',
  '/projects/ribbon-lend/vault.png',
  '/projects/ribbon-lend/vault-scrolled.png',
  '/projects/ribbon-lend/deposit.png',
  '/projects/ribbon-lend/mobile-vault.png',
  '/projects/ribbon-lend/rbn-rewards.png',
  '/projects/ribbon-lend/claiming-rbn.png',
  '/projects/ribbon-lend/rbn-claimed.png',
  '/projects/ribbon-lend/referrals.png',
  '/projects/ribbon-lend/mobile-loading.png',
  '/projects/ribbon-lend/derebit.png',
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
