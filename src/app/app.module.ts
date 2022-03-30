import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { FooterComponent } from './components/footer/footer.component';

import { HistoryViewComponent } from './views/history-view/history-view.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeViewComponent,
    HistoryViewComponent,

    FooterComponent,
    SidebarComponent,
    EditModalComponent,
    DeleteModalComponent,
    SettingsViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    EditModalComponent,
    DeleteModalComponent,
  ],
})
export class AppModule { }
