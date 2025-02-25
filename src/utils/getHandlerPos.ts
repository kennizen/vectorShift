// methods
export function handleGenerateHandlerPositions(h: number) {
  const hndlrs = h;
  const res: number[] = [];
  const step = 100 / (hndlrs + 1);
  let interval = step;

  for (let i = 1; i <= hndlrs; i++) {
    res.push(interval);
    interval += step;
  }
  return res;
}