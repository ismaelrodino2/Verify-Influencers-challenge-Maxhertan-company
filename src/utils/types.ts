import {
  EdgeOwnerToTimelineMediaEdge,
  IGUserMetadata,
} from "insta-fetcher/dist/types";

export interface MediaItem {
  user: IGUserMetadata;
  posts: EdgeOwnerToTimelineMediaEdge[];
}

export interface DataClaims {
  name: string;
  image: string;
  category: string;
  followers: number;
  claimsVerified: number;
  trustedScore: number;
}

export interface ClaimsAnalysisResult {
  trueClaims: number;
  falseClaims: number;
  unknownClaims: number;
}
