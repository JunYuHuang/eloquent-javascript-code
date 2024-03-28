export default function useDom(dependencies) {
  const { domElements, apiLib, state } = dependencies;
  const { fileSelect, updateFileForm, fileContentTextarea } = domElements;
  const { getFileNames, getFileContent, updateFileContent } = apiLib;

  const renderFileNames = function () {
    const fileElements = [];
    for (let i = 0; i < state.fileNames.length; i++) {
      const fileElement = document.createElement("option");
      fileElement.value = i;
      fileElement.textContent = state.fileNames[i];
      if (i === state.selectedFileIndex)
        fileElement.setAttribute("checked", "");
      fileElements.push(fileElement);
    }
    fileSelect.replaceChildren(...fileElements);
  };

  const renderFileContent = function (content = state.selectedFileContent) {
    fileContentTextarea.value = content;
  };

  const handleFileContentTextareaKeyup = function (event) {
    state.selectedFileContent = event.target.value;
  };

  const handleUpdateFormSubmit = function (event) {
    event.preventDefault();
    const fileName = state.fileNames[state.selectedFileIndex];
    const newContent = state.selectedFileContent;
    updateFileContent(fileName, newContent)
      .then(() => {
        return getFileContent(fileName);
      })
      .then((updatedFileContent) => {
        state.selectedFileContent = updatedFileContent;
        renderFileContent();
      })
      .catch((error) => {
        console.error("Failed to update file content: ", error);
      });
  };

  const handleFileSelectChange = function (event) {
    const newFileIndex = Number(event.target.value);
    state.selectedFileIndex = newFileIndex;
    const fileName = state.fileNames[newFileIndex];
    getFileContent(fileName)
      .then((fileContent) => {
        state.selectedFileContent = fileContent;
        renderFileContent();
        return fileContent;
      })
      .catch((error) => {
        console.error("Failed to get file content: ", error);
      });
  };

  // Set event listeners
  fileContentTextarea.addEventListener("keyup", handleFileContentTextareaKeyup);
  updateFileForm.addEventListener("submit", handleUpdateFormSubmit);
  fileSelect.addEventListener("change", handleFileSelectChange);

  return {
    renderFileNames,
    renderFileContent,
  };
}
