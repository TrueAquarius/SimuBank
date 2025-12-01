export interface User {
  id?: string;
  name: string;
  email: string;
  mobileNumber: string;
  password?: string; // Optional because it should not be sent to the client
}