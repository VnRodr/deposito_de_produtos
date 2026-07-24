import { Routes } from '@angular/router';
import { HomePageComponent } from './main/home-page/home-page';
import { StockItens } from './components/stock-groups/stock-itens/stock-itens';

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'stockItens/:name', component: StockItens}
];

