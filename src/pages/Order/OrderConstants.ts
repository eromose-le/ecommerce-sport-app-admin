import { ORDER_STATUS } from "@/constants/enums";

export const ORDER_TAB = {
  NONE: ORDER_STATUS.NONE,
  PENDING: ORDER_STATUS.PENDING,
  SHIPPED: ORDER_STATUS.SHIPPED,
  OUT_FOR_DELIVERY: ORDER_STATUS.OUT_FOR_DELIVERY,
  DELIVERED: ORDER_STATUS.DELIVERED,
  CANCELED: ORDER_STATUS.CANCELED,
  FAILED_DELIVERY: ORDER_STATUS.FAILED_DELIVERY,
};

export const orderStatusResponse = [
  {
    id: 1,
    name: ORDER_STATUS.PENDING,
  },
  {
    id: 2,
    name: ORDER_STATUS.SHIPPED,
  },
  {
    id: 3,
    name: ORDER_STATUS.OUT_FOR_DELIVERY,
  },
  {
    id: 4,
    name: ORDER_STATUS.DELIVERED,
  },
  {
    id: 5,
    name: ORDER_STATUS.FAILED_DELIVERY,
  },
  {
    id: 6,
    name: ORDER_STATUS.CANCELED,
  },
];
