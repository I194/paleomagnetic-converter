const parsePMD = (data: string) => {
  
  // eslint-disable-next-line no-control-regex
  const eol = new RegExp("\r?\n");
  // Get all lines except the last one (it's garbage) and the first one (it's empty)
  const lines = data.split(eol).slice(1).filter(line => line.length > 1);

  // const headLine = lines[0].replace(/\s+/g, ' ').split(' ');
  // const metadata = headLine.map((param: string) => )
  
  const headLine = lines[0]; // line with speciment name and orientation params - metadata in other words
  const metadata = {
    name: headLine.slice(0, 10).trim(),
    a: Number(headLine.slice(12, 20).trim()),
    b: Number(headLine.slice(22, 30).trim()),
    s: Number(headLine.slice(32, 40).trim()),
    d: Number(headLine.slice(42, 50).trim()),
    v: Number(headLine.slice(52, headLine.length).trim().toLowerCase().split('m')[0]),
  }

  const steps = lines.map((line) => {
    
    const params = line.replace(/\s+/g, ' ').split(' ');

    // PAL | Xc (Am2) | Yc (Am2) | Zc (Am2) | MAG (A/m) | Dg | Ig | Ds | Is| a95
    // PAL === Step (mT or temp degrees)
    const step = params.slice(0, 5).trim();
    const x = params.slice(5, 14).trim();
    const y = params.slice(15, 25).trim();
    const z = params.slice(25, 34).trim();
    const mag = params.slice(34, 44).trim();
    const Dgeo = params.slice(44, 50).trim();
    const Igeo = params.slice(50, 56).trim();
    const Dstrat = params.slice(56, 62).trim();
    const Istrat = params.slice(62, 68).trim();
    const a95 = params.slice(68, 73).trim();
    const comment = params.slice(73, params.length).trim();

    // there is no standard for demagnetization symbol... and idk why
    const demagSmbl = params.slice(0, 1);
    const thermalTypes = ['T', 't'];
    const alternatingTypes = ['M', 'm'];

    let demagType = undefined;

    if (thermalTypes.indexOf(demagSmbl) > -1) demagType = 'thermal';
    else if (alternatingTypes.indexOf(demagSmbl) > -1) demagType = 'alternating';

    return {
      step,
      x,
      y,
      z,
      mag,
      geographic: {dec: Dgeo, inc: Igeo},
      tectonic: {dec: Dstrat, inc: Istrat},
      a95,
      comment,
      demagType,
    };

  });
  
  return {
    metadata,
    steps,
    format: "PMD",
    created: new Date().toISOString(),
  };

}

export default parsePMD;