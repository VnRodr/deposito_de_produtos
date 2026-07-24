import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { StockGroupService } from '../../../services/stock-group-service';

@Component({
  selector: 'app-card',
  templateUrl: './card.html',
  standalone: true,
  styleUrl: './card.scss'
})
export class Card implements OnInit, OnDestroy {
  totalStockGroups: number | null = null;

  private stockGroupService = inject(StockGroupService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.stockGroupService.stockGroupsChanged.pipe(takeUntil(this.destroy$)).subscribe((groups) => {
      this.totalStockGroups = groups ? groups.length : null;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
