export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './groups.service';
import { GroupsService } from './groups.service';
export * from './products.service';
import { ProductsService } from './products.service';
export * from './ratings.service';
import { RatingsService } from './ratings.service';
export const APIS = [AuthenticationService, GroupsService, ProductsService, RatingsService];
