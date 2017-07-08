import { Note } from './note';
import { Measure } from './measure';
import { Bpm } from './bpm';
import { Fever } from './fever';

export class GrpScript {

  public title: string;
  public band: string;
  public difficulty: Difficulty;
  public level: number;
  public bpm: Bpm[];
  public measure: Measure[];
  public notes: Note[];
  public time: number;
  public fever: {
    ready: Fever | null,
    start: Fever | null,
    end: Fever | null
  };

  constructor() {
    this.title = '';
    this.band = '';
    this.difficulty = Difficulty.EXPERT;
    this.level = 0;
    this.bpm = [];
    this.measure = [];
    this.notes = [];
    this.time = 0;
    this.fever = {
      ready: null,
      start: null,
      end: null
    };
  }
}

export enum Difficulty {
  EXPERT = 3,
  HARD = 2,
  NORMAL = 1,
  EASY = 0
}
