import { Hospital, Organ, User } from "../types";

export const mockUsers: User[] = [
  { id: 1, username: "admin", password: "123", role: "admin" },
  { id: 2, username: "receptor", password: "123", role: "receptor" },
  { id: 3, username: "doador", password: "123", role: "doador" },
];

export const mockOrgans: Organ[] = [
  { id: 1, name: "Coração", status: "available" },
  { id: 2, name: "Fígado", status: "waiting" },
];

export const mockHospitals: Hospital[] = [
  { id: 1, name: "General Hospital" },
  { id: 2, name: "City Clinic" },
];
