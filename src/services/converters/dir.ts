import PMFile from "../pmFiles";

interface IDirData {
  name: string;
  interpretations: {
    id: string;
    code: string;
    stepRange: string;
    stepCount: number;
    Dgeo: number;
    Igeo: number;
    Dstrat: number;
    Istrat: number;
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
    Dgeo: 0,
    Igeo: 0,
    Dstrat: 0,
    Istrat: 0,
    mad: 0,
    k: 0,
    comment: 'string',
    demagType: 'string',
  }],
  format: 'string',
  created: 'string',
}

  // count of symbols for each property (column) in line (row)
  const dataModel_interpretation: any = {
    id: 7,
    code: 8,
    stepRange: 9,
    stepCount: 3,
    Dgeo: 6,
    Igeo: 6,
    Dstrat: 6,
    Istrat: 6,
    mad: 6,
    k: 5,
    comment: 0
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
  } else if (len === 0) return ' ' + param; // comment case
  return param + ' '.repeat(len - param.length);
}) 

// Function to download data to a file
const download = (data: string, filename: string, type: string) => {
  const file = new Blob([data], {type: type});
  const a = document.createElement("a");
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function() {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);  
  }, 0); 
}

export const toDIR = async (file: File) => {
  
  const data = await getDirectionalData(file);

  const lines = data.interpretations.map((interpretation: any) => {
    const line = Object.keys(dataModel_interpretation).reduce((line, param) => {
      return line + putParamToString(interpretation[param], dataModel_interpretation[param])
    }, '');
    return line;
  }).join('\n');

  download(lines, 'res.dir', 'text/plain;charset=utf-8');

  return 'hey';

}

export const toPMM = async (file: File) => {

  const data = await getDirectionalData(file);

  const metaLines = '"file_comment"\n"name","author","2021-11-27"\n';
  const columnNames = 'ID,CODE,STEPRANGE,N,Dg,Ig,kg,a95g,Ds,Is,ks,a95s,comment\n';

  const lines = data.interpretations.map((interpretation: any) => {
    const line = Object.keys(dataModel_interpretation).reduce((line, param, i) => {
      if (i === 6) return line + `${interpretation.k},${interpretation.mad},${interpretation[param]},`;
      if (i === 8) return line + `${interpretation.k},${interpretation.mad},${interpretation.comment}`;
      if (i > 8) return line;
      return line + `${interpretation[param]},`;
    }, '');
    return line;
  }).join('\n');

  const res = metaLines + columnNames + lines;

  download(res, 'res.pmm', 'text/plain;charset=utf-8');

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