export type Patient = { id: number; name: string; age: number; email: string; status: "Active" | "Inactive" | "Pending"; balance: number };

const first = ["James", "Mary", "John", "Linda", "Robert", "Emma", "Michael", "Olivia", "David", "Sophia"];
const last = ["Smith", "Johnson", "Brown", "Garcia", "Miller", "Davis"];
const statuses: Patient["status"][] = ["Active", "Inactive", "Pending"];

export const patients: Patient[] = Array.from({ length: 30 }, (_, i) => {
  const name = `${first[i % first.length]} ${last[(i * 7) % last.length]}`;
  return {
    id: i + 1,
    name,
    age: 18 + ((i * 13) % 70),
    email: `${name.toLowerCase().replace(" ", ".")}${i + 1}@example.com`,
    status: statuses[i % 3],
    balance: ((i * 137) % 2000) + 0.5 * (i % 2),
  };
});
