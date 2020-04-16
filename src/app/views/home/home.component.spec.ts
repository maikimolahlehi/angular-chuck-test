import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChuckNorrisService } from 'src/app/services/chuck-norris.service';
import { of, throwError } from 'rxjs';
import { Joke } from 'src/app/models';
import { NgxPaginationModule } from 'ngx-pagination';
import { By } from '@angular/platform-browser';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { RandomJokeComponent } from './random-joke/random-joke.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let chuckNorrisService: ChuckNorrisService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LoadingComponent, RandomJokeComponent],
      imports: [
        HttpClientTestingModule,
        NgxPaginationModule
      ]
    })
      .compileComponents();

    chuckNorrisService = TestBed.inject(ChuckNorrisService);
  }));

  beforeEach(() => {
    const categories: string[] = ['Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion'];
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(chuckNorrisService, 'getCategories').and.returnValue(of(categories));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have categories$', () => {
    expect(component.categories$).toBeTruthy();
  });

  it('should get categories', async(() => {
    component.ngOnInit();
    const categories: string[] = ['Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion', 'Animals', 'Fashion'];
    component.categories$.subscribe(response => {
      expect(response).toEqual(categories);
    });
    fixture.detectChanges();
    const categoriesList = fixture.debugElement.queryAll(By.css('.list-group-item'));
    expect(chuckNorrisService.getCategories).toHaveBeenCalled();
    expect(chuckNorrisService.getCategories).toHaveBeenCalledTimes(1);
    expect(categoriesList.length).toEqual(8);
  }));

  it('should call randomJoke function category click', async(() => {
    component.ngOnInit();
    fixture.detectChanges();
    spyOn(component, 'randomJoke').and.callThrough();
    const categoriesList = fixture.debugElement.queryAll(By.css('.list-group-item'));
    categoriesList[0].nativeElement.click();
    expect(component.randomJoke).toHaveBeenCalled();
  }));

  it('should get randomJoke category click', async(() => {
    const joke: Joke = {
      categories: ['Aminals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };

    spyOn(chuckNorrisService, 'getRandomCategoryJoke').and.returnValue(of(joke));

    component.ngOnInit();
    fixture.detectChanges();

    const categoriesList = fixture.debugElement.queryAll(By.css('.list-group-item'));
    categoriesList[0].nativeElement.click();
    expect(chuckNorrisService.getRandomCategoryJoke).toHaveBeenCalledWith('Animals');
    expect(component.joke).toEqual(joke);
  }));


  it('should get randomJoke category click and hide loading if service returned an error', async(() => {


    spyOn(chuckNorrisService, 'getRandomCategoryJoke').and.returnValue(throwError({
      status: 404,
      message: 'Joke not found'
    }));

    component.ngOnInit();
    fixture.detectChanges();

    const categoriesList = fixture.debugElement.queryAll(By.css('.list-group-item'));
    categoriesList[0].nativeElement.click();
    expect(chuckNorrisService.getRandomCategoryJoke).toHaveBeenCalledWith('Animals');
    expect(component.loadingJoke).toEqual(false);
  }));

  it('should show pagination if categories are more than 8', () => {
    spyOn(component, 'pageChanged').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const pagintation = fixture.debugElement.query(By.css('pagination-controls'));
    expect(pagintation).toBeDefined();
  });

  it('should change list if next button is clicked on the pagination', () => {
    spyOn(component, 'pageChanged').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    const nextButton = fixture.debugElement.query(By.css('.pagination-next'));
    nextButton.nativeElement.children[0].click();
    expect(component.pageChanged).toHaveBeenCalledWith(2);
    fixture.detectChanges();
    expect(component.page).toEqual(2);
  });

});
