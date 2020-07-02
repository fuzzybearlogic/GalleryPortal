import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleriesService } from '../../services/galleries.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-gallery',
  templateUrl: './edit-gallery.component.html',
  styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit, OnDestroy {
  angForm: FormGroup;
  gallery: any = {};
  id: string;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gs: GalleriesService,
    private fb: FormBuilder
    ) {
      this.createForm();
     }

     createForm() {
      this.angForm = this.fb.group({
       GalleryTitle: ['', Validators.required ],
       GalleryDescription: ['', Validators.required ],
       GalleryLocation: ['', Validators.required ],
      });
    }

    updateGallery(GalleryTitle, GalleryDescription, GalleryLocation, id) {
      this.subscriptions.push(this.route.params.subscribe(params => {
        this.gs.updateGallery(GalleryTitle, GalleryDescription, GalleryLocation, params.id);
      }));
    }

    getGallery(id) {
      this.subscriptions.push(this.gs.eGallery(id).subscribe(res => {
        this.gallery = res;
        this.angForm.patchValue({
          GalleryTitle: this.gallery.GalleryTitle,
          GalleryDescription: this.gallery.GalleryDescription,
          GalleryLocation: this.gallery.GalleryLocation,
        });
      }));
    }

    submitEditedForm() {
      const subform = this.angForm.value;
      subform.GalleryDateCreated = this.gallery.GalleryDateCreated;
      this.subscriptions.push(this.gs.uGallery(subform, this.id).subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      }));
      this.router.navigate(['galleries']);
    }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.id = params['id'];
      }));
    this.getGallery(this.id);
    }

  ngOnDestroy() {
      this.subscriptions.forEach(s => s.unsubscribe());
    }

  }




