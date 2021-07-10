export interface CreditCardI {
  id?: string;
  holder: string;
  number: number;
  expirationDate: string;
  cvv: number;
  createDate: Date;
  updateDate: Date;
}
