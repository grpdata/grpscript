import { GrpScriptUtil } from '../script/grpscriptutil';
import { GrpScript, Difficulty } from '../script/model/grpscript';
import { Measure } from '../script/model/measure';
import { Note, NoteType } from '../script/model/note';
import { Viewer } from './model/viewer';
import { ViewerDom } from './model/viewerdom';
import { Option } from './model/option';

const GRP_VIEWER_STORAGE_KEY = 'grp_viewer_option';

export class ViewerUtil {

  private static option: Option;
  private static uncompleteHoldNotes: Note[];
  private static uncompleteSlideNotes: Note[];
  private static viewer: Viewer;
  private static isOptionChange: boolean;

  public static init(grpScript: GrpScript): void {

    ViewerUtil.option = ViewerUtil.loadOption();
    ViewerUtil.isOptionChange = false;

    ViewerUtil.update(grpScript);
  }

  private static update(grpScript?: GrpScript): void {

    if (grpScript) {

      ViewerUtil.viewer = new Viewer();

      ViewerUtil.viewer.title = grpScript.title;
      ViewerUtil.viewer.band = grpScript.band;
      ViewerUtil.viewer.difficulty = Difficulty[grpScript.difficulty];
      ViewerUtil.viewer.level = `${grpScript.level}`;
      ViewerUtil.viewer.bpm = ViewerUtil.getBpmStr(grpScript);
      ViewerUtil.viewer.combo = `${grpScript.notes.length}`;
      ViewerUtil.viewer.time = ViewerUtil.getTimeStr(grpScript);
      ViewerUtil.viewer.scorePotential = ViewerUtil.calcScorePotential(grpScript, ViewerUtil.option.comprehensivePower);
      ViewerUtil.viewer.grpScript = grpScript;

      ViewerDom.pageTitle = `${ViewerUtil.viewer.title} 【${ViewerUtil.viewer.difficulty}】`;
      ViewerDom.title = ViewerUtil.viewer.title;
      ViewerDom.difficulty = ViewerUtil.viewer.difficulty;
      ViewerDom.level = ViewerUtil.viewer.level;
      ViewerDom.band = ViewerUtil.viewer.band;
      ViewerDom.bpm = ViewerUtil.viewer.bpm;
      ViewerDom.combo = ViewerUtil.viewer.combo;
      ViewerDom.time = ViewerUtil.viewer.time;
      ViewerDom.scorePotential = ViewerUtil.viewer.scorePotential;
    }

    ViewerDom.scoreElement = ViewerUtil.createScoreElement(ViewerUtil.viewer.grpScript!);
  }

  public static setMessage(message: string): void {
    ViewerDom.message = message;
  }

  public static load(file: File): void {

    const reader = new FileReader();

    if (!file.size) {
      return;
    }

    if (file.size > 1024 * 1024) {
      throw new Error('ファイルサイズが大きすぎます');
    }

    reader.addEventListener('load', () => {
      try {
        const result = reader.result;
        const grpScript = GrpScriptUtil.parse(result);
        ViewerUtil.update(grpScript);
      } catch (e) {
        ViewerUtil.outputError(e.message);
      }
    });
    reader.readAsText(file);
  }

  public static menuSwitch(): void {
    const menuBtnElement = document.getElementById('menu-btn')!;
    const menuBgElement = document.getElementById('menu-bg')!;
    const menuPanelElement = document.getElementById('menu-panel')!;
    if (menuBtnElement.className !== 'on') {
      menuBtnElement.className = 'on';
      menuBgElement.className = 'on';
      menuPanelElement.className = 'on';
      ViewerUtil.isOptionChange = false;
    } else {
      menuBtnElement.className = 'off';
      menuBgElement.className = 'off';
      menuPanelElement.className = 'off';
      if (ViewerUtil.isOptionChange) {
        ViewerUtil.update();
        ViewerUtil.writeOption();
      }
    }
  }

