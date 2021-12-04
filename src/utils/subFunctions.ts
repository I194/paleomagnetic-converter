export function executeFunctionByName (functionName: string, context: any, ...args: any[]) {
  const namespaces = functionName.split(".");
  const func: any = namespaces.pop();
  for (let i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  console.log(context);
  return context[func].apply(context, args);
}