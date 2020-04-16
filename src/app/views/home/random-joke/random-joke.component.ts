import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Joke } from '../../../models';

@Component({
  selector: 'app-random-joke',
  templateUrl: './random-joke.component.html',
  styleUrls: ['./random-joke.component.css']
})
export class RandomJokeComponent implements OnInit, OnChanges {

  @Input() joke: Joke = null;
  @Input() loading = false;
  @Input() error = null;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges) {
      const { joke, loading, error } = simpleChanges;

      if (joke && joke.currentValue) {
        this.joke = joke.currentValue;
      } else {
        this.joke = null;
      }

      if (loading && loading.currentValue) {
        this.loading = loading.currentValue;
      } else {
        this.loading = false;
      }

      if (error && error.currentValue) {
        this.error = error.currentValue;
      } else {
        this.error = null;
      }
    }
  }

}
