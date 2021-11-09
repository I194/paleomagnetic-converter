import PMFile from "../pmFiles";

const getDirectionalData = (file: File) => {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {

      const handleRawData = (rawData: string | ArrayBuffer | null) => {
        const ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;
        if (typeof(rawData) !== 'string' || !ext) return console.log("file can't be parsed");
        const pmFile = new PMFile(file.name, file.type, file.size, file.webkitRelativePath, rawData);
        switch (ext[0].toLowerCase()) {
          case 'dir': return pmFile.parseDIR();
          case 'pmm': return pmFile.parsePMM(); 
        }
      }

      resolve(handleRawData(reader.result));

    };

    reader.onerror = reject;
  
    reader.readAsText(file);   
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