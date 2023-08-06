import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IHistoricalData, IStockData } from 'src/app/_interfaces/Historical.interface';
import { ISymbol } from 'src/app/_interfaces/Symbol.interface';
import { HistoricalService } from 'src/app/_services/historical/historical.service';
import { SymbolService } from 'src/app/_services/symbol/symbol.service';

interface Food {
  value: string;
  viewValue: string;
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

export interface IHistoricalChart {
  name: string;
  value: number;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


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

  // Options for the chart.
  public view: [number, number] = [1100, 290];
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


  public single = [
    {
      "name": "China",
      "value": 500
    },
    {
      "name": "USA",
      "value": 450
    },
    {
      "name": "Norway",
      "value": 392
    },
    {
      "name": "Japan",
      "value": 897
    },
    {
      "name": "Germany",
      "value": 672
    },
    {
      "name": "France",
      "value": 345
    },
    {
      "name": "France1",
      "value": 190
    },
    {
      "name": "France2",
      "value": 997
    },
    {
      "name": "France3",
      "value": 344
    },
    {
      "name": "France4",
      "value": 90
    },
    {
      "name": "France5",
      "value": 766
    },
    {
      "name": "France6",
      "value": 988
    },
    {
      "name": "France7",
      "value": 762
    },
    {
      "name": "France8",
      "value": 123
    },
    {
      "name": "France9",
      "value": 672
    },
    {
      "name": "France10",
      "value": 1036
    },
  ];

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
    this._historicalService.getHistoricalBySymbol(symbol).subscribe(
      stockData => {
        this.transformHistoricalData(stockData);
        this.historical = stockData.historical;
        this.dataSource.data = this.historical;

        this.loading = false;
      },
      error => {
        console.error(error);
      }
    )
  }

  transformHistoricalData(stockData: IStockData) {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
