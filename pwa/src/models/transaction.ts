export interface transactionObject {
  wallet_address?: string;
  transaction_id?: string;
  type?: string;
  description?: string;
  fee?: number;
  feeToken?: string;
  amount?: number;
  paid_to?: string;
  updated_date?: string;
}
