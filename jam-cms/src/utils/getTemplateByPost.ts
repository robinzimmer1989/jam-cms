export default function getTemplateByPost(post: any, fields: any) {
  let template;

  if (post?.template?.includes('archive-')) {
    // The archive id is stored in the format 'archive-[post-type]'
    const postType = post.template.split('-')[1];
    template = fields?.postTypes?.[postType]?.templates?.archive;
  } else {
    template = fields?.postTypes?.[post?.postTypeID]?.templates?.[post?.template];
  }

  return template;
}
