export interface CreditCard {
  id?: string;
  holder: string;
  number: number;
  expirationDate: Date;
  cvv: number;
}
