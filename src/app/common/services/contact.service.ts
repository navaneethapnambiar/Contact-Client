import { Injectable } from '@angular/core';;
import { Observable } from 'rxjs';
import { ContactViewDto } from '../dtos/contact-view-dto';
import { HttpClient } from '@angular/common/http';
import { ContactCreateDto } from '../dtos/contact-create-dto';
import { ContactUpdateDto } from '../dtos/contact-update-dto';
import { environment } from '../../../environment/environment.development';

export interface Result<T> {
  success: boolean;
  data: T;
  message: string | null;
  errors: string[];
  resultType: number;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly apiUrl = `${environment.apiEndpoint}/ContactList`; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Result<ContactViewDto[]>> {
    return this.http.get<Result<ContactViewDto[]>>(this.apiUrl);
  }

  getById(id: number): Observable<Result<ContactViewDto>> {
    return this.http.get<Result<ContactViewDto>>(`${this.apiUrl}/${id}`);
  }

  create(contact: ContactCreateDto): Observable<Result<number>> {
    return this.http.post<Result<number>>(this.apiUrl, contact);
  }

  update(id: number, contact: ContactUpdateDto): Observable<Result<boolean>> {
    return this.http.put<Result<boolean>>(`${this.apiUrl}/${id}`, contact);
  }

  delete(id: number): Observable<Result<boolean>> {
    return this.http.delete<Result<boolean>>(`${this.apiUrl}/${id}`);
  }
}