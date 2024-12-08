export interface User {
  id: number;
  username: string;
  role: "admin" | "receptor" | "doador";
}

export interface Organ {
  id: number;
  name: string;
  status: "available" | "waiting";
}

export interface Hospital {
  id: number;
  name: string;
  location?: string; 
}
