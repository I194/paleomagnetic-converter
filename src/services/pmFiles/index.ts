import parseDIR from "../parsers/parserDIR";
import parsePMM from "../parsers/parserPMM";
import parsePMCSV from "../parsers/parserPMCSV";

export default class PMFile {

  name;
  type;
  size;
  path;
  data;

  constructor(name: string, type: string, size: number, path: string, data: string) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.path = path;
    this.data = data;
  }

  parsePMM = () => parsePMM(this.data);
  parseDIR = () => parseDIR(this.data);
  parsePMCSV = () => parsePMCSV(this.data);

}