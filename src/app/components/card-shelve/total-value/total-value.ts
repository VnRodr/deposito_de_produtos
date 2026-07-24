import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Item } from '../../../data/item';
import { ItemService } from '../../../services/item-service';

@Component({
  selector: 'app-total-value',
  templateUrl: './total-value.html',
  styleUrl: './total-value.scss'
})
export class TotalValue implements OnInit, OnDestroy {
  totalValue: number | null = null;

  private itemService = inject(ItemService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.itemService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.totalValue = this.getTotalValue(items);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  formatCurrency(value: number | null): string {
    if (value === null) {
      return '';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  private getItemTotalValue(item: Item): number {
    return Number(item.unitValue || 0) * Number(item.quantity || 0);
  }

  private getTotalValue(items: Item[]): number {
    return items.reduce((total, item) => total + this.getItemTotalValue(item), 0);
  }
}
