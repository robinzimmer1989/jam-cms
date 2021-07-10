export default function getParameter(param: any) {
  var result = false,
    tmp = [];
  if (typeof window !== `undefined`) {
    window.location.search
      .substr(1)
      .split('&')
      .forEach((item) => {
        tmp = item.split('=');
        if (tmp[0] === param) {
          // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'boolean'.
          result = decodeURIComponent(tmp[1]);
        }
      });
  }
  return result;
}
