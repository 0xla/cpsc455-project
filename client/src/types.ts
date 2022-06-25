export interface ImageData {
  id: string;
  url: string;
  description: string;
}

export interface UserDetails {
  username: string;
  userBio: string;
  profileImageUrl: string;
  images: ImageData[];
}
