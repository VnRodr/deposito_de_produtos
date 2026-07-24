import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { StockGroupService } from '../../services/stock-group-service';
import { SelectModule } from 'primeng/select';
import { StockGroupDTO } from '../../data/dto/stockGroupDTO';
import { EmployeeDTO } from '../../data/dto/employeeDTO';
import { switchMap } from 'rxjs';
import { InputMask } from 'primeng/inputmask';
@Component({
  selector: 'app-dashboard',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    SelectModule,
    FormsModule,
    InputMask,
  ],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent {
  private destroyRef = inject(DestroyRef);
  private employeeService = inject(EmployeeService);
  private stockGroupService = inject(StockGroupService);
  stockGroupDraft: StockGroupDTO = new StockGroupDTO('', new EmployeeDTO(), 0, 0, 0, 'WARNING');

  visible: boolean = false;
  showHeaderCreateButton = false;
  submitAttempted = false;
  statusOptions = [
    { label: 'GOOD', value: 'GOOD' },
    { label: 'WARNING', value: 'WARNING' },
  ];

  constructor() {
    this.stockGroupService.openCreateDialogRequested
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.showCreateStockGroupForm());

    this.stockGroupService.stockGroupsEmptyStateChanged
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isEmpty) => {
        this.showHeaderCreateButton = !isEmpty;
      });
  }

  showCreateStockGroupForm() {
    this.stockGroupDraft = new StockGroupDTO('', new EmployeeDTO(), 0, 0, 0, 'WARNING');
    this.visible = true;
    this.submitAttempted = false;
  }

  onConfirm() {
    this.submitAttempted = true;
    if (!this.isFormValid()) {
      return;
    }
    this.visible = false;

    const newStockGroupDTO = new StockGroupDTO(
      this.stockGroupDraft.name,
      this.stockGroupDraft.responsible,
      0,
      0,
      0,
      this.stockGroupDraft.status,
    );

    this.stockGroupService.notifyCreatedStockGroup(newStockGroupDTO);

    this.employeeService
      .createNewEmployee(this.stockGroupDraft.responsible)
      .pipe(
        switchMap((employee: EmployeeDTO) => {
          const newStockGroupDTO: StockGroupDTO = {
            ...this.stockGroupDraft,
            responsible: employee,
          };

          return this.stockGroupService.createNewStock(newStockGroupDTO);
        }),
      )
      .subscribe({
        next: (stockGroup: StockGroupDTO) => {
          console.log('Stock group created successfully:', stockGroup);
        },
        error: (error: any) => {
          console.error('Error creating stock group:', error);
        },
      });
  }

  isPhoneValid(phone: string): boolean {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 11;
  }

  isFormValid(): boolean {
    const responsible = this.stockGroupDraft.responsible;
    return (
      this.stockGroupDraft.name.trim().length > 0 &&
      responsible.name.trim().length > 0 &&
      responsible.email.trim().length > 0 &&
      this.isPhoneValid(responsible.phone) &&
      responsible.department.trim().length > 0 &&
      !!this.stockGroupDraft.status
    );
  }
}
