import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CreateGalleryComponent } from './components/create-gallery/create-gallery.component';
import { EditGalleryComponent } from './components/edit-gallery/edit-gallery.component';
import { ListGalleryComponent } from './components/list-gallery/list-gallery.component';
import { PhotouploadComponent } from './components/photoupload/photoupload.component';
import { PhotolistComponent } from './components/photolist/photolist.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'galleries', component: ListGalleryComponent },
  { path: 'edit/:id', component: EditGalleryComponent },
  { path: 'create', component: CreateGalleryComponent },
  { path: 'photoupload', component: PhotouploadComponent },
  { path: 'photo-list', component: PhotolistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
