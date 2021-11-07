import parsePMM from "./parserPMM";

export class PMParser {

  data;

  constructor(data: string) {
    this.data = data;
  }

  parsePMM = () => {
    return parsePMM(this.data);
  }

}