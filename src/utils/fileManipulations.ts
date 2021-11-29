import PMFile from "../services/pmFiles";
import { exampleDir } from "./fileConstants";

export interface IDirData {
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


export const getDirectionalData = (file: File) => {

  const ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name)?.toString().toLowerCase() : undefined;

  return new Promise<IDirData | string>((resolve, reject) => {
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

export const putParamToString = ((param: string|number, len: number) => {
  if (typeof(param) === 'number') {
    return ' '.repeat(len - param.toString().length) + param.toString();
  } else if (len === 0) return ' ' + param; // comment case
  return param + ' '.repeat(len - param.length);
}) 

export const s2ab = (s: string) => { 
  const buf = new ArrayBuffer(s.length); // Convert s to arrayBuffer
  const view = new Uint8Array(buf);  // Create uint8array as viewer
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; // Convert to octet - excel can read only octet (2^8) data
  return buf;    
}

// Function to download data to a file
export const download = (data: string | ArrayBuffer, filename: string, type: string) => {
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
