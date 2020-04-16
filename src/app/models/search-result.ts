import { Joke } from './joke';

export interface SearchResult {
    total: number;
    result: Joke[];
}