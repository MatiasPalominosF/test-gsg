import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISymbol } from 'src/app/_interfaces/Symbol.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {
  private baseUrl: string;
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.endpoint;
    this.apiUrl = 'api/symbols/';
  }

  getSymbols(): Observable<ISymbol[]> {
    return this.http.get<ISymbol[]>(`${this.baseUrl}${this.apiUrl}`);
  }
}
