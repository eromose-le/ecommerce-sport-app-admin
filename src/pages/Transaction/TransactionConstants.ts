import { TRANSACTION_STATUS } from "@/constants/enums";

export const TRANSACTION_TAB = {
  NONE: TRANSACTION_STATUS.NONE,
  PENDING: TRANSACTION_STATUS.PENDING,
  SUCCESS: TRANSACTION_STATUS.SUCCESS,
  FAILED: TRANSACTION_STATUS.FAILED,
};

export const transactionStatusResponse = [
  {
    id: 1,
    name: TRANSACTION_STATUS.PENDING,
  },
  {
    id: 2,
    name: TRANSACTION_STATUS.SUCCESS,
  },
  {
    id: 3,
    name: TRANSACTION_STATUS.FAILED,
  },
];
