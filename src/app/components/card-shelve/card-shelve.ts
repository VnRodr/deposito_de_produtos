import { Component } from '@angular/core';
import { Card } from "./stock-card/card";
import { TotalItems } from "./total-items/total-items";
import { TotalValue } from "./total-value/total-value";
import { StocksInAlert } from "./stocks-in-alert/stocks-in-alert";

@Component({
  selector: 'app-card-shelve',
  imports: [Card, TotalItems, TotalValue, StocksInAlert],
  templateUrl: './card-shelve.html',
  styleUrl: './card-shelve.scss'
})
export class CardShelve {

}
