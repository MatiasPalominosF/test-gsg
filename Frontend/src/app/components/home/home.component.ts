import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHistoricalData, IStockData } from 'src/app/_interfaces/Historical.interface';
import { ISymbol } from 'src/app/_interfaces/Symbol.interface';
import { HistoricalService } from 'src/app/_services/historical/historical.service';
import { SymbolService } from 'src/app/_services/symbol/symbol.service';

export interface IHistoricalChart {
  name: string;
  value: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public displayedColumns: string[] = ['position', 'date', 'close'];
  public dataSource: MatTableDataSource<IHistoricalData> = new MatTableDataSource<IHistoricalData>();
  public symbols: ISymbol[] = [];
  public historical: IHistoricalData[] = [];
  public historicalForChart: IHistoricalChart[] = [];
  public loading = false;
  public selectedSymbol!: any;

  // Options for the chart
  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Date';
  public showYAxisLabel = true;
  public yAxisLabel = 'Price';
  public timeline = true;
  public doughnut = true;

  constructor(
    private _symbolService: SymbolService,
    private _historicalService: HistoricalService,
  ) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getSymbols();
    this.dataSource.data = [];
  }

  getSymbols() {
    this.loading = true;
    this._symbolService.getSymbols().subscribe(
      symbols => {
        this.symbols = symbols;
        const symbol: string = this.symbols[0].symbol
        this.selectedSymbol = symbol;
        this.getHistoricalBySymbol(symbol);
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    );
  }

  getHistoricalBySymbol(symbol: string) {
    this.historical = [];
    this.dataSource.data = [];
    this._historicalService.getHistoricalBySymbol(symbol).subscribe(
      stockData => {
        this.transformHistoricalData(stockData);
        this.historical = stockData.historical;
        this.dataSource.data = this.historical;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.error(error);
      }
    )
  }

  transformHistoricalData(stockData: IStockData) {
    this.historicalForChart = [];
    this.historicalForChart = stockData.historical.map((dataPoint: IHistoricalData) => {
      return {
        name: dataPoint.date,
        value: dataPoint.close
      };
    });
    this.historicalForChart.sort((a, b) => {
      const dateA = new Date(a.name);
      const dateB = new Date(b.name);
      return dateB.getTime() - dateA.getTime();
    });
  }

  onSelectionChange(event: any) {
    this.loading = true;
    const symbol: string = event.value;
    this.getHistoricalBySymbol(symbol);
  }
}
