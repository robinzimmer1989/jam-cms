import generateSlug from './generateSlug';

export default function getPostID(site: any) {
  const pathname = window.location.pathname;
  const sanitizedPathname = pathname === '/' ? pathname : pathname.replace(/\/$/, '');

  let id = 0;

  if (site) {
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

        if (slug === sanitizedPathname) {
          id = p.id;
        } else if (
          // We're assuming here that there is not conflicting page which has the format '/[blog]/page/2'
          sanitizedPathname.startsWith(`${slug}/page/`) &&
          isNumber(sanitizedPathname.substring(sanitizedPathname.lastIndexOf('/') + 1))
        ) {
          id = p.id;
        }
      })
    );
  }

  return id;
}
