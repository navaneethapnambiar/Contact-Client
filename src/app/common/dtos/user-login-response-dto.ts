export interface UserLoginResponseDto {
  token: string;
  user: {
    userId: string;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    expires: string;
  };
}
