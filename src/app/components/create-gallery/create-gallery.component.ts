import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { GalleriesService } from '../../services/galleries.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-gallery',
  templateUrl: './create-gallery.component.html',
  styleUrls: ['./create-gallery.component.css']
})
export class CreateGalleryComponent implements OnInit {
  angForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private gs: GalleriesService,
    private router: Router,
    ) {

   }

   createForm() {
     this.angForm = this.fb.group({
      GalleryTitle: ['', Validators.required ],
      GalleryDescription: ['', Validators.required ],
      GalleryLocation: ['', Validators.required ],
     });
   }

   submitForm() {
    const formValue = this.angForm.value;
    formValue.GalleryDateCreated = Date.now();
    this.gs.cGallery(formValue);
    this.router.navigate(['galleries']);
   }

  ngOnInit(): void {
    this.createForm();
  }

}
