import apiLib from "./apiLib.js";
import useDom from "./useDom.js";

function app() {
  const state = {
    fileNames: [],
    selectedFileIndex: 0,
    selectedFileContent: "",
  };
  const domElements = {
    root: document.querySelector("#root"),
    fileSelect: document.querySelector("#file-select"),
    updateFileForm: document.querySelector("#update-file-form"),
    fileContentTextarea: document.querySelector("#file-content-textarea"),
  };
  const { getFileNames, getFileContent } = apiLib;
  const dom = useDom({ domElements, apiLib, state });

  getFileNames()
    .then((files) => {
      state.fileNames = files;
      return getFileContent(files[0]);
    })
    .then((firstFileContent) => {
      state.selectedFileContent = firstFileContent;
      dom.renderFileNames();
      dom.renderFileContent();
      return firstFileContent;
    })
    .catch((error) => {
      console.error("Error loading data: ", error);
    });
}

window.addEventListener("load", app);
