export interface ImageData {
  id: string;
  url: string;
  description: string;
}

export interface UserDetails {
  username: string;
  followers: []
  userBio: string;
  profileImageUrl: string;
  images: ImageData[];
}
