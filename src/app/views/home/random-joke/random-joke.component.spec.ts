import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomJokeComponent } from './random-joke.component';
import { SimpleChanges, SimpleChange } from '@angular/core';
import { Joke } from 'src/app/models';

describe('RandomJokeComponent', () => {
  let component: RandomJokeComponent;
  let fixture: ComponentFixture<RandomJokeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RandomJokeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update joke after it is updated from home component', () => {
    const joke: Joke = {
      categories: ['Aminals'],
      created_at: '',
      icon_url: 'www.test-icon.co.za',
      id: '1',
      updated_at: '',
      url: 'wwww.test.co.za/joke/1',
      value: 'What a joke'
    };

    const changes: SimpleChanges = {
      joke: new SimpleChange(null, joke, false)
    };

    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(component.joke).toEqual(joke);
  });

  it('should update loading after it is updated from home component', () => {
    const changes: SimpleChanges = {
      loading: new SimpleChange(false, true, false)
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(component.loading).toEqual(true);
  });

  it('should update error after it is updated from home component', () => {
    const error = 'Joke not found';
    const changes: SimpleChanges = {
      error: new SimpleChange(null, error, false)
    };
    component.ngOnChanges(changes);
    fixture.detectChanges();
    expect(component.error).toEqual(error);
  });
});
