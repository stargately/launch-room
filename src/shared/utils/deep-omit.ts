const deepOmit = (obj: Record<string, unknown>, omitKey: string) =>
  JSON.parse(
    JSON.stringify(obj),
    (key: string, value: Record<string, unknown>) =>
      key === omitKey ? undefined : value
  );

export default deepOmit;
