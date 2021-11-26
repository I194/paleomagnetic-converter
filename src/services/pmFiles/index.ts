import parseDIR from "../parsers/parserDIR";
import parsePMM from "../parsers/parserPMM";
import parsePMCSV from "../parsers/parserPMCSV";
import parsePMXLSX from "../parsers/parserPMXLSX";

export default class PMFile {

  name;
  type;
  size;
  path;
  data;

  constructor(name: string, type: string, size: number, path: string, data: string | ArrayBuffer | null) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.path = path;
    this.data = data;
  }

  parsePMM = () => parsePMM(this.data as string);
  parseDIR = () => parseDIR(this.data as string);
  parsePMCSV = () => parsePMCSV(this.data as string);
  parsePMXLSX = () => parsePMXLSX(this.data as ArrayBuffer);

}