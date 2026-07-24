export class Employee {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;

  constructor(
    id: string = '',
    name: string = '',
    department: string = '',
    email: string = '',
    phone: string = '',
  ) {
    this.id = id;
    this.name = name;
    this.department = department;
    this.email = email;
    this.phone = phone;
  }
}
