import PMFile from "../pmFiles";

const getDirectionalData = (file: File) => {

  const ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)?.toString().toLowerCase() : undefined;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {

      const handleRawData = (rawData: string | ArrayBuffer | null) => {
        console.log(ext)
        // if (typeof(rawData) !== 'string' || !ext) return console.log("Error: file can't be parsed");
        const pmFile = new PMFile(file.name, file.type, file.size, file.webkitRelativePath, rawData);
        switch (ext) {
          case 'dir': return pmFile.parseDIR();
          case 'pmm': return pmFile.parsePMM();
          case 'csv': return pmFile.parsePMCSV();
          case 'xlsx': return pmFile.parsePMXLSX();        
        }
      }

      resolve(handleRawData(reader.result));

    };

    reader.onerror = reject;
  
    ext === 'xlsx' ? reader.readAsArrayBuffer(file) : reader.readAsText(file);   
  })

}

export const toDIR = async (file: File) => {
  
  const data = await getDirectionalData(file);
  console.log(data)

  return 'hey';

}

export const toPMM = async (file: File) => {

  const data = await getDirectionalData(file);
  console.log(data)

  return 'hey';

}

export const toPMCSV = async (file: File) => {

  const data = await getDirectionalData(file);
  console.log(data)

  return 'hey';

}

export const toPMXLSX = async (file: File) => {

  const data = await getDirectionalData(file);
  console.log(data)

  return 'hey';

}