import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Joke } from '../../../models';
import { ChuckNorrisService } from '../../../services/chuck-norris.service';

@Component({
  selector: 'app-random-joke',
  templateUrl: './random-joke.component.html',
  styleUrls: ['./random-joke.component.css']
})
export class RandomJokeComponent implements OnInit, OnChanges {

  @Input() joke: Joke = null;
  @Input() loading = false;
  @Input() error = null;

  constructor(private chuckNorrisService: ChuckNorrisService) { }

  ngOnInit() { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges) {
      const { joke, loading, error } = simpleChanges;

      if (joke && joke.currentValue) {
        this.joke = joke.currentValue;
      }

      if (loading && loading.currentValue) {
        this.loading = loading.currentValue;
      }

      if (error && error.currentValue) {
        this.error = error.currentValue;
      }
    }
  }

}
