import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { routes } from './app.routes';

import {HttpClientModule} from '@angular/common/http';

import {MatCardModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';

import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { ItemService } from './services/item.service';
import { ShareService } from './services/share.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigatorComponent } from './components/navigator/navigator.component';
import { ExpandableGalleryComponent } from './components/gallery/expandable-gallery/expandable-gallery.component';
import { ExpandableGalleryRowComponent } from './components/gallery/expandable-gallery/expandable-gallery-row/expandable-gallery-row.component';
import { ExpandableGalleryItemComponent } from './components/gallery/expandable-gallery/expandable-gallery-row/expandable-gallery-item/expandable-gallery-item.component';
import { ExpandableGalleryExpandPanelComponent } from './components/gallery/expandable-gallery/expandable-gallery-row/expandable-gallery-expand-panel/expandable-gallery-expand-panel.component';
import { SliderComponent } from './components/slider/slider.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { GalleryComponent } from './components/gallery/gallery.component';

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = <any>{
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigatorComponent,
    ExpandableGalleryComponent,
    ExpandableGalleryRowComponent,
    ExpandableGalleryItemComponent,
    ExpandableGalleryExpandPanelComponent,
    SliderComponent,
    HomeComponent,
    ContactComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routes,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    },
    HttpService,
    UserService,
    ItemService,
    ShareService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
