import * as XLSX from 'xlsx';

export function executeFunctionByName (functionName: string, context: any, ...args: any[]) {
  const namespaces = functionName.split(".");
  const func: any = namespaces.pop();
  for (let i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  console.log(context);
  return context[func].apply(context, args);
}

export const xlsx_to_csv = function to_csv(workbook: any) {
  var result: string[] = [];
  workbook.SheetNames.forEach((sheetName: string) => {
    var csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
    if(csv.length){
      result.push(csv);
    }
  });
  return result.join("\n");
};
