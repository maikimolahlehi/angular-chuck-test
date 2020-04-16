import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import { ChuckNorrisService } from '../../services/chuck-norris.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Joke } from '../../models';
import { scrollTop } from '../../shared/util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  searchFormGroup: FormGroup;
  totalPages = 0;
  loading = false;
  jokes$: Subject<Joke[]> = new BehaviorSubject<Joke[]>([]);
  page = 1;

  isSubmitted = false;

  constructor(
    private chuckNorrisService: ChuckNorrisService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      query: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(120)
      ])
    });
  }

  ngAfterViewInit() {
    this.query.valueChanges
      .pipe(
        tap(() => {
          this.isSubmitted = false;
        }),
        debounceTime(200),
        filter(query => query && query.length >= 3)
      )
      .subscribe(query => {
        this.search(query);
      });
  }

  get query() {
    return this.searchFormGroup.controls.query;
  }

  pageChanged(page) {
    this.page = page;
    scrollTop();
  }

  searchHandler() {
    this.isSubmitted = true;
    if (!this.searchFormGroup.valid) {
      return;
    }

    this.search(this.query.value);
  }

  search(query) {
    this.loading = true;
    this.jokes$.next([]);
    return this.chuckNorrisService
      .searchByKeyword(query)
      .pipe(
        map(result => {
          return result.result;
        })
      )
      .subscribe(result => {
        this.loading = false;
        this.jokes$.next(result);
      });
  }
}
