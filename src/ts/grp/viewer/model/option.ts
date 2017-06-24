export class Option {
  public measureBeat: number;
  public beatHeight: number;
  public laneWidth: number;
  public noteSize: number;
  public comprehensivePower: number;

  public constructor() {
    this.measureBeat = 24;
    this.beatHeight = 32;
    this.laneWidth = 12;
    this.noteSize = 9;
    this.comprehensivePower = 200000;
  }
}
