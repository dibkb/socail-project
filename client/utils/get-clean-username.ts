export function getCleanedusername(name: string) {
  const res = name.split("/@").pop();
  if (res?.split("/").length) {
    return res?.split("/")[0];
  } else {
    return res;
  }
}
