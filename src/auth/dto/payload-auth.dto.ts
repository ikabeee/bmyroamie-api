import { Status } from 'src/common/enums/Status.enum';

export class PayloadAuthDto {
  name: string;
  email: string;
  role: string;
  status: Status;
}
