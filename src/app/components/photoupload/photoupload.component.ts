import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GalleriesService } from '../../services/galleries.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DatasharingService } from '../../services/datasharing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.css']
})
export class PhotouploadComponent implements OnInit, OnDestroy{
  preview: string;
  form: FormGroup;
  users = [];
  id = '';
  message: string;
  subscriptions: Subscription[] = [];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public gs: GalleriesService,
    public data: DatasharingService,
  ) {
    // Reactive Form
    this.form = this.fb.group({
      Title: ['', Validators.required ],
      Description: ['', Validators.required ],
      Location: ['', Validators.required ],
      ImageData: [null],
      // avatar: [null],
    });
  }

  ngOnInit() {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.id = params['id'];
      }));
    this.subscriptions.push(this.data.currentMessage.subscribe(message => this.message = message));
   }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      ImageData: file
    });
    this.form.get('ImageData').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  submitForm() {
    this.subscriptions.push(this.gs.addPhoto(
      this.form.value.Title,
      this.form.value.ImageData,
      this.form.value.Description,
      this.message,
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.router.navigate(['photo-list']);
      }
    }));
  }

}