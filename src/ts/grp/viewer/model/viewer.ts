export class Viewer {

  public title: string;
  public difficulty: string;
  public level: string;
  public band: string;
  public bpm: string;
  public combo: string;
  public time: string;
  public scorePotential: string;
  public scoreElement: HTMLElement | null;

  constructor() {
    this.title = 'No Title';
    this.difficulty = 'EXPERT';
    this.level = '0';
    this.band = 'No Band';
    this.bpm = '120';
    this.combo = '0';
    this.time = '0:00';
    this.scorePotential = '0.00';
    this.scoreElement = null;
  }
}
