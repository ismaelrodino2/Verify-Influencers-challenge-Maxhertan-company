import {
  EdgeOwnerToTimelineMediaEdge,
  IGUserMetadata,
} from "insta-fetcher/dist/types";

export interface MediaItem {
  user: IGUserMetadata;
  posts: EdgeOwnerToTimelineMediaEdge[];
}
