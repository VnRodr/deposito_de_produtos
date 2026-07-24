import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StockGroupService } from '../../../services/stock-group-service';

@Component({
  selector: 'app-stocks-in-alert',
  templateUrl: './stocks-in-alert.html',
  styleUrl: './stocks-in-alert.scss'
})
export class StocksInAlert implements OnInit, OnDestroy {
  totalLowStock: number | null = null;

  private stockGroupService = inject(StockGroupService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.stockGroupService.stockGroupsChanged.pipe(takeUntil(this.destroy$)).subscribe((groups) => {
      this.totalLowStock = groups
        ? groups.reduce((total, group) => total + Number(group.lowStock || 0), 0)
        : null;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
