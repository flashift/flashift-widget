export interface Coin {
  id: string;
  symbol: string;
  fullname: string;
  network: string;
  uuid: string;
  image: string;
  marketCap: number;
  contractAddresses: string[];
  contract?: string;
}

export interface Net {
  name: string;
  fullname: string;
  image: string;
  networkUUID: string;
  marketCap: number;
  memo: boolean;
  networkid: any;
  explorer: any;
}

export interface Exchange {
  partner_name: any;
  exchange_type: string;
  amount: any;
  min_amount: number | undefined;
  max_amount: number | undefined;
  tags: string[];
  path?: any[];
}

export interface ExchangeRes {
  rate_id: string | undefined;
  max_amount: string;
  min_amount: string;
  message: string;
  data: Exchange[];
}
