import { Component, OnInit, OnDestroy } from '@angular/core';
import Gallery from '../../models/gallery';
import { GalleriesService } from '../../services/galleries.service';
import { Router } from '@angular/router';
import { DatasharingService } from 'src/app/services/datasharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-gallery',
  templateUrl: './list-gallery.component.html',
  styleUrls: ['./list-gallery.component.css']
})
export class ListGalleryComponent implements OnInit, OnDestroy {
  id: string;
  galleries: Gallery[];
  message: string;
  term: string;
  subscriptions: Subscription[] = []

  constructor(
    private gs: GalleriesService,
    private router: Router,
    private data: DatasharingService
    ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.gs.getGalleries().subscribe((data: Gallery[]) => {
      this.galleries = data;
    }));
    this.subscriptions.push(this.data.currentMessage.subscribe(message => this.message = message));
    }

  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
    }

    deleteGallery(id) {
      this.subscriptions.push(this.gs.deleteGallery(id).subscribe(
        res => {
          console.log(res);
          this.gs.getGalleries().subscribe((data: Gallery[]) => {
            this.galleries = data;
          });
        }, error => {
          console.log(error);
        }));
    }

    naviUpload(id) {
      this.data.changeMessage(id);
      this.router.navigate(['photoupload']);
    }

    naviGallery(id) {
      this.data.changeMessage(id);
      this.router.navigate(['photo-list']);
    }

}
