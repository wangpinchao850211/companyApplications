import { User } from './user.module';
import { Err } from './err';

export interface Auth {
  user?: User;
  userId?: string;
  err?: Err;
  token?: string;
}
