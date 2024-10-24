import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: AppComponent },  // Set AppComponent as the default route
  { path: 'chat', component: ChatComponent }  // ChatComponent for chat view
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
