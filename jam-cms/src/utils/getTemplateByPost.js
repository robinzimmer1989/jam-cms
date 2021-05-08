export default function getTemplateByPost(post, fields) {
  let template;

  if (post?.template.includes('archive-')) {
    // The archive id is stored in the format 'archive-[post-type]'
    const postType = post.template.split('-')[1];
    template = fields?.postTypes?.[postType]?.archive;
  } else {
    template = fields?.postTypes?.[post?.postTypeID]?.[post?.template];
  }

  return template;
}
