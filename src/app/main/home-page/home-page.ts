import { Component } from '@angular/core';
import { DashboardComponent } from "../../components/dashboard/dashboard";
import { CardShelve } from "../../components/card-shelve/card-shelve";
import { StockGroups } from "../../components/stock-groups/stock-groups";

@Component({
  selector: 'app-home-page',
  imports: [DashboardComponent, CardShelve, StockGroups],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss'
})
export class HomePageComponent {

}
