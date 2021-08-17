import { Capabilities } from './cmsTypes';

export interface AuthUser {
  id: number | null;
  email: string;
  capabilities: Capabilities;
  roles?: string[];
  jwtAuthExpiration: string;
}
