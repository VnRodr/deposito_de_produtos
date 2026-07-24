import { Component, inject, OnInit } from '@angular/core';
import { StockAndStatus } from './stock-and-status/stock-and-status';
import { StockGroupService } from '../../services/stock-group-service';
import { StockGroupDTO } from '../../data/dto/stockGroupDTO';
import { ButtonModule } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import { Item } from '../../data/item';
import { ItemService } from '../../services/item-service';

@Component({
  selector: 'app-stock-groups',
  imports: [StockAndStatus, ButtonModule],
  templateUrl: './stock-groups.html',
  styleUrl: './stock-groups.scss',
})
export class StockGroups implements OnInit {
  stockGroupList: StockGroupDTO[] = [];
  totalUniqueItems: number | null = null;
  totalStockValue: number | null = null;
  private stockGroupService = inject(StockGroupService);
  private itemService = inject(ItemService);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.stockGroupService.stockGroupCreated
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadStockGroups();
      });

    this.stockGroupService.refreshNeeded.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadStockGroups();
    });

    this.loadStockGroups();
    this.loadItemMetrics();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openCreateStockGroupDialog() {
    this.stockGroupService.requestOpenCreateDialog();
  }

  syncEmptyState() {
    this.stockGroupService.setStockGroupsEmptyState(this.stockGroupList.length === 0);
  }

  loadStockGroups() {
    this.stockGroupService.getAllStocks().subscribe({
      next: (groups) => {
        this.stockGroupList = groups;
        this.stockGroupService.setStockGroups(groups);
        this.syncEmptyState();
      },
      error: (error) => {
        console.error('Error loading stock groups:', error);
        this.stockGroupList = [];
        this.stockGroupService.setStockGroups([]);
        this.syncEmptyState();
      },
    });
  }

  loadItemMetrics() {
    this.itemService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe({
      next: (items) => {
        this.totalUniqueItems = new Set(items.map((item) => item.name.trim().toLowerCase())).size;
        this.totalStockValue = this.getTotalValue(items);
      },
      error: (error) => {
        console.error('Error loading stock item metrics:', error);
        this.totalUniqueItems = null;
        this.totalStockValue = null;
      },
    });
  }

  private getItemTotalValue(item: Item): number {
    return Number(item.unitValue || 0) * Number(item.quantity || 0);
  }

  private getTotalValue(items: Item[]): number {
    return items.reduce((total, item) => total + this.getItemTotalValue(item), 0);
  }
}
