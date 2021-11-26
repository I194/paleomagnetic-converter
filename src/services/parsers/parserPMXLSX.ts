import * as XLSX from 'xlsx';
import parsePMCSV from './parserPMCSV';

const to_csv = function to_csv(workbook: any) {
  var result: string[] = [];
  workbook.SheetNames.forEach((sheetName: string) => {
    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    if(csv.length){
      result.push(csv);
    }
  });
  return result.join("\n");
};

const parsePMXLSX = (data: ArrayBuffer) => {
  
  const Uint8Data = new Uint8Array(data);
  const workbook = XLSX.read(Uint8Data, {type: 'array'});
  const res = to_csv(workbook);
  const finalRes = parsePMCSV(res);

  return finalRes;

}

export default parsePMXLSX;