import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../data/item';
import { environment } from '../environment/environment.prod';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private http = inject(HttpClient);

  getOneItem(id: string): Observable<Item> {
    return this.http.get<Item>(environment.apiBaseUrl + '/items/' + id);
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(environment.apiBaseUrl + '/items');
  }

  createNewItem(newItem: Item): Observable<Item> {
    return this.http.post<Item>(environment.apiBaseUrl + '/create-item', newItem);
  }

  deleteItemName(itemName: string): Observable<Item> {
    return this.http.delete<Item>(environment.apiBaseUrl + '/delete/' + itemName);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(environment.apiBaseUrl + '/update-item', item);
  }
}
