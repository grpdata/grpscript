import { GrpScriptUtil } from './grp/script/grpscriptutil';
import { ViewerUtil } from './grp/viewer/viewerutil';

window.addEventListener('DOMContentLoaded', () => {

  try {
    const grpsPath = getLoadParam();

    registEvent();

    GrpScriptUtil.load(grpsPath, (err, grpScript) => {

      try {

        if (err || !grpScript) {
          throw err;
        }

        const viewer = ViewerUtil.create(grpScript);

        ViewerUtil.update(viewer);

      } catch (e) {
        console.error(e);
        outputError(e.message);
      }
    });

  } catch (e) {
    console.error(e);
    outputError(e.message);
  }

  function getLoadParam(): string {
    const loadParamMatchArray = location.search.match(/load=([^&]*)(&|$)/);
    if (loadParamMatchArray) {
      return loadParamMatchArray[1];
    } else {
      throw new Error('パラメータエラー');
    }
  }

  function registEvent(): void {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    window.addEventListener('drop', (e) => {

      if (!e.dataTransfer) {
        return;
      }

      const file = e.dataTransfer.files[0];
      const reader = new FileReader();

      e.preventDefault();

      if (file.size > 1024 * 1024) {
        throw new Error('ファイルサイズが大きすぎます');
      }

      reader.addEventListener('load', () => {
        try {
          const result = reader.result;
          const grpScript = GrpScriptUtil.parse(result);
          const viewer = ViewerUtil.create(grpScript);
          ViewerUtil.update(viewer);
        } catch (e) {
          outputError(e.message);
        }
      });
      reader.readAsText(file);
    });
  }

  function outputError(errorMessage: string): void {
    ViewerUtil.setMessage(errorMessage);
  }
});
