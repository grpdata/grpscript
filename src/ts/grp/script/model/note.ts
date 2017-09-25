export class Note {
  constructor(
    public measureCount: number,
    public beat: number,
    public time: number,
    public lane: Lane,
    public type: NoteType,
    public next: number,
    public timeFromSkill: number,
    public skillIndex: number,
    public slideStart: boolean,
    public feverRange: boolean
  ) {
  }
}

export enum Lane {
  LANE_1 = 1,
  LANE_2 = 2,
  LANE_3 = 3,
  LANE_4 = 4,
  LANE_5 = 5,
  LANE_6 = 6,
  LANE_7 = 7
}

export enum NoteType {
  NORMAL = 1,
  SKILL = 2,
  FLICK = 3,
  HOLD = 4,
  SKILL_HOLD = 5,
  SLIDE_A = 6,
  SLIDE_A_END = 7,
  SLIDE_A_FLICK_END = 10,
  SLIDE_B = 8,
  SLIDE_B_END = 9,
  SLIDE_B_FLICK_END = 11
}
