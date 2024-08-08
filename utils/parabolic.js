export function parabolic(totalX, plotX) {
  "worklet"
  let y = plotX * plotX - totalX * plotX;

  return y;
}
