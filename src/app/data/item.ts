export class Item {
  name!: string;
  category!: string;
  quantity!: number;
  unitValue!: number;
  lowQuantity!: number;

  constructor(
    name: string,
    category: string,
    quantity: number,
    unitValue: number,
    lowQuantity: number,
  ) {
    this.category = category;
    this.name = name;
    this.quantity = quantity;
    this.unitValue = unitValue;
    this.lowQuantity = lowQuantity;
  }
}
