export default function getParameter(param: any) {
  var result = '',
    tmp = [];
  if (typeof window !== `undefined`) {
    window.location.search
      .substr(1)
      .split('&')
      .forEach((item) => {
        tmp = item.split('=');
        if (tmp[0] === param) {
          result = decodeURIComponent(tmp[1]);
        }
      });
  }

  return result;
}
