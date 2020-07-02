import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleriesService } from '../../services/galleries.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasharingService } from '../../services/datasharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photolist',
  templateUrl: './photolist.component.html',
  styleUrls: ['./photolist.component.css']
})
export class PhotolistComponent implements OnInit, OnDestroy {

  message: string;
  Photos: any = [];
  term: string;
  subscriptions: Subscription[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public gs: GalleriesService,
    public data: DatasharingService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.data.currentMessage.subscribe(message => this.message = message));
    this.getGalleryPhotos(this.message);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  deleteUser(id): void {
    this.subscriptions.push(this.gs.deletePhoto(id)
      .subscribe(
        response => {
          console.log(response);
          this.gs.getGalleryPhotos(this.message).subscribe(res => {
            this.Photos = res;
          });
        },
        error => {
          console.log(error);
        }));
  }

  getGalleryPhotos(message) {
    this.subscriptions.push(this.gs.getGalleryPhotos(message).subscribe(res => {
      this.Photos = res;
    }));
  }
}
