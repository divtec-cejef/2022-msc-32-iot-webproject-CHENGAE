import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeViewComponent} from "./views/home-view/home-view.component";
import {HistoryViewComponent} from "./views/history-view/history-view.component";
import {SettingsViewComponent} from "./views/settings-view/settings-view.component";

const routes: Routes = [
  {path: '', component: HomeViewComponent, pathMatch: 'full'},
  {path: 'history', component: HistoryViewComponent, pathMatch: 'full'},
  {path: 'settings', component: SettingsViewComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
