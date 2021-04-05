export default function getTemplateByPost(post, templates) {
  let template;

  if (post?.template.includes('archive')) {
    // The archive id is stored in the format 'archive-[post-type]'
    const postType = post.template.split('-')[1];
    template = templates?.postTypes?.[postType]?.archive;
  } else {
    template = templates?.postTypes?.[post?.postTypeID]?.[post?.template];
  }

  return template;
}
