import { FC } from "react";
import ClientTable from "./ClientTable";

interface ClientVerifiedProps {}
const ClientVerified: FC<ClientVerifiedProps> = () => {
  return (
    <>
      <ClientTable />
    </>
  );
};

export default ClientVerified;
