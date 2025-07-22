import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { RegisterRequestDto } from "../dtos/register-request-dto";
import Result from "../types/result";
import { UserLoginResponseDto } from "../dtos/user-login-response-dto";
import { environment } from "../../../environment/environment.development";
import TokenResponseDto from "../dtos/token-response-dto";
import { UserInfoResponseDto } from "../dtos/userinfo-response-dto";

export interface IUser {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  tokenResponse: TokenResponseDto;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly userKey = "auth_user";
  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private readonly apiUrl = `${environment.apiEndpoint}/auth/register`;
  private readonly userIdKey = "registered_user_id";
  private readonly tokenKey = "token";
  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem(this.userKey);
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
    const userId = localStorage.getItem(this.userIdKey);
  }

  /**
   * Login: Authenticates the user and saves data to localStorage
   */

  login(credentials: { email: string; password: string }): Observable<IUser> {
  return this.http
    .post<Result<UserInfoResponseDto>>(`${environment.apiEndpoint}/Auth/Authenticate`, credentials)
    .pipe(
      map((result) => {
        if (result.success && result.data.tokenResponse?.token) {
          this.saveUser(result.data);
          return this.currentUserSubject.value!;
        }
        const msg = result.message ?? "Login failed";
        if (result.errors && result.errors.length) {
          throw new Error(result.errors.join(", "));
        }
        throw new Error(msg);
      })
    );


  }
  /** Saves user info and token to localStorage */
  private saveUser(userDto: UserInfoResponseDto): void {
    const user: IUser = {
      userId: userDto.userId,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      tokenResponse: userDto.tokenResponse,
    };

    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  /**
   * Registers a new user and saves the user ID in localStorage.
   */
  register(data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
  }): Observable<string> {
    return this.http.post<Result<string>>(this.apiUrl, data).pipe(
      map((result) => {
        if (result.success && result.data) {
          localStorage.setItem(this.userIdKey, result.data);
          return result.data;
        } else {
          throw new Error(result.message ?? "Registration failed");
        }
      })
    );
  }
  /**
   * Returns the stored JWT token, or null.
   */
  getToken(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.tokenResponse.token : null;
  }
  /**
   * Checks if user is authenticated based on the presence of a token.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  logout(): void {
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  /**
   * Returns the currently logged-in user from the observable.
   */
  getCurrentUser(): IUser | null {
    return this.currentUserSubject.value;
  }

  /** Updates the user's first name in localStorage and observable. */
  updateFirstName(newFirstName: string): void {
    const user = this.getCurrentUser();
    if (!user) return;
    const updatedUser = { ...user, firstName: newFirstName };
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  /** Updates the user's last name in localStorage and observable. */
  updateLastName(newLastName: string): void {
    const user = this.getCurrentUser();
    if (!user) return;
    const updatedUser = { ...user, lastName: newLastName };
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }

  /** Updates the user's email in localStorage and observable. */
  updateEmail(newEmail: string): void {
    const user = this.getCurrentUser();
    if (!user) return;
    const updatedUser = { ...user, email: newEmail };
    localStorage.setItem(this.userKey, JSON.stringify(updatedUser));
    this.currentUserSubject.next(updatedUser);
  }
}
