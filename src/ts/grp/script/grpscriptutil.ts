import { GrpScript, Difficulty } from './model/grpscript';
import { Note, NoteType, Lane } from './model/note';
import { Measure } from './model/measure';
import { Bpm } from './model/bpm';
import { Fever } from './model/fever';

export class GrpScriptUtil {

  public static parse(grpScriptStr: string): GrpScript {

    const grpScript = new GrpScript();

    const grpScriptArray = this.normalize(grpScriptStr);

    const SKILL_ACTIVATION_TIME = 7000;

    let beat = 0;
    let measureLineCount = 0;
    const measureNumer = 4;
    const measureDenom = 4;
    let measureCount = 1;
    let slideAFlag = false;
    let slideBFlag = false;
    let time = 0;
    let lastMeasureTime = 0;
    let bpm = 120;
    const skillTime: number[] = [];

    for (let i = 0, iLen = grpScriptArray.length; i < iLen; i++) {

      const line = grpScriptArray[i];

      if (line.charAt(0) === '#') {
        this.parseOrder(grpScript, line, measureCount, beat, time);
        if (grpScript.bpm.length > 0) {
          bpm = grpScript.bpm[grpScript.bpm.length - 1].value;
        }
      } else {
        if (beat === 0) {
          measureLineCount = this.getMeasureLineCount(grpScriptArray, i);
        }
        if (line.charAt(0) === ',') {
          if (measureLineCount === 0) {
            time += 60 / bpm * (measureNumer / measureDenom) * 4 * 1000;
          }
          const measure = new Measure(measureNumer, measureDenom, measureCount, lastMeasureTime);
          grpScript.measure.push(measure);
          beat = 0;
          measureCount++;
          lastMeasureTime = time;
          continue;
        }
        for (let lane = Lane.LANE_1; lane <= Lane.LANE_7; lane++) {
          const noteType = parseInt(line.charAt(lane - Lane.LANE_1));

          if (!isNaN(noteType)) {

            let slideStart = false;

            if ((noteType === NoteType.SLIDE_A)) {
              if (!slideAFlag) {
                slideStart = true;
                slideAFlag = true;
              } else {
                // 同拍にスライドA終了がある場合はスライド開始フラグON
                for (let laneTmp = lane + 1; laneTmp <= Lane.LANE_7; laneTmp++) {
                  const noteTypeTmp = parseInt(line.charAt(laneTmp - Lane.LANE_1));
                  if (noteTypeTmp === NoteType.SLIDE_A_END) {
                    slideStart = true;
                    break;
                  }
                }
              }
            } else if ((noteType === NoteType.SLIDE_B)) {
              if (!slideBFlag) {
                slideStart = true;
                slideBFlag = true;
              } else {
                // 同拍にスライドB終了がある場合はスライド開始フラグON
                for (let laneTmp = lane + 1; laneTmp <= Lane.LANE_7; laneTmp++) {
                  const noteTypeTmp = parseInt(line.charAt(laneTmp - Lane.LANE_1));
                  if (noteTypeTmp === NoteType.SLIDE_B_END) {
                    slideStart = true;
                    break;
                  }
                }
              }
            }

            if (noteType === NoteType.SKILL || noteType === NoteType.SKILL_HOLD) {
              skillTime.push(time);
            }

            const note = new Note(measureCount, beat, time, lane, noteType, 0, slideStart, false, false);
            grpScript.notes.push(note);

            if ((noteType === NoteType.SLIDE_A_END)) {
              slideAFlag = false;

              // 同拍にスライドA開始がある場合はスライドAフラグON
              for (let laneTmp = lane - 1; laneTmp >= Lane.LANE_1; laneTmp--) {
                const noteTypeTmp = parseInt(line.charAt(laneTmp - Lane.LANE_1));
                if (noteTypeTmp === NoteType.SLIDE_A) {
                  slideAFlag = true;
                  break;
                }
              }
            } else if (noteType === NoteType.SLIDE_B_END) {
              slideBFlag = false;

              // 同拍にスライドB開始がある場合はスライドBフラグON
              for (let laneTmp = lane - 1; laneTmp >= Lane.LANE_1; laneTmp--) {
                const noteTypeTmp = parseInt(line.charAt(laneTmp - Lane.LANE_1));
                if (noteTypeTmp === NoteType.SLIDE_B) {
                  slideBFlag = true;
                  break;
                }
              }
            }
          }
        }
        time += 60 / bpm * (measureNumer / measureDenom) * 4 * 1000 / measureLineCount;
        beat += (measureNumer / measureDenom) * 4 / measureLineCount;
      }
    }

    // ノートを時間順にソート
    grpScript.notes.sort((noteA, noteB) => {
      return noteA.time - noteB.time;
    });

    for (let i = 0, iLen = grpScript.notes.length; i < iLen; i++) {

      const note = grpScript.notes[i];

      // ホールドの終端情報付与
      if ((note.type === NoteType.HOLD || note.type === NoteType.SKILL_HOLD) && note.next !== -1) {
        for (let j = i + 1; j < iLen; j++) {
          const noteTmp = grpScript.notes[j];
          if (note.lane === noteTmp.lane) {
            note.next = j;
            noteTmp.next = -1;
            break;
          }
        }
      }

      // 次のスライドAの位置付与
      if (note.type === NoteType.SLIDE_A) {
        for (let j = i + 1; j < iLen; j++) {
          const noteTmp = grpScript.notes[j];
          if (noteTmp.type === NoteType.SLIDE_A_END) {
            note.next = j;
            break;
          }
          if (noteTmp.type === NoteType.SLIDE_A) {
            note.next = j;
            for (let k = j + 1; k < iLen; k++) {
              const noteTmp2 = grpScript.notes[k];
              if (noteTmp.time < noteTmp2.time) {
                break;
              }
              if (noteTmp2.type === NoteType.SLIDE_A_END) {
                note.next = k;
                break;
              }
            }
            break;
          }
        }
      }

      // 次のスライドBの位置付与
      if (note.type === NoteType.SLIDE_B) {
        for (let j = i + 1; j < iLen; j++) {
          const noteTmp = grpScript.notes[j];
          if (noteTmp.type === NoteType.SLIDE_B_END) {
            note.next = j;
            break;
          }
          if (noteTmp.type === NoteType.SLIDE_B) {
            note.next = j;
            for (let k = j + 1; k < iLen; k++) {
              const noteTmp2 = grpScript.notes[k];
              if (noteTmp.time < noteTmp2.time) {
                break;
              }
              if (noteTmp2.type === NoteType.SLIDE_B_END) {
                note.next = k;
                break;
              }
            }
            break;
          }
        }
      }
    }

    if (grpScript.fever.start !== null && grpScript.fever.end !== null) {
      const feverStart = grpScript.fever.start;
      const feverEnd = grpScript.fever.end;
      grpScript.notes
        .filter((note) => (note.time >= feverStart.time && note.time < feverEnd.time))
        .forEach((note) => note.feverRange = true);
    }

    grpScript.notes
      .filter((note) => {
        for (const sTime of skillTime) {
          if (note.time >= sTime && note.time < sTime + SKILL_ACTIVATION_TIME) {
            return true;
          }
        }
        return false;
      })
      .forEach((note) => note.skillRange = true);

    grpScript.time = grpScript.notes[grpScript.notes.length - 1].time;

    return grpScript;
  }

