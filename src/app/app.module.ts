import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JSONDate } from './pipes/jsondate.pipe';

import { GalleriesService } from './services/galleries.service';
import { DatasharingService } from './services/datasharing.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';
import { EditGalleryComponent } from './components/edit-gallery/edit-gallery.component';
import { ListGalleryComponent } from './components/list-gallery/list-gallery.component';
import { PhotouploadComponent } from './components/photoupload/photoupload.component';
import { PhotolistComponent } from './components/photolist/photolist.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateGalleryComponent,
    EditGalleryComponent,
    ListGalleryComponent,
    PhotouploadComponent,
    PhotolistComponent,
    JSONDate,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
  ],
  providers: [GalleriesService, DatasharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
