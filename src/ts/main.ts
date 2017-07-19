import { GrpScriptUtil } from './grp/script/grpscriptutil';
import { ViewerUtil } from './grp/viewer/viewerutil';

window.addEventListener('DOMContentLoaded', () => {

  try {
    const grpsPath = getLoadParam();

    GrpScriptUtil.load(grpsPath, (err, grpScript) => {
      try {
        if (err || !grpScript) {
          throw err;
        }
        ViewerUtil.init(grpScript);
      } catch (e) {
        console.error(e);
        ViewerUtil.outputError(e.message);
      }
    });
  } catch (e) {
    console.error(e);
    ViewerUtil.outputError(e.message);
  }

  window.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  window.addEventListener('drop', (e) => {
    e.preventDefault();
    ViewerUtil.load(e.dataTransfer.files[0]);
  });

  document.getElementById('menu-btn')!.addEventListener('click', ViewerUtil.menuSwitch);

  document.getElementById('option-close-btn')!.addEventListener('click', ViewerUtil.menuSwitch);

  document.getElementById('col-beat-inc')!.addEventListener('click', () => {
    ViewerUtil.optionColBeatInc();
  });

  document.getElementById('col-beat-dec')!.addEventListener('click', () => {
    ViewerUtil.optionColBeatDec();
  });

  document.getElementById('beat-height-inc')!.addEventListener('click', () => {
    ViewerUtil.optionBeatHeightInc();
  });

  document.getElementById('beat-height-dec')!.addEventListener('click', () => {
    ViewerUtil.optionBeatHeightDec();
  });

  document.getElementById('lane-width-inc')!.addEventListener('click', () => {
    ViewerUtil.optionLaneWidthInc();
  });

  document.getElementById('lane-width-dec')!.addEventListener('click', () => {
    ViewerUtil.optionLaneWidthDec();
  });

  document.getElementById('note-size-inc')!.addEventListener('click', () => {
    ViewerUtil.optionNoteSizeInc();
  });

  document.getElementById('note-size-dec')!.addEventListener('click', () => {
    ViewerUtil.optionNoteSizeDec();
  });

  function getLoadParam(): string {
    const loadParamMatchArray = location.search.match(/load=([^&]*)(&|$)/);
    if (loadParamMatchArray) {
      return loadParamMatchArray[1];
    } else {
      throw new Error('パラメータエラー');
    }
  }
});