  public static optionColBeatInc(): void {
    if (ViewerUtil.option.colBeat < 1000) {
      ViewerUtil.option.colBeat += 4;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionColBeatDec(): void {
    if (ViewerUtil.option.colBeat > 4) {
      ViewerUtil.option.colBeat -= 4;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionBeatHeightInc(): void {
    if (ViewerUtil.option.beatHeight < 1000) {
      ViewerUtil.option.beatHeight += 4;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionBeatHeightDec(): void {
    if (ViewerUtil.option.beatHeight > 4) {
      ViewerUtil.option.beatHeight -= 4;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionLaneWidthInc(): void {
    if (ViewerUtil.option.laneWidth < 100) {
      ViewerUtil.option.laneWidth += 2;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionLaneWidthDec(): void {
    if (ViewerUtil.option.laneWidth > 2) {
      ViewerUtil.option.laneWidth -= 2;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionNoteSizeInc(): void {
    if (ViewerUtil.option.noteSize < 100) {
      ViewerUtil.option.noteSize += 2;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static optionNoteSizeDec(): void {
    if (ViewerUtil.option.noteSize > 2) {
      ViewerUtil.option.noteSize -= 2;
      ViewerUtil.isOptionChange = true;
    }
  }

  public static outputError(errorMessage: string): void {
    ViewerUtil.setMessage(errorMessage);
  }

  public static resetOption(): void {
    ViewerUtil.option = new Option();
    ViewerUtil.isOptionChange = true;
  }

  private static loadOption(): Option {

    const optionStr = localStorage.getItem(GRP_VIEWER_STORAGE_KEY);
    let option: Option | null = null;

    if (optionStr) {
      const optionObj = JSON.parse(optionStr);
      option = new Option(optionObj._colBeat, optionObj._beatHeight, optionObj._laneWidth, optionObj._noteSize);
    } else {
      option = new Option();
    }

    return option;
  }

  private static writeOption(): void {

    const optionStr = JSON.stringify(ViewerUtil.option);

    localStorage.setItem(GRP_VIEWER_STORAGE_KEY, optionStr);
  }

  private static getBpmStr(grpScript: GrpScript): string {
    if (grpScript.bpm.length === 1) {
      return `${(Math.ceil(grpScript.bpm[0].value * 100) / 100)}`;
    } else {
      const bpmValueArray = grpScript.bpm.map((bpm) => {
        return bpm.value;
      });
      const minBpmValue = Math.min.call(null, bpmValueArray);
      const maxBpmValue = Math.max.call(null, bpmValueArray);
      if (maxBpmValue === minBpmValue) {
        return `${maxBpmValue}`;
      } else {
        return `${minBpmValue} ～ ${maxBpmValue}`;
      }
    }
  }

  private static getTimeStr(grpScript: GrpScript): string {
    const timeDate = new Date(grpScript.time);
    return `${timeDate.getMinutes()}:${('0' + timeDate.getSeconds()).slice(-2)}`;
  }

  private static calcScorePotential(grpScript: GrpScript, comprehensivePower: number): string {

    let score = 0;
    const difficultyCoefficient = (grpScript.level - 5) * 0.01 + 1
    const noteCount = grpScript.notes.length;
    const PERFECT_SCORE_COEFFICIENT = 1.1;
    const addFixScoreValue = comprehensivePower * 3 * difficultyCoefficient / noteCount * PERFECT_SCORE_COEFFICIENT;

    for (let i = 0, iLen = grpScript.notes.length; i < iLen; i++) {
      const note = grpScript.notes[i];
      const comboCoefficient = ViewerUtil.getComboCoefficient(i);
      const skillCoefficient = note.skillRange ? 2.0 : 1.0;
      const feverCoefficient = note.feverRange ? 2.0 : 1.0;
      score += Math.floor(addFixScoreValue * comboCoefficient) * skillCoefficient * feverCoefficient;
    }

    return `${(score / 10000).toFixed(4)}`;
  }

  private static getComboCoefficient(combo: number): number {

    const comboCoefficientData = [
      { combo: 20, coefficient: 1.00 },
      { combo: 50, coefficient: 1.01 },
      { combo: 100, coefficient: 1.02 },
      { combo: 150, coefficient: 1.03 },
      { combo: 200, coefficient: 1.04 },
      { combo: 250, coefficient: 1.05 },
      { combo: 300, coefficient: 1.06 },
      { combo: 400, coefficient: 1.07 },
      { combo: 500, coefficient: 1.08 },
      { combo: 600, coefficient: 1.09 },
      { combo: 700, coefficient: 1.10 },
      { combo: 9999, coefficient: 1.11 }
    ];

    for (const data of comboCoefficientData) {
      if (combo < data.combo) {
        return data.coefficient;
      }
    }
    throw new Error(`コンボ係数取得エラー : ${combo}`);
  }

  private static createScoreElement(grpScript: GrpScript): HTMLElement {

    ViewerUtil.uncompleteHoldNotes = [];
    ViewerUtil.uncompleteSlideNotes = [];

    const colTalbe = document.createElement('table');
    const colTr = document.createElement('tr');
    colTalbe.appendChild(colTr);

    colTalbe.className = 'measure-col';

    for (let measureIndex = 0, measureIndexLen = grpScript.measure.length; measureIndex < measureIndexLen;) {

      const colTd = document.createElement('td');
      colTr.appendChild(colTd);

      const measureTable = document.createElement('table');
      measureTable.className = 'measure-row';
      colTd.appendChild(measureTable);

      let colDrawBeat = 0;
      let measureBeat = 4;
      let measure = grpScript.measure[measureIndex];
      let firstRowMeasureFlag = true;

      do {

        const measureCount = measureIndex + 1;

        if (measureIndex < measureIndexLen) {
          measure = grpScript.measure[measureIndex];
          const measureNumer = measure.numer;
          const measureDenom = measure.denom;
          measureBeat = measureNumer / measureDenom * 4;
        }

        const measureElement = ViewerUtil.createMeasureElement(measureCount, measureBeat);

        if (measureIndex < measureIndexLen) {

          const noteAreaDiv = measureElement.getElementsByClassName('note-area')[0];
          for (let i = 0; i < ViewerUtil.uncompleteHoldNotes.length; i++) {
            const note = ViewerUtil.uncompleteHoldNotes[i];
            const endNote = grpScript.notes[note.next];
            const holdLineDiv = ViewerUtil.createHoldLine(grpScript, measure, note, false, firstRowMeasureFlag);
            noteAreaDiv.appendChild(holdLineDiv);

            if (measure.value === endNote.measureCount) {
              ViewerUtil.uncompleteHoldNotes.splice(i, 1);
              i--;
            }
          }
          for (let i = 0; i < ViewerUtil.uncompleteSlideNotes.length; i++) {
            const note = ViewerUtil.uncompleteSlideNotes[i];
            const endNote = grpScript.notes[note.next];
            const slideLineAreaDiv = ViewerUtil.createSlideLine(grpScript, measure, note, false, firstRowMeasureFlag);
            noteAreaDiv.appendChild(slideLineAreaDiv);

            if (measure.value === endNote.measureCount) {
              ViewerUtil.uncompleteSlideNotes.splice(i, 1);
              i--;
            }
          }
          ViewerUtil.addNote(measureElement, grpScript, measure);
          ViewerUtil.addBackgroundArea(measureElement, grpScript, measure);
        }

        measureTable.insertBefore(measureElement, measureTable.firstChild);

        measureIndex++;
        firstRowMeasureFlag = false;
        colDrawBeat += measureBeat;

      } while (colDrawBeat < ViewerUtil.option.colBeat);
    }

    return colTalbe;
  }

  private static createMeasureElement(measureCount: number, measureBeat: number): HTMLTableRowElement {

    const measureTr = document.createElement('tr');
    measureTr.id = `measure-${measureCount}`;

    const measureTh = document.createElement('th');
    const headerAreaDiv = document.createElement('div');
    headerAreaDiv.className = 'header-area';
    headerAreaDiv.innerHTML = `${measureCount}`;
    measureTh.appendChild(headerAreaDiv);
    measureTr.appendChild(measureTh);

    const measureTd = document.createElement('td');
    const noteAreaDiv = document.createElement('div');
    const backgroundAreaDiv = document.createElement('div');
    noteAreaDiv.className = 'note-area';
    noteAreaDiv.style.width = `${ViewerUtil.option.laneWidth * 7 - 1}px`;
    noteAreaDiv.style.height = `${measureBeat * ViewerUtil.option.beatHeight - 1}px`;
    backgroundAreaDiv.className = 'background-area';
    backgroundAreaDiv.style.width = `${ViewerUtil.option.laneWidth * 7 - 1}px`;
    backgroundAreaDiv.style.height = `${measureBeat * ViewerUtil.option.beatHeight - 1}px`;
    for (let i = 0; i < measureBeat; i++) {
      const beatSubLineDiv = document.createElement('div');
      beatSubLineDiv.className = 'beat-sub-line';
      beatSubLineDiv.style.bottom = `${(i + 0.5) * ViewerUtil.option.beatHeight - 1}px`;
      backgroundAreaDiv.appendChild(beatSubLineDiv);
    }
    for (let i = 1; i < measureBeat; i++) {
      const beatLineDiv = document.createElement('div');
      beatLineDiv.className = 'beat-line';
      beatLineDiv.style.bottom = `${i * ViewerUtil.option.beatHeight - 1}px`;
      backgroundAreaDiv.appendChild(beatLineDiv);
    }
    for (let i = 1; i < 7; i++) {
      const laneSplitLineDiv = document.createElement('div');
      laneSplitLineDiv.className = 'lane-split-line';
      laneSplitLineDiv.style.left = `${i * ViewerUtil.option.laneWidth - 1}px`;
      backgroundAreaDiv.appendChild(laneSplitLineDiv);
    }
    measureTd.appendChild(backgroundAreaDiv);
    measureTd.appendChild(noteAreaDiv);
    measureTr.appendChild(measureTd);

    return measureTr;
  }

  private static addNote(
    measureElement: HTMLTableRowElement,
    grpScript: GrpScript,
    measure: Measure
  ): HTMLTableRowElement {

    const noteAreaDiv = measureElement.getElementsByClassName('note-area')[0];

    for (let i = 0, iLen = grpScript.notes.length; i < iLen; i++) {

      const note = grpScript.notes[i];

      if (note.measureCount !== measure.value) {
        continue;
      }
      const noteDiv = document.createElement('div');

      switch (note.type) {
        case NoteType.NORMAL: noteDiv.className = 'note normal'; break;
        case NoteType.SKILL: noteDiv.className = 'note skill'; break;
        case NoteType.FLICK: noteDiv.className = 'note flick'; break;
        case NoteType.HOLD: noteDiv.className = 'note hold'; break;
        case NoteType.SKILL_HOLD: noteDiv.className = 'note skill'; break;
        case NoteType.SLIDE_A_END: noteDiv.className = 'note hold'; break;
        case NoteType.SLIDE_B_END: noteDiv.className = 'note hold'; break;
        default: break;
      }

      if (note.type === NoteType.SLIDE_A) {
        if (note.slideStart) {
          noteDiv.style.height = `${ViewerUtil.option.noteSize}px`;
          noteDiv.style.bottom = `${ViewerUtil.option.beatHeight * note.beat - ViewerUtil.option.noteSize / 2}px`;
          noteDiv.className = 'note hold';
        } else {
          noteDiv.style.bottom = `${ViewerUtil.option.beatHeight * note.beat - 2}px`;
          noteDiv.className = 'note slide';
        }
      } else if (note.type === NoteType.SLIDE_B) {
        if (note.slideStart) {
          noteDiv.style.height = `${ViewerUtil.option.noteSize}px`;
          noteDiv.style.bottom = `${ViewerUtil.option.beatHeight * note.beat - ViewerUtil.option.noteSize / 2}px`;
          noteDiv.className = 'note hold';
        } else {
          noteDiv.style.bottom = `${ViewerUtil.option.beatHeight * note.beat - 1.5}px`;
          noteDiv.className = 'note slide';
        }
      } else {
        noteDiv.style.height = `${ViewerUtil.option.noteSize}px`;
        noteDiv.style.bottom = `${ViewerUtil.option.beatHeight * note.beat - ViewerUtil.option.noteSize / 2 - 0.5}px`;
      }

      noteDiv.style.width = `${ViewerUtil.option.noteSize}px`;
      const leftDiff = ((ViewerUtil.option.laneWidth - 1) / 2) - (ViewerUtil.option.noteSize / 2);
      noteDiv.style.left = `${ViewerUtil.option.laneWidth * (note.lane - 1) + leftDiff}px`;
      noteDiv.style.zIndex = `${1000 + (iLen - i)}`;
      noteAreaDiv.appendChild(noteDiv);

      if ((note.type === NoteType.HOLD || note.type === NoteType.SKILL_HOLD) && note.next >= 0) {
        const holdLineDiv = ViewerUtil.createHoldLine(grpScript, measure, note, true, false);
        noteAreaDiv.appendChild(holdLineDiv);
      } else if (note.type === NoteType.SLIDE_A ||
        note.type === NoteType.SLIDE_B) {
        const slideLineAreaDiv = ViewerUtil.createSlideLine(grpScript, measure, note, true, false);
        noteAreaDiv.appendChild(slideLineAreaDiv);
      }

    }

    return measureElement;
  }

  private static addBackgroundArea(
    measureElement: HTMLTableRowElement,
    grpScript: GrpScript,
    measure: Measure
  ): HTMLTableRowElement {

    const backgroundAreaDiv = measureElement.getElementsByClassName('background-area')[0];

    const targetFever = [grpScript.fever.ready, grpScript.fever.start, grpScript.fever.end];
    const targetFeverClass = ['fever-ready-area', 'fever-area'];
    const measureBeat = (measure.numer / measure.denom) * 4;

    for (let i = 0; i < 2; i++) {
      const fever = targetFever[i];
      const endFever = targetFever[i + 1];

      if (fever === null || endFever === null) {
        continue;
      }

      if (fever.measureCount > measure.value) {
        continue;
      }
      if (endFever.measureCount < measure.value) {
        continue;
      }

      if (fever.measureCount === measure.value) {
        const feverBackgroundDiv = document.createElement('div');
        feverBackgroundDiv.className = targetFeverClass[i];
        feverBackgroundDiv.style.height = `${(measureBeat - fever.beat) * ViewerUtil.option.beatHeight}px`;
        feverBackgroundDiv.style.bottom = `${fever.beat * ViewerUtil.option.beatHeight - 1}px`;
        backgroundAreaDiv.appendChild(feverBackgroundDiv);
      } else if (endFever.measureCount === measure.value) {
        const feverBackgroundDiv = document.createElement('div');
        feverBackgroundDiv.className = targetFeverClass[i];
        feverBackgroundDiv.style.height = `${endFever.beat * ViewerUtil.option.beatHeight}px`;
        feverBackgroundDiv.style.bottom = `${-1}px`;
        backgroundAreaDiv.appendChild(feverBackgroundDiv);
      } else {
        const feverBackgroundDiv = document.createElement('div');
        feverBackgroundDiv.className = targetFeverClass[i];
        feverBackgroundDiv.style.height = `${measureBeat * ViewerUtil.option.beatHeight}px`;
        feverBackgroundDiv.style.bottom = `${-1}px`;
        backgroundAreaDiv.appendChild(feverBackgroundDiv);
      }
    }

    return measureElement;
  }

  private static createHoldLine(
    grpScript: GrpScript,
    measure: Measure,
    note: Note,
    addFlag: boolean,
    firstRowMeasureFlag: boolean
  ): HTMLElement {

    const holdLineDiv = document.createElement('div');
    holdLineDiv.className = 'hold-line';
    const measureBeat = (measure.numer / measure.denom) * 4;
    const endNote = grpScript.notes[note.next];

    let lineHeight: number;
    let lineBottom: number;

    if (note.measureCount === endNote.measureCount) {
      lineHeight = (endNote.beat - note.beat) * ViewerUtil.option.beatHeight;
      lineBottom = note.beat * ViewerUtil.option.beatHeight;
    } else if (measure.value === note.measureCount) {
      lineHeight = (measureBeat - note.beat) * ViewerUtil.option.beatHeight;
      lineBottom = note.beat * ViewerUtil.option.beatHeight;
      if (addFlag) {
        ViewerUtil.uncompleteHoldNotes.push(note);
      }
    } else if (measure.value === endNote.measureCount) {
      lineHeight = endNote.beat * ViewerUtil.option.beatHeight;
      lineBottom = 0;
    } else {
      lineHeight = (measureBeat) * ViewerUtil.option.beatHeight;
      lineBottom = 0;
      if (addFlag) {
        ViewerUtil.uncompleteHoldNotes.push(note);
      }
    }

    if (firstRowMeasureFlag) {
      lineHeight -= 1;
      lineBottom += 1;
    }

    holdLineDiv.style.height = `${lineHeight}px`;
    holdLineDiv.style.bottom = `${lineBottom - 1}px`;
    holdLineDiv.style.width = `${ViewerUtil.option.noteSize}px`;

    const leftDiff = ((ViewerUtil.option.laneWidth - 1) / 2) - (ViewerUtil.option.noteSize / 2);
    holdLineDiv.style.left = `${ViewerUtil.option.laneWidth * (note.lane - 1) + leftDiff}px`;

    return holdLineDiv;
  }

  private static createSlideLine(
    grpScript: GrpScript,
    measure: Measure,
    note: Note,
    addFlag: boolean,
    firstRowMeasureFlag: boolean
  ): HTMLElement {

    const slideLineDiv = document.createElement('div');
    slideLineDiv.className = 'slide-line';
    const slideLineAreaDiv = document.createElement('div');
    const measureBeat = (measure.numer / measure.denom) * 4;
    const endNote = grpScript.notes[note.next];

    let slideLineBeatCount = 0;
    let slideLineDrawedHeight = 0;
    if (note.measureCount === endNote.measureCount) {
      slideLineBeatCount = endNote.beat - note.beat;
    } else {
      if (!addFlag) {
        const measureTmp = grpScript.measure[note.measureCount - 1];
        slideLineDrawedHeight += ((measureTmp.numer / measureTmp.denom * 4) - note.beat) * ViewerUtil.option.beatHeight;
      }
      for (let i = note.measureCount, iLen = grpScript.measure.length; i < iLen; i++) {
        const measureTmp = grpScript.measure[i];
        if (measureTmp.value !== endNote.measureCount) {
          slideLineBeatCount += (measureTmp.numer / measureTmp.denom) * 4;
          if (measureTmp.value < measure.value && !addFlag) {
            slideLineDrawedHeight += (measureTmp.numer / measureTmp.denom) * 4 * ViewerUtil.option.beatHeight;
          }
        } else {
          slideLineBeatCount += (measureBeat - note.beat) + endNote.beat;
          break;
        }
      }
    }

    const slideLineAllHeight = slideLineBeatCount * ViewerUtil.option.beatHeight;
    const slideLineAllWidth = (endNote.lane - note.lane) * ViewerUtil.option.laneWidth;
    const slideLineDeg = Math.atan2(slideLineAllWidth, slideLineAllHeight) / Math.PI * 180;
    const slideLineHeight = Math.sqrt(Math.pow(slideLineAllHeight, 2) + Math.pow(slideLineAllWidth, 2));

    let slideLineAreaHeight: number;
    let slideLineAreaBottom: number;
    if (note.measureCount === endNote.measureCount) {
      slideLineAreaHeight = (endNote.beat - note.beat) * ViewerUtil.option.beatHeight;
      slideLineAreaBottom = note.beat * ViewerUtil.option.beatHeight;
    } else if (measure.value === note.measureCount) {
      slideLineAreaHeight = (measureBeat - note.beat) * ViewerUtil.option.beatHeight;
      slideLineAreaBottom = note.beat * ViewerUtil.option.beatHeight;
      if (addFlag) {
        ViewerUtil.uncompleteSlideNotes.push(note);
      }
    } else if (measure.value === endNote.measureCount) {
      slideLineAreaHeight = endNote.beat * ViewerUtil.option.beatHeight;
      slideLineAreaBottom = 0;
    } else {
      slideLineAreaHeight = (measureBeat) * ViewerUtil.option.beatHeight;
      slideLineAreaBottom = 0;
      if (addFlag) {
        ViewerUtil.uncompleteSlideNotes.push(note);
      }
    }

    if (firstRowMeasureFlag) {
      slideLineAreaHeight -= 0.5;
      slideLineAreaBottom += 0.5;
    }

    slideLineAreaDiv.className = 'slide-line-area';
    slideLineAreaDiv.style.width = `${Math.abs(slideLineAllWidth) + ViewerUtil.option.noteSize}px`;
    slideLineAreaDiv.style.height = `${slideLineAreaHeight}px`;
    slideLineAreaDiv.style.bottom = `${slideLineAreaBottom - 0.5}px`;

    const leftDiff = ((ViewerUtil.option.laneWidth - 1) / 2) - (ViewerUtil.option.noteSize / 2);
    const slideLineAreaLeft = ViewerUtil.option.laneWidth * (Math.min(note.lane, endNote.lane) - 1) + leftDiff;
    slideLineAreaDiv.style.left = `${slideLineAreaLeft}px`;

    const slideLineRatio = Math.abs(Math.sin(Math.atan2(slideLineAllHeight, slideLineAllWidth)));
    const slideLineWidth = ViewerUtil.option.noteSize * slideLineRatio;
    slideLineDiv.style.width = `${slideLineWidth}px`;
    slideLineDiv.style.height = `${slideLineHeight + ViewerUtil.option.noteSize * 2}px`;
    if (slideLineDeg > 0) {

      slideLineDiv.style.left = `${0}px`;
      slideLineDiv.style.setProperty('-ms-transform-origin', '0 100%');
      slideLineDiv.style.transformOrigin = '0 100%';
    } else {

      slideLineDiv.style.right = `${0}px`;
      slideLineDiv.style.setProperty('-ms-transform-origin', '100% 100%');
      slideLineDiv.style.transformOrigin = '100% 100%';
    }
    slideLineDiv.style.bottom = `${-slideLineDrawedHeight}px`;
    slideLineDiv.style.setProperty('-ms-transform', `rotate(${slideLineDeg}deg`);
    slideLineDiv.style.transform = `rotate(${slideLineDeg}deg`;
    slideLineAreaDiv.appendChild(slideLineDiv);

    return slideLineAreaDiv;
  }
}
