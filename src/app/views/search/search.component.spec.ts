import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChuckNorrisService } from 'src/app/services/chuck-norris.service';
import { of } from 'rxjs';
import { SearchResult, Joke } from 'src/app/models';

import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let chuckNorrisService: ChuckNorrisService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
      ]
    })
      .compileComponents();
    chuckNorrisService = TestBed.inject(ChuckNorrisService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;

    const result: SearchResult = {
      total: 0,
      result: []
    };
    const joke: Joke = {
      categories: ['Animals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };
    for (let i = 0; i < 15; i++) {
      result.result.push({
        ...joke,
        id: (i + 1).toString()
      });
    }

    spyOn(chuckNorrisService, 'searchByKeyword').and.returnValue(of(result));
    component.ngOnInit();
    component.ngAfterViewInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search searchByKeyword function when query value changes', fakeAsync(() => {
    spyOn(component, 'search').and.callThrough();
    const input = fixture.debugElement.query(By.css('.form-control')).nativeElement;
    input.value = 'about';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(200);
    expect(component.query.value).toEqual('about');
    expect(component.search).toHaveBeenCalled();
  }));

  it('should show pagination if categories are more than 10', fakeAsync(() => {
    const joke: Joke = {
      categories: ['Animals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };
    const jokes: Joke[] = [];
    for (let i = 0; i < 15; i++) {
      jokes.push({
        ...joke,
        id: (i + 1).toString()
      });
    }
    component.jokes$.next(jokes);
    fixture.detectChanges();
    const pagintation = fixture.debugElement.query(By.css('pagination-controls'));
    expect(pagintation != null).toBeTrue();
  }));

  it('should change list if next button is clicked on the pagination', () => {
    spyOn(component, 'pageChanged').and.callThrough();
    const joke: Joke = {
      categories: ['Animals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };
    const jokes: Joke[] = [];
    for (let i = 0; i < 20; i++) {
      jokes.push({
        ...joke,
        id: (i + 1).toString()
      });
    }
    component.jokes$.next(jokes);
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('.pagination-next'));
    nextButton.nativeElement.children[0].click();
    expect(component.pageChanged).toHaveBeenCalledWith(2);
    fixture.detectChanges();
    expect(component.page).toEqual(2);
  });


  it('should search when search button is clicked and value length is more than 3 characters', () => {
    spyOn(component, 'search').and.callThrough();
    spyOn(component, 'searchHandler').and.callThrough();
    const searchButton = fixture.debugElement.query(By.css('.btn.btn-outline-secondary')).nativeElement;
    component.query.setValue('about');
    component.query.updateValueAndValidity();
    fixture.detectChanges();
    searchButton.click();
    fixture.detectChanges();
    expect(component.searchHandler).toHaveBeenCalled();
    expect(component.search).toHaveBeenCalledTimes(1);
  });

  it('should not search when search button is clicked and value length is less than 3 characters', () => {
    spyOn(component, 'search').and.callThrough();
    spyOn(component, 'searchHandler').and.callThrough();
    const searchButton = fixture.debugElement.query(By.css('.btn.btn-outline-secondary')).nativeElement;
    component.query.setValue('');
    component.query.updateValueAndValidity();
    fixture.detectChanges();
    searchButton.click();
    fixture.detectChanges();
    expect(component.searchHandler).toHaveBeenCalled();
    expect(component.search).toHaveBeenCalledTimes(0);
  });
});
