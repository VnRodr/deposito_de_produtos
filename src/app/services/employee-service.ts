import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../data/dto/employeeDTO';
import { environment } from '../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private http = inject(HttpClient);

  getOneEmployee(id: string): Observable<EmployeeDTO> {
    return this.http.get<EmployeeDTO>(environment.apiBaseUrl + '/employees/' + id);
  }

  getAllEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(environment.apiBaseUrl + '/employees');
  }

  createNewEmployee(newEmployeeDTO: EmployeeDTO): Observable<EmployeeDTO> {
    return this.http.post<EmployeeDTO>(environment.apiBaseUrl + '/create-employee', newEmployeeDTO);
  }

  deleteEmployee(employeeId: string): Observable<EmployeeDTO> {
    return this.http.delete<EmployeeDTO>(environment.apiBaseUrl + '/delete/' + employeeId);
  }
}
