export interface IUser {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: string;
}

export interface IProfileData {
  address: string;
  bio: string;
  birthday: string;
  contact_number: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  profile_image: string | null;
}
