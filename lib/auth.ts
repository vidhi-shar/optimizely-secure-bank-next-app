export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

export const STATIC_USERS: User[] = [
  {
    id: "1",
    email: "john.smith@example.com",
    password: "SecureBank@123",
    name: "John Smith",
  },
  {
    id: "2",
    email: "sarah.jones@example.com",
    password: "Banking@456",
    name: "Sarah Jones",
  },
  {
    id: "3",
    email: "demo@securebank.com",
    password: "Demo@2024",
    name: "Demo User",
  },
];

export function findUser(email: string, password: string): User | null {
  return (
    STATIC_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    ) ?? null
  );
}
