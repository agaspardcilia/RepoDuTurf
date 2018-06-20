import { Moment } from 'moment';
import { IDepartment } from './department.model';
import { IJob } from './job.model';
import { IEmployee } from './employee.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  salary?: number;
  commissionPct?: number;
  department?: IDepartment;
  jobs?: IJob[];
  manager?: IEmployee;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public phoneNumber?: string,
    public hireDate?: Moment,
    public salary?: number,
    public commissionPct?: number,
    public department?: IDepartment,
    public jobs?: IJob[],
    public manager?: IEmployee
  ) {}
}
