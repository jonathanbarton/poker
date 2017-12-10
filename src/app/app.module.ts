import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PlayerHandComponent } from './player-hand/player-hand.component';
import { PlayingCardComponent } from './playing-card/playing-card.component';

import { HandService } from './hand.service';
import { PlayerService } from './player.service';

@NgModule({
  declarations: [
    AppComponent,
    PlayerHandComponent,
    PlayingCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HandService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
