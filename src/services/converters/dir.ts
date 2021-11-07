const getDirectionalData = (file: File) => {

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
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