import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GalleriesService } from './galleries.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Gallery } from '../models/gallerytest';

describe('GalleriesService', () => {
  let service: GalleriesService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [GalleriesService],
    });
    service = TestBed.inject(GalleriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('be able to get all galleries from the API via GET', () => {
    const dummyGalleries: Gallery[] = [{
    _id: 'fjdks423849878u9',
    GalleryID: 'fsd545s1f1s2f',
    GalleryTitle: 'Cats',
    GalleryDescription: 'Full of Cats',
    GalleryLocation: 'home',
    GalleryDateCreated: Date.now()
    },
    {
      _id: 'fjdks423849878u9',
      GalleryID: 'fdsfsadf3421',
      GalleryTitle: 'Dogs',
      GalleryDescription: 'Full of Dogs',
      GalleryLocation: 'abroad',
      GalleryDateCreated: Date.now()
      }];

    service.getGalleries().subscribe(res => {
      expect(res).toEqual(dummyGalleries);
    });
    const request = httpMock.expectOne(`${service.uri}`);
    expect(request.request.method).toBe('GET');
    // expect(service).toBeTruthy();
  });

  it('be able to get a specific picture belonging to a gallery', () => {
    const dummyGalleries: Gallery[] = [{
    _id: 'fjdks423849878u9',
    GalleryID: 'fsd545s1f1s2f',
    GalleryTitle: 'Cats',
    GalleryDescription: 'Full of Cats',
    GalleryLocation: 'home',
    GalleryDateCreated: Date.now()
    }];

    service.getGalleryPhotos('fjdks423849878u9').subscribe(res => {
      expect(res).toEqual(dummyGalleries);
    });
    const request = httpMock.expectOne(`${service.uri}/allphotos/${'fjdks423849878u9'}`);
    expect(request.request.method).toBe('GET');
    // expect(service).toBeTruthy();
  });
  afterEach( () => {
    httpMock.verify();
  });
});
