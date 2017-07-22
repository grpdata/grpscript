import { ViewerDom } from './viewerdom';
import { Skill } from './skill';

export class Option {

  private _colBeat: number;
  private _beatHeight: number;
  private _laneWidth: number;
  private _noteSize: number;
  private _comprehensivePower: number;
  private _skills: Skill[]
  private _isFeverActive: boolean;

  public constructor(
    colBeat: number = 24,
    beatHeight: number = 32,
    laneWidth: number = 12,
    noteSize: number = 9,
    skills: Skill[] = [
      new Skill(true, 2.0, 7000),
      new Skill(true, 2.0, 7000),
      new Skill(true, 2.0, 7000),
      new Skill(true, 2.0, 7000),
      new Skill(true, 2.0, 7000),
      new Skill(true, 2.0, 7000)
    ],
    isFeverActive: boolean = true
  ) {
    this.colBeat = colBeat;
    this.beatHeight = beatHeight;
    this.laneWidth = laneWidth;
    this.noteSize = noteSize;
    this.comprehensivePower = 200000;
    this.skills = skills;
    this.isFeverActive = isFeverActive;
  }

  set colBeat(colBeat: number) {
    this._colBeat = colBeat;
    ViewerDom.optionColBeat = colBeat;
  }

  get colBeat(): number {
    return this._colBeat;
  }

  set beatHeight(beatHeight: number) {
    this._beatHeight = beatHeight;
    ViewerDom.optionBeatHeight = beatHeight;
  }

  get beatHeight(): number {
    return this._beatHeight;
  }

  set laneWidth(laneWidth: number) {
    this._laneWidth = laneWidth;
    ViewerDom.optionLaneWidth = laneWidth;
  }

  get laneWidth(): number {
    return this._laneWidth;
  }

  set noteSize(noteSize: number) {
    this._noteSize = noteSize;
    ViewerDom.optionNoteSize = noteSize;
  }

  get noteSize(): number {
    return this._noteSize;
  }

  set comprehensivePower(comprehensivePower: number) {
    this._comprehensivePower = comprehensivePower;
  }

  get comprehensivePower(): number {
    return this._comprehensivePower;
  }

  set skills(skills: Skill[]) {
    this._skills = skills;
  }

  get skills(): Skill[] {
    return this._skills;
  }

  set isFeverActive(isFeverActive: boolean) {
    this._isFeverActive = isFeverActive;
  }

  get isFeverActive(): boolean {
    return this._isFeverActive;
  }
}
