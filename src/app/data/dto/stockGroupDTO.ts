import { EmployeeDTO } from './employeeDTO';

export class StockGroupDTO {
  name!: string;
  totalItems!: number;
  value!: number;
  lowStock!: number;
  status!: 'GOOD' | 'WARNING';
  responsible!: EmployeeDTO;

  constructor(
    name: string,
    responsible: EmployeeDTO,
    totalItems: number,
    value: number,
    lowStock: number,
    status: 'GOOD' | 'WARNING',
  ) {
    this.name = name;
    this.responsible = responsible;
    this.totalItems = totalItems;
    this.value = value;
    this.lowStock = lowStock;
    this.status = status;
  }
}
