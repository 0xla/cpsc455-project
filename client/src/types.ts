export interface ImageData {
  id: string;
  url: string;
  description: string;
  likes: any;
  username: string;
  profilePicture: string;
  createdAt: Date
}
export interface FollowerData {
  id: string,
  username: string
}

export interface UserDetails {
  username: string;
  userId: string;
  userBio: string;
  profileImageUrl: string;
  images: ImageData[];
  feedImages: ImageData[];
  followers: Array<FollowerData>;
  followings: Array<FollowerData>;
  imageCategories: Array<string>;
}
