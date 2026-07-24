import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ItemService } from '../../../services/item-service';

@Component({
  selector: 'app-total-items',
  templateUrl: './total-items.html',
  styleUrl: './total-items.scss'
})
export class TotalItems implements OnInit, OnDestroy {
  totalItems: number | null = null;

  private itemService = inject(ItemService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.itemService.getAllItems().pipe(takeUntil(this.destroy$)).subscribe((items) => {
      this.totalItems = new Set(items.map((item) => item.name.trim().toLowerCase())).size;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
