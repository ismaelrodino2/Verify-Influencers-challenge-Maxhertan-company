type EdgeNode = {
    text: string;
  };
  
  type Edge = {
    node: EdgeNode;
  };
  
  type EdgeMediaToCaption = {
    edges: Edge[];
  };
  
  type Dimensions = {
    height: number;
    width: number;
  };
  
  type EdgeMediaToComment = {
    count: number;
  };
  
  type EdgeLikedBy = {
    count: number;
  };
  
  type Owner = {
    id: string;
  };
  
  export type MediaItem = {
    id: string;
    __typename: string;
    edge_media_to_caption: EdgeMediaToCaption;
    shortcode: string;
    edge_media_to_comment: EdgeMediaToComment;
    comments_disabled: boolean;
    taken_at_timestamp: number;
    dimensions: Dimensions;
    display_url: string;
    edge_liked_by: EdgeLikedBy;
    owner: Owner;
    thumbnail_src: string;
    is_video: boolean;
    video_view_count: number;
  };
  
