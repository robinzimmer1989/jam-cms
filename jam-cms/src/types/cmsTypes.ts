export interface Config {
  source: string;
  settings: any;
  privateTemplateExists: boolean;
}

export interface Capabilities {
  edit_posts?: boolean;
  read?: boolean;
  list_users?: boolean;
  manage_options?: boolean;
  edit_theme_options?: boolean;
  level_1?: boolean;
}

export interface User {
  id: number;
  email: string;
  capabilities: Capabilities;
  roles?: string[];
}

export interface Deployment {
  lastBuild: string | boolean;
  undeployedChanges: boolean;
  buildHook: string;
  badgeImage: string;
  badgeLink: string;
}

export interface Sidebar {
  width: number;
  position: string;
  defaultOpen: string;
  style: string;
}

export interface EditorOptions {
  sidebar: Sidebar;
}

export interface UnpublishedChange {
  id: number;
  title: string;
  description: string;
  actionType: string;
}

export interface Language {
  id: number;
  slug: string;
  name: string;
  locale: string;
  flag: string;
}

export interface Languages {
  defaultLanguage: string;
  languages: Language[];
  postTypes: string[];
  taxonomies: string[];
  title: string;
}

export interface Seo {}

export interface Post {
  id: number;
  archive?: boolean;
  archivePostType?: string;
  archivePostsPerPage?: number;
  content: any;
  createdAt: string;
  featuredImage?: any;
  language?: string;
  locked?: User | null;
  order: number;
  parentID: number;
  postTypeID: string;
  seo: any;
  slug: string;
  status: string;
  taxonomies: any;
  template: string;
  templateObject?: any;
  title: string;
  translations: any;
  updatedAt: string;
  revisionsEnabled?: boolean;
  revisionID?: number;
  revisions?: any;
}

export interface PostType {
  id: string;
  posts: any;
  slug: string;
  title: string;
}

export interface Taxonomy {
  graphqlPluralName: string;
  graphqlSingleName: string;
  id: string;
  postTypes: string[];
  slug: string;
  terms: any;
  title: string;
}

export interface Term {
  count: number;
  description: string;
  id: number;
  language?: string;
  parentID: number;
  slug: string;
  taxonomyID: string;
  title: string;
  translations: any;
  uri: string;
}

export interface UserRole {
  id: string;
  name: string;
}

export interface Site {
  id: string | number;
  apiKey?: string;
  createdAt?: string;
  deployment?: Deployment;
  editorOptions: EditorOptions;
  frontPage: number | null;
  googleMapsApi?: string;
  languages?: Languages;
  postTypes: any;
  siteUrl: string;
  taxonomies: any;
  themeOptions: any;
  title: string;
  userRoles: UserRole[];
  errors?: any;
}

export interface MediaItem {
  id: number;
}
