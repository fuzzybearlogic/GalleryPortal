import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { GalleryPhoto } from '../models/galleryphoto';
// import { Gallery } from '../models/gallery';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {

  uri = 'http://localhost:4000/galleries';
  constructor(private http: HttpClient) { }

  cGallery(formValue) {
    console.log(formValue);
    this.http.post(`${this.uri}/create`, formValue)
    .subscribe(res => console.log('Done'));
  }

  getGalleries() {
    return this.http.get(`${this.uri}`);
  }

  editGallery(id) {
    return this.http.get(`${this.uri}/edit/${id}`);
  }

  eGallery(id): Observable<any> {
    let response = this.http.get<any>(`${this.uri}/edit/${id}`);
    return response;
  }

  uGallery(formValue, id): Observable<any> {
    return this.http.put(`${this.uri}/update/${id}`, formValue);
  }

  updateGallery(GalleryTitle, GalleryDescription, GalleryLocation, id) {
    const obj = {
      GalleryTitle,
      GalleryDescription,
      GalleryLocation
    };
    this.http.post(`${this.uri}/edit/${id}`, obj).subscribe(
      res => console.log('Updated')
    );
  }

  deleteGallery(id): Observable<any> {
    const response = this.http.delete(`${this.uri}/delete/${id}`);
    return response;
  }

  //
  // Photo Upload service
  //

  // Get all photos
  getPhotos(): Observable<any> {
    return this.http.get<any>(`${this.uri}/allusers`);
  }

  // Upload photo
  addPhoto(title: string, profileImage: File, description: string, galleryid: string): Observable<any> {
    let formData: any = new FormData();
    formData.append("Galleryid", galleryid);
    formData.append("GalleryPhotoTitle", title);
    formData.append("GalleryPhotoDescription", description);
    formData.append("GalleryPhotoDateCreated", Date.now());
    formData.append("GalleryPhotoImageData", profileImage);

    return this.http.post<GalleryPhoto>(`${this.uri}/uploadphoto`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Get GalleryPhotos
  getGalleryPhotos(message): Observable<any> {
    return this.http.get<any>(`${this.uri}/allphotos/${message}`);
  }

  deletePhoto(id): Observable<any> {
    const response = this.http.delete<any>(`${this.uri}/deletephoto/${id}`);
    return response;
  }

} 


