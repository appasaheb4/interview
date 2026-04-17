export {};
declare global {
  type Users = 'USER' | 'ADMIN';
  interface Profile {
    id: string;
    name: string;
    age: number;
  }
}
