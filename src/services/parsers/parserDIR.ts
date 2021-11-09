const parseDIR = (data: string) => {
  
  // eslint-disable-next-line no-control-regex
  const eol = new RegExp("\r?\n");
  // Get all lines except the last one (it's garbage)
  const lines = data.split(eol).filter(line => line.length > 1);

  const name = undefined;

  const interpretations = lines.map((line) => {
    
    const params = line.replace(/\s+/g, ' ').split(' ');

    // ID | CODE | STEPRANGE | N | Dg | Ig | kg | Ds | Is | MAD | Comment 
    const id = params[0];
    const code = params[1];
    const stepRange = params[2];
    const stepsCount = Number(params[3]);
    const Dgeo = Number(params[4]);
    const Igeo = Number(params[5]);
    const Dstrat = Number(params[6]);
    const Istrat = Number(params[7]);
    const mad = Number(params[8]);
    let k = undefined;
    let comment = '';
    if (typeof(params) === 'number') k = Number(params[9]);
    else comment = params[9];

    // comment may be with spaces
    for (let i = 10; i < params.length; i++) comment += params[i];
    comment = comment.trim();

    // there is no standard for demagnetization symbol... and idk why
    const demagSmbl = stepRange.split('')[0];
    const thermalTypes = ['T', 't'];
    const alternatingTypes = ['M', 'm', 'AF', 'af', 'nT'];

    let demagType = undefined;

    if (thermalTypes.indexOf(demagSmbl) > -1) demagType = 'thermal';
    else if (alternatingTypes.indexOf(demagSmbl) > -1) demagType = 'alternating';

    return {
      id,
      code,
      demagType,
      stepRange,
      stepsCount,
      geographic: {dec: Dgeo, inc: Igeo, mad, k},
      tectonic: {dec: Dstrat, inc: Istrat, mad, k},
      comment
    };

  });
  
  return {
    "name": name,
    "format": "DIR",
    "created": new Date().toISOString(),
    "interpretations": interpretations
  };

}

export default parseDIR;