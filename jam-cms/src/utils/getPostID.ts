import generateSlug from './generateSlug';

export default function getPostID(site: any) {
  const pathname = window.location.pathname.replace(/\/$/, '');

  let id = null;

  Object.values(site.postTypes).map((o: any) =>
    Object.values(o.posts).map((p: any) => {
      const slug = generateSlug({
        site,
        postTypeID: o.id,
        postID: p.id,
        leadingSlash: true,
      });

      const isNumber = (n: any) => {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
      };

      if (slug === pathname) {
        id = p.id;
      } else if (
        // We're assuming here that there is not conflicting page which has the format '/[blog]/page/2'
        pathname.startsWith(`${slug}/page/`) &&
        isNumber(pathname.substring(pathname.lastIndexOf('/') + 1))
      ) {
        id = p.id;
      }
    })
  );

  return id;
}
