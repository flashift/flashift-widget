declare module "flashift-coin-search" {
  interface CoinManager {
    loadCoinTrie(data: any): void;
    suggest(query: string, network?: string): string[];
  }

  const coinManager: CoinManager;
  export default coinManager;
}
