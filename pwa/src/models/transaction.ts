export interface transactionObject {
  wallet_address?: string;
  transaction_id?: string;
  type?: string;
  amount?: number;
  feeToken?: string;
  fee?: number;
  paid_to?: string;
  created_date?: string;
  updated_date?: string;
}
