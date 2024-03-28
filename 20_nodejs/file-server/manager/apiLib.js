const BASE_URL = "http://localhost:8000/content";

async function getFileNames() {
  const response = await fetch(BASE_URL);
  const filesString = await response.text();
  return filesString.split("\n");
}

async function getFileContent(fileName) {
  const response = await fetch(`${BASE_URL}/${fileName}`);
  const fileContentString = await response.text();
  return fileContentString;
}

async function updateFileContent(fileName, fileContent) {
  const url = `${BASE_URL}/${fileName}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: fileContent,
  };
  const response = await fetch(url, options);
  const responseString = await response.text();
  return responseString;
}

export default { getFileNames, getFileContent, updateFileContent };
