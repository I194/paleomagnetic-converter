import { parsePMM } from "./parserPMM";

export class PMParser {

  data;

  constructor(data: string | ArrayBuffer | null) {
    this.data = data;
  }

  parsePMM = () => {
    return parsePMM(this.data);
  }

}