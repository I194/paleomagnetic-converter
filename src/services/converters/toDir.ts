export const pmcsvToDir = (file: File) => {

  const reader = new FileReader();
  reader.readAsText(file);   
  reader.onload = function() {
    console.log(reader.result);
  }

  return 'hey';

}