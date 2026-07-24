export class EmployeeDTO {
  name: string;
  department: string;
  email: string;
  phone: string;

  constructor(name: string = '', department: string = '', email: string = '', phone: string = '') {
    this.name = name;
    this.department = department;
    this.email = email;
    this.phone = phone;
  }
}
