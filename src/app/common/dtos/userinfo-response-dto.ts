import TokenResponseDto from "./token-response-dto";


export interface UserInfoResponseDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tokenResponse: TokenResponseDto;
}
