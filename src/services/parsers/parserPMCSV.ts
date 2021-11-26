const parsePMCSV = (data: string) => {
  
  // eslint-disable-next-line no-control-regex
  const eol = new RegExp("\r?\n");
  // Get all lines except the last one (it's garbage)
  let lines = data.split(eol).filter(line => line.length > 1);
  
  const name = '';

  const interpretations = lines.slice(1).map((line) => {
    
    const params = line.replace(/\s+/g, ' ').split(',');

    // ID | Code | StepRange | N | Dgeo | Igeo | Dstrat | Istrat | MAD | Comment 
    const id = params[0];
    const code = params[1];
    const stepRange = params[2];
    const stepCount = Number(params[3]);
    const Dgeo = Number(params[4]);
    const Igeo = Number(params[5]);
    const Dstrat = Number(params[6]);
    const Istrat = Number(params[7]);
    const mad = Number(params[8]);
    const k = -1;

    let comment = '';
    // comment may be with commas
    for (let i = 9; i < params.length; i++) comment += params[i];
    comment = comment.trim();

    // there is no standard for demagnetization symbol... and idk why
    const demagSmbl = stepRange.split('')[0];
    const thermalTypes = ['T', 't'];
    const alternatingTypes = ['M', 'm'];

    let demagType = undefined;
    if (thermalTypes.indexOf(demagSmbl) > -1) demagType = 'thermal';
    else if (alternatingTypes.indexOf(demagSmbl) > -1) demagType = 'alternating field';

    return {
      id,
      code,
      demagType,
      stepRange,
      stepCount,
      geographic: {dec: Dgeo, inc: Igeo},
      tectonic: {dec: Dstrat, inc: Istrat},
      mad,
      k,
      comment
    };

  });
  
  return {
    name,
    interpretations,
    format: "PMCSV",
    created: new Date().toISOString(),
  };

}

export default parsePMCSV;