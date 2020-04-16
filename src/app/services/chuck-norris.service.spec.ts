import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ChuckNorrisService } from './chuck-norris.service';
import { Joke, SearchResult } from '../models';

fdescribe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChuckNorrisService
      ]
    });
    service = TestBed.inject(ChuckNorrisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should api url to be \'https://api.chucknorris.io/jokes\'', () => {
    expect(service.apiUrl).toBeTruthy();
    expect(service.apiUrl).toBe('https://api.chucknorris.io/jokes');
  });

  it('should have a getCategories function', () => {
    expect(service.getCategories).toBeDefined();
  });

  it('should call https://api.chucknorris.io/jokes/categories', () => {
    const categories: string[] = ['Aminals', 'Fashion'];
    service.getCategories().subscribe(response => {
      expect(response).toEqual(categories);
    });
    const request = httpMock.expectOne('https://api.chucknorris.io/jokes/categories');
    expect(request.request.method).toBe('GET');
    request.flush(categories);
  });

  it('should call https://api.chucknorris.io/jokes/categories and return empty array on error', () => {
    const categories: string[] = [];
    service.getCategories().subscribe(response => {
      expect(response).toEqual(categories);
    });
    const request = httpMock.expectOne('https://api.chucknorris.io/jokes/categories');
    const mockErrorResponse = { status: 404, statusText: 'Not found' };
    expect(request.request.method).toBe('GET');
    request.flush(categories, mockErrorResponse);
  });

  it('should have a getRandomCategoryJoke function', () => {
    expect(service.getRandomCategoryJoke).toBeDefined();
  });

  it('should call https://api.chucknorris.io/jokes/random?category=Animals', () => {
    const joke: Joke = {
      categories: ['Aminals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };
    service.getRandomCategoryJoke('Animals').subscribe(response => {
      expect(response).toEqual(joke);
    });
    const request = httpMock.expectOne('https://api.chucknorris.io/jokes/random?category=Animals');
    expect(request.request.method).toBe('GET');
    request.flush(joke);
  });


  it('should have a searchByKeyword function', () => {
    expect(service.searchByKeyword).toBeDefined();
  });

  it('should call https://api.chucknorris.io/jokes/search?query=about', () => {
    const joke: Joke = {
      categories: ['Aminals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };

    const searchResult: SearchResult = {
      result: [joke, joke],
      total: 2
    };

    service.searchByKeyword('about').subscribe(response => {
      expect(response).toEqual(searchResult);
    });
    const request = httpMock.expectOne('https://api.chucknorris.io/jokes/search?query=about');
    expect(request.request.method).toBe('GET');
    request.flush(searchResult);
  });

});
