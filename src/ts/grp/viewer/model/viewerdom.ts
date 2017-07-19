export class ViewerDom {

  private constructor() {
  }

  public static get pageTitle(): string {
    return document.title;
  }

  public static set pageTitle(pageTitle: string) {
    document.title = pageTitle;
  }

  public static get title(): string {
    return document.getElementById('title')!.innerHTML;
  }

  public static set title(title: string) {
    document.getElementById('title')!.innerHTML = title;
  }

  public static get difficulty(): string {
    return document.getElementById('difficulty')!.innerHTML;
  }

  public static set difficulty(difficulty: string) {
    document.getElementById('difficulty')!.innerHTML = difficulty;
    document.body.className = difficulty.toLowerCase();
  }

  public static get level(): string {
    return document.getElementById('level')!.innerHTML;
  }

  public static set level(level: string) {
    document.getElementById('level')!.innerHTML = level;
  }

  public static get band(): string {
    return document.getElementById('band')!.innerHTML;
  }

  public static set band(band: string) {
    document.getElementById('band')!.innerHTML = band;
  }

  public static get bpm(): string {
    return document.getElementById('bpm')!.innerHTML;
  }

  public static set bpm(bpm: string) {
    document.getElementById('bpm')!.innerHTML = bpm;
  }

  public static get combo(): string {
    return document.getElementById('combo')!.innerHTML;
  }

  public static set combo(combo: string) {
    document.getElementById('combo')!.innerHTML = combo;
  }

  public static get time(): string {
    return document.getElementById('time')!.innerHTML;
  }

  public static set time(time: string) {
    document.getElementById('time')!.innerHTML = time;
  }

  public static get scorePotential(): string {
    return document.getElementById('score-potential')!.innerHTML;
  }

  public static set scorePotential(scorePotential: string) {
    document.getElementById('score-potential')!.innerHTML = scorePotential;
  }

  public static get scoreElement(): HTMLElement | null {
    return document.getElementById('score-html');
  }

  public static set scoreElement(scoreElement: HTMLElement | null) {
    const scoreHtmlElement = document.getElementById('score-html')!;
    if (scoreElement instanceof HTMLElement) {
      scoreHtmlElement.innerHTML = '';
      scoreHtmlElement.appendChild(scoreElement);
      document.getElementById('contents')!.className = 'fadein';
    }
  }

  public static get optionColBeat(): number {
    return parseInt((<HTMLInputElement>document.getElementById('col-beat-value')!).value);
  }

  public static set optionColBeat(colBeat: number) {
    (<HTMLInputElement>document.getElementById('col-beat-value')!).value = `${colBeat}`;
  }

  public static get optionBeatHeight(): number {
    return parseInt((<HTMLInputElement>document.getElementById('beat-height-value')!).value);
  }

  public static set optionBeatHeight(beatHeight: number) {
    (<HTMLInputElement>document.getElementById('beat-height-value')!).value = `${beatHeight}`;
  }

  public static get optionLaneWidth(): number {
    return parseInt((<HTMLInputElement>document.getElementById('lane-width-value')!).value);
  }

  public static set optionLaneWidth(laneWidth: number) {
    (<HTMLInputElement>document.getElementById('lane-width-value')!).value = `${laneWidth}`;
  }

  public static get optionNoteSize(): number {
    return parseInt((<HTMLInputElement>document.getElementById('note-size-value')!).value);
  }

  public static set optionNoteSize(noteSize: number) {
    (<HTMLInputElement>document.getElementById('note-size-value')!).value = `${noteSize}`;
  }

  public static get message(): string {
    return document.getElementById('message')!.innerHTML;
  }

  public static set message(message: string) {
    const messageElement = document.getElementById('message')!;
    messageElement.innerHTML = message;
    messageElement.style.display = (message !== '') ? 'block' : 'none';
  }
}
