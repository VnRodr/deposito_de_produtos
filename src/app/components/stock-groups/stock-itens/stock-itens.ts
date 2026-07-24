import { Component, OnInit, inject } from '@angular/core';
import { Item } from '../../../data/item';
import { Status } from '../../../enums/status';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../services/navigation-service';
import { ItemService } from '../../../services/item-service';

@Component({
  selector: 'app-stock-itens',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    Dialog,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: './stock-itens.html',
  styleUrl: './stock-itens.scss',
})

export class StockItens implements OnInit {
  visible: boolean = false;
  stockGroupName = '';
  item!: Item;
  status!: Status;
  searchText: string | undefined;
  itemList: Item[] = [];
  categoriesList: string[] = [];
  emptyLabel = 'Nada';
  emptyColumns = Array.from({ length: 7 }, (_, index) => index);
  editVisible = false;
  removeVisible = false;
  selectedItem: Item | '' = '';
  editDraft: any = {
    name: '',
    category: '',
    quantity: 0,
    unitValue: 0,
    lowQuantity: 0,
  };
  private navigator = inject(NavigationService);
  private route = inject(ActivatedRoute);
  private itemService = inject(ItemService);

  ngOnInit(): void {
    this.stockGroupName = this.route.snapshot.paramMap.get('name') ?? '';

    this.itemService.getAllItems().subscribe((items: Item[]) => {
      this.itemList = items;
    });
  }

  getItemTotalValue(item: Item): number {
    return item.unitValue * item.quantity;
  }

  getTotalItems(): number {
    return this.itemList.reduce((total, item) => total + Number(item.quantity || 0), 0);
  }

  getTotalValue(): number {
    return this.itemList.reduce((total, item) => total + this.getItemTotalValue(item), 0);
  }

  getLowStockTotal(): number {
    return this.itemList.filter((item) => item.quantity <= item.lowQuantity).length;
  }

  isLowStock(item: Item): boolean {
    return item.quantity <= item.lowQuantity;
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  openEdit(item: Item) {
    this.selectedItem = item;
    this.editDraft = {
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unitValue: item.unitValue,
      lowQuantity: item.lowQuantity,
    };
    this.editVisible = true;
  }

  saveEdit() {
    if (this.selectedItem === '') {
      this.editVisible = false;
      return;
    }

    this.selectedItem.name = this.editDraft.name;
    this.selectedItem.category = this.editDraft.category;
    this.selectedItem.quantity = this.editDraft.quantity;
    this.selectedItem.unitValue = this.editDraft.unitValue;
    this.selectedItem.lowQuantity = this.editDraft.lowQuantity;
    this.editVisible = false;

    this.itemService.updateItem(this.editDraft).subscribe({
      next: (item: Item) => {
        console.log('the item was modified successfully:', item);

        this.itemList.push(item);
      },
      error: (error: any) => {
        console.error('Error on trying to modify the item:', error);
      },
    });
  }

  openRemove(item: Item) {
    this.selectedItem = item;
    this.removeVisible = true;
  }

  confirmRemove(){
    this.itemService.deleteItemName(this.item.name);
  }

  cancelRemove() {
    this.removeVisible = false;
  }

  showCreateItemForm() {
    this.visible = true;
  }

  onArrowClick(): void {
    this.navigator.goBackToHome();
  }

  onConfirm() {
    const newItem = new Item(
      this.editDraft.name,
      this.editDraft.category,
      this.editDraft.quantity,
      this.editDraft.unitValue,
      this.editDraft.lowQuantity,
    );

    this.itemService.createNewItem(newItem).subscribe({
      next: (item: Item) => {
        console.log('Item created successfully:', item);

        this.itemList.push(item);
      },
      error: (error: any) => {
        console.error('Error creating item:', error);
      },
    });

    this.visible = false;
  }
}
