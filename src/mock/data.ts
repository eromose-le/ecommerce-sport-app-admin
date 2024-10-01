export const generateMockAgents = (count: number) => {
  const statuses = ["Active", "Inactive", "Pending"];
  const approvalStatuses = ["Verified", "Unverified", "Under Review"];

  return Array.from({ length: count }, (_, i) => ({
    id: `AGENT${i + 1}`,
    name: `Agent ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    approval:
      approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)],
  }));
};

export const generateMockClients = (count: number) => {
  const statuses = ["Active", "Inactive", "Suspended"];
  const memberships = ["Gold", "Silver", "Bronze"];

  return Array.from({ length: count }, (_, i) => ({
    id: `CLIENT${i + 1}`,
    name: `Client ${i + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    membership: memberships[Math.floor(Math.random() * memberships.length)],
  }));
};
