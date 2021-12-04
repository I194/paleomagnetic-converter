import * as XLSX from 'xlsx';
import { dataModel_interpretation, dataModel_metaPMD, dataModel_step } from '../../utils/fileConstants';
import { download, getDirectionalData, IPmdData, putParamToString, s2ab } from '../../utils/fileManipulations';

export const toPMD = async (file: File) => {
  
  const data = await getDirectionalData(file) as IPmdData;

  const extraMeta: any = {
    ...data.metadata,
    aName: 'a=',
    bName: '   b=',
    sName: '   s=',
    dName: '   d=',
    vName: '   v=',
  }

  // 119_0     a=162.9   b= 62.0   s=270.0   d=  0.0   v= 1.0E-6m3 --- example
  const metaLines = [
    'file_name   some_path',
    Object.keys(dataModel_metaPMD).reduce((line, param) => {
      return line + putParamToString(extraMeta[param], dataModel_metaPMD[param]);
    }, '') + 'm3',
  ].join('\n');

  const columnNames = ' PAL  Xc (Am2)  Yc (Am2)  Zc (Am2)  MAG(A/m)   Dg    Ig    Ds    Is   a95 \n';

  const lines = data.steps.map((step: any) => {
    return Object.keys(dataModel_step).reduce((line, param) => {
      return line + putParamToString(step[param], dataModel_step[param]);
    }, '');
  }).join('\n');

  const res = metaLines + columnNames + lines + '\n';

  download(res, 'res.pmd', 'text/plain;charset=utf-8');

  return 'hey';

}

export const toCSV_PMD = async (file: File) => {

  const data = await getDirectionalData(file) as IPmdData;

  const metaNames = 'a,b,s,d,v(m3)\n';
  const metaLine = [
    data.metadata.a,
    data.metadata.b,
    data.metadata.s,
    data.metadata.d,
    data.metadata.v,
  ].join(',') + '\n';

  const columnNames = 'PAL,Xc(Am2),Yc(Am2),Zc(Am2),MAG(A/m),Dg,Ig,Ds,Is,a95\n';

  const lines = data.steps.map((step: any) => {
    const line = Object.keys(dataModel_step).reduce((line, param) => {
      return line + `${step[param]},`
    }, '')
    return line.slice(0, -1);
  }).join('\n');

  const res = metaNames + metaLine + columnNames + lines;

  download(res, 'res.csv', 'text/csv;charset=utf-8');

  return 'hey';

}

export const toXLSX_PMD = async (file: File) => {

  const data = await getDirectionalData(file) as IPmdData;

  const metaNames = 'a,b,s,d,v (m3)'.split(',');
  const metaLine = [
    data.metadata.a,
    data.metadata.b,
    data.metadata.s,
    data.metadata.d,
    data.metadata.v,
  ];

  const columnNames = 'PAL, Xc (Am2), Yc (Am2), Zc (Am2), MAG(A/m), Dg, Ig, Ds, Is, a95'.split(',');

  const lines = data.steps.map((step: any) => {
    return Object.keys(dataModel_step).map((param) => {
      return step[param];
    });
  });

  const wbook = XLSX.utils.book_new();
  wbook.SheetNames.push('data');
  lines.unshift(columnNames);
  lines.unshift(metaLine);
  lines.unshift(metaNames);
  const wsheet = XLSX.utils.aoa_to_sheet(lines);
  wbook.Sheets.data = wsheet;
  const wbinary = XLSX.write(wbook, {bookType: 'xlsx', type: 'binary'});

  const res = s2ab(wbinary);

  download(res, 'res.xlsx', "application/octet-stream")

  return 'hey';

}