  public static load(url: string, callback: (err: Error | null, grpScript: GrpScript | null) => void): void {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const grpScript = this.parse(xhr.responseText);
            callback(null, grpScript);
          } catch (e) {
            callback(e, null);
          }
        } else {
          callback(new Error(`譜面の読み込みに失敗しました : ${url}`), null);
        }
      });
      xhr.send();
    } catch (e) {
      callback(new Error(`譜面の読み込みに失敗しました : ${url}`), null);
    }
  }

  private static normalize(grpScriptStr: string): string[] {

    const grpScriptArray = grpScriptStr.split(/\r\n|\r|\n/);

    for (let i = 0, iLen = grpScriptArray.length; i < iLen; i++) {

      let line = grpScriptArray[i];

      const commentIndex = line.indexOf('//');
      if (commentIndex !== -1) {
        line = line.substr(0, commentIndex);
      }
      if (line.length === 0) {
        grpScriptArray.splice(i, 1);
        i--;
        iLen--;
        continue;
      }
      grpScriptArray[i] = line;
    }

    return grpScriptArray;
  }

  private static parseOrder(
    grpScript: GrpScript,
    line: string,
    measureCount: number,
    beat: number,
    time: number
  ): void {

    const splitIndex = line.indexOf(':');
    let order: string;
    let value: string;
    if (splitIndex === -1) {
      order = line.trim();
      value = '';
    } else {
      order = line.substr(0, splitIndex);
      value = line.substr(splitIndex + 1);
    }

    switch (order.toUpperCase()) {
      case '#TITLE':
        grpScript.title = value;
        break;
      case '#BAND':
        grpScript.band = value;
        break;
      case '#LEVEL':
        grpScript.level = parseInt(value);
        break;
      case '#DIFFICULTY':
        const upperValue = value.toUpperCase();
        if (upperValue === 'EXPERT' || upperValue === 'HARD' || upperValue === 'NORMAL' || upperValue === 'EASY') {
          grpScript.difficulty = Difficulty[upperValue];
        }
        break;
      case '#BPM':
        const bpm = new Bpm(measureCount, beat, parseFloat(value));
        grpScript.bpm.push(bpm);
        break;
      case '#FEVERREADY':
        grpScript.fever.ready = new Fever(measureCount, beat, time);
        break;
      case '#FEVERSTART':
        grpScript.fever.start = new Fever(measureCount, beat, time);
        break;
      case '#FEVEREND':
        grpScript.fever.end = new Fever(measureCount, beat, time);
        break;
      case '#MEASURE':
        // 未実装
        break;
      default:
        console.warn(`未対応の命令 : ${order}`);
        break;
    }
  }

  private static getMeasureLineCount(grpScriptArray: string[], index: number): number {

    let lineCount = 0;
    for (let i = index, iLen = grpScriptArray.length; i < iLen; i++) {
      const line = grpScriptArray[i];
      if (line.charAt(0) === '#') {
        continue;
      }
      if (line.charAt(0) === ',') {
        break;
      }
      lineCount++;
    }

    return lineCount;
  }
}
