import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChuckNorrisService } from 'src/app/services/chuck-norris.service';
import { of } from 'rxjs';
import { SearchResult, Joke } from 'src/app/models';

import { By } from '@angular/platform-browser';

fdescribe('SearchComponent', () => {
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search searchByKeyword function when query value changes', () => {
    component.ngAfterViewInit();
    spyOn(component, 'search').and.callThrough();
    component.query.setValue('about');
    component.query.updateValueAndValidity();
    component.searchFormGroup.updateValueAndValidity();
    fixture.detectChanges();
    expect(component.search).toHaveBeenCalledWith('about');
  });



  // it('should show pagination if categories are more than 10', () => {
  //   spyOn(component, 'pageChanged').and.callThrough();
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   const pagintation = fixture.debugElement.query(By.css('pagination-controls'));
  //   expect(pagintation).toBeDefined();
  // });

  // it('should change list if next button is clicked on the pagination', () => {
  //   spyOn(component, 'pageChanged').and.callThrough();
  //   component.ngOnInit();
  //   fixture.detectChanges();
  //   const nextButton = fixture.debugElement.query(By.css('.pagination-next'));
  //   nextButton.nativeElement.children[0].click();
  //   expect(component.pageChanged).toHaveBeenCalledWith(2);
  //   fixture.detectChanges();
  //   expect(component.page).toEqual(2);
  // });
});
