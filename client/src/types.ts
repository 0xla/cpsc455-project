export interface ImageData {
  id: string;
  url: string;
  description: string;
}

export interface UserDetails {
  username: string;
  email: string;
  followers: Array<any>;
  followings: Array<any>;
  profilePicture: string;
  bio: string;
}

export interface SliceState {
  loading: boolean;
  error: boolean;
  userData: UserDetails;
}
