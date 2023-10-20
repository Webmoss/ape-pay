export interface transactionObject {
  transaction_id?: number;
  transaction_hash?: string;
  wallet_address?: string;
  type?: string;
  description?: string;
  fee?: string;
  feeToken?: string;
  amount?: string;
  paid_to?: string;
  updated_date?: string;
}
