import parseDIR from "./parserDIR";
import parsePMM from "./parserPMM";

export class PMParser {

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

  parsePMM = () => {
    return parsePMM(this.data);
  }

  parseDIR = () => {
    return parseDIR(this.data);
  }

}