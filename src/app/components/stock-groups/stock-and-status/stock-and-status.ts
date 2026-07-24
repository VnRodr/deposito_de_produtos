import { Component, inject, Input } from '@angular/core';
import { StockGroupDTO } from '../../../data/dto/stockGroupDTO';
import { NavigationService } from '../../../services/navigation-service';

@Component({
  selector: 'app-stock-and-status',
  templateUrl: './stock-and-status.html',
  styleUrl: './stock-and-status.scss',
})
export class StockAndStatus {
  @Input() stockGroup!: StockGroupDTO;
  @Input() totalItems: number | null = null;
  @Input() totalValue: number | null = null;

  private router = inject(NavigationService);
  goToStockItemsPage(stockGroupName: string) {
    this.router.goToPageWithCustomName('stockItens', stockGroupName);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  getDisplayedTotalItems(): number {
    return this.totalItems ?? this.stockGroup.totalItems;
  }

  getDisplayedTotalValue(): number {
    return this.totalValue ?? this.stockGroup.value;
  }
}
