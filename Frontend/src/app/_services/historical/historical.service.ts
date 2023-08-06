import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStockData } from 'src/app/_interfaces/Historical.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HistoricalService {
  private baseUrl: string;
  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = environment.endpoint;
    this.apiUrl = 'api/historical/';
  }

  getHistorical(): Observable<IStockData[]> {
    return this.http.get<IStockData[]>(`${this.baseUrl}${this.apiUrl}`);
  }

  getHistoricalBySymbol(symbol: string): Observable<IStockData> {
    return this.http.get<IStockData>(`${this.baseUrl}${this.apiUrl}${symbol}`);
  }
}
