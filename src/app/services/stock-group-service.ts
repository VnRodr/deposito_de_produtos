import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { StockGroupDTO } from '../data/dto/stockGroupDTO';
import { environment } from '../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class StockGroupService {
  private http = inject(HttpClient);
  private stockGroups$ = new BehaviorSubject<StockGroupDTO[] | null>(null);
  public stockGroupsChanged = this.stockGroups$.asObservable();
  private refreshTrigger$ = new Subject<void>();
  public refreshNeeded = this.refreshTrigger$.asObservable();
  private createdStockGroup$ = new Subject<StockGroupDTO>();
  public stockGroupCreated = this.createdStockGroup$.asObservable();
  private updatedStockGroup$ = new Subject<StockGroupDTO>();
  public stockGroupUpdated = this.updatedStockGroup$.asObservable();
  private openCreateDialogTrigger$ = new Subject<void>();
  public openCreateDialogRequested = this.openCreateDialogTrigger$.asObservable();
  private stockGroupsEmptyState$ = new BehaviorSubject<boolean>(true);
  public stockGroupsEmptyStateChanged = this.stockGroupsEmptyState$.asObservable();

  refreshStockGroups() {
    this.refreshTrigger$.next();
  }

  notifyCreatedStockGroup(stockGroup: StockGroupDTO) {
    this.createdStockGroup$.next(stockGroup);
  }

  notifyUpdatedStockGroup(stockGroup: StockGroupDTO) {
    this.updatedStockGroup$.next(stockGroup);
  }

  requestOpenCreateDialog() {
    this.openCreateDialogTrigger$.next();
  }

  setStockGroupsEmptyState(isEmpty: boolean) {
    this.stockGroupsEmptyState$.next(isEmpty);
  }

  setStockGroups(stockGroups: StockGroupDTO[]) {
    this.stockGroups$.next(stockGroups);
  }

  getOneStock(id: string): Observable<StockGroupDTO> {
    return this.http.get<StockGroupDTO>(environment.apiBaseUrl + '/stockGroups/' + id);
  }

  getAllStocks(): Observable<StockGroupDTO[]> {
    return this.http.get<StockGroupDTO[]>(environment.apiBaseUrl + '/stockGroups');
  }

  createNewStock(newStock: StockGroupDTO): Observable<StockGroupDTO> {
    return this.http.post<StockGroupDTO>(environment.apiBaseUrl + '/create-stockGroup', newStock);
  }

  deleteStock(stockId: string): Observable<StockGroupDTO> {
    return this.http.delete<StockGroupDTO>(environment.apiBaseUrl + '/delete/' + stockId);
  }
}
