import { Employee } from './employee';

export class StockGroup {
  id!: string;
  name!: string;
  totalItems!: number;
  value!: number;
  lowStock!: number;
  status!: 'GOOD' | 'WARNING';
  responsible!: Employee;

  constructor(
    id: string,
    name: string,
    responsible: Employee,
    totalItems: number,
    value: number,
    lowStock: number,
    status: 'GOOD' | 'WARNING',
  ) {
    this.id = id;
    this.name = name;
    this.responsible = responsible;
    this.totalItems = totalItems;
    this.value = value;
    this.lowStock = lowStock;
    this.status = status;
  }
}
