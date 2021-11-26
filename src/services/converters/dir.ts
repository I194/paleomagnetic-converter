import PMFile from "../pmFiles";

interface IDirData {
  name: string;
  interpretations: {
    id: string;
    code: string;
    stepRange: string;
    stepCount: number;
    geographic: {dec: number, inc: number};
    tectonic: {dec: number, inc: number};
    mad: number;
    k: number;
    comment: string;
    demagType: string | undefined;
  }[];
  format: string;
  created: string;
}

const exampleDir = {
  name: 'string',
  interpretations: [{
    id: 'string',
    code: 'string',
    stepRange: 'string',
    stepCount: 0,
    geographic: {dec: 0, inc: 0},
    tectonic: {dec: 0, inc: 0},
    mad: 0,
    k: 0,
    comment: 'string',
    demagType: 'string',
  }],
  format: 'string',
  created: 'string',
}

const getDirectionalData = (file: File) => {

  const ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)?.toString().toLowerCase() : undefined;

  return new Promise<IDirData>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {

      const handleRawData = (rawData: string | ArrayBuffer | null) => {
        const pmFile = new PMFile(file.name, file.type, file.size, file.webkitRelativePath, rawData);
        console.log(ext)
        switch (ext) {
          case 'dir': return pmFile.parseDIR();
          case 'pmm': return pmFile.parsePMM();
          case 'csv': return pmFile.parsePMCSV();
          case 'xlsx': return pmFile.parsePMXLSX();       
          default: return exampleDir;
        }
      }

      resolve(handleRawData(reader.result));

    };

    reader.onerror = reject;
  
    ext === 'xlsx' ? reader.readAsArrayBuffer(file) : reader.readAsText(file);   
  })

}

const putParamToString = ((param: string|number, len: number) => {
  if (typeof(param) === 'number') {
    return ' '.repeat(len - param.toString().length) + param.toString();
  };
  return param + ' '.repeat(len - param.length);
}) 

export const toDIR = async (file: File) => {
  
  const data = await getDirectionalData(file);

  // count of symbols for each property (column) in line (row)
  const dataModel = {
    id: 7,
    code: 8,
    stepRange: 10,
    stepCount: 3,
    Dgeo: 6,
    Igeo: 6,
    Dstrat: 6,
    Istrat: 6,
    mad: 6,
    k: 5,
    comment: 'any'
  }
  console.log(data)
  const lines = data.interpretations.map((interpretation: any, lineIndex: number) => {
    const id = putParamToString(interpretation.id, dataModel.id);
    const code = putParamToString(interpretation.code, dataModel.code);
    const stepRange = putParamToString(interpretation.stepRange, dataModel.stepRange);
    const stepCount = putParamToString(interpretation.stepCount, dataModel.stepCount);
    const Dgeo = putParamToString(interpretation.geographic.dec, dataModel.Dgeo);
    const Igeo = putParamToString(interpretation.geographic.inc, dataModel.Igeo);
    const Dstrat = putParamToString(interpretation.tectonic.dec, dataModel.Dstrat);
    const Istrat = putParamToString(interpretation.tectonic.inc, dataModel.Istrat);
    const mad = putParamToString(interpretation.mad, dataModel.mad);
    const k = putParamToString(interpretation.k, dataModel.k);
    const comment = ' ' + interpretation.comment.toString();

    return id + code + stepRange + stepCount + Dgeo + Igeo + Dstrat + Istrat + mad + k + comment;
  }) 

  console.log(lines);

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