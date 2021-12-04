import * as XLSX from 'xlsx';
import { xlsx_to_csv } from '../../utils/subFunctions';
import parsePMCSV from './parserCSV_DIR';

const parseXLSX_DIR = (data: ArrayBuffer) => {
  
  const Uint8Data = new Uint8Array(data);
  const workbook = XLSX.read(Uint8Data, {type: 'array'});
  const res = xlsx_to_csv(workbook);
  const finalRes = parsePMCSV(res);

  return finalRes;

}

export default parseXLSX_DIR;