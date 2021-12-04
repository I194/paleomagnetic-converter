import * as XLSX from 'xlsx';
import { xlsx_to_csv } from '../../utils/subFunctions';
import parseCSV_PMD from './parserCSV_PMD';

const parseXLSX_PMD = (data: ArrayBuffer) => {
  
  const Uint8Data = new Uint8Array(data);
  const workbook = XLSX.read(Uint8Data, {type: 'array'});
  const res = xlsx_to_csv(workbook);
  const finalRes = parseCSV_PMD(res);

  return finalRes;

}

export default parseXLSX_PMD;