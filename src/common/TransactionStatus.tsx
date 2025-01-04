import { getTransactionStatusDetails } from "@/utils/utils";

interface TransactionStatusProps {
  status: string;
}

const TransactionStatus: React.FC<TransactionStatusProps> = ({ status }) => {
  const { colorClass, formattedStatus } = getTransactionStatusDetails(status);

  return (
    <p className={`text-sm font-semibold mt-1 ${colorClass}`}>
      {formattedStatus}
    </p>
  );
};

export default TransactionStatus;
