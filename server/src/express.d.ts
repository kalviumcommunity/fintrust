import { User } from "./services/user.service"; 

declare global {
  namespace Express {
    interface Request {
      user?: User; 
    }
  }
}

export function Router() {
  throw new Error('Function not implemented.');
}
