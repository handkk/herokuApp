import { Component, ChangeDetectorRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  NodeName: any;
  expandRow: boolean;
  viewsss: any;
  searchNode: any;
  view: any;
  answer: string = ''; mymodel: string;
  answerDisplay: string = '';
  showSpinner: boolean = false;

  isLinear: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  NodeList = [];
  displayedColumns = ['select', 'NodeID', 'NodeName', 'startDate', 'endDate', 'Edit'];
  dataSource = new MatTableDataSource<Element>(this.NodeList);
  selection = new SelectionModel<Element>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  // {
  //   NodeName: "Bangalore",
  //   NodeID: 354687,
  //   startDate: "02/02/2018",
  //   endDate: "18/02/2018"
  // },
  // {
  //   NodeName: "Hyderabad",
  //   NodeID: 687485,
  //   startDate: "20/01/2018",
  //   endDate: "18/02/2018"
  // }

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _formBuilder: FormBuilder,
    public dialog: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      searchNode: ['', Validators.required],
      // NodeName: ['', Validators.required],
      // NodeID: ['', Validators.required],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required]
      // region: ['', Validators.required],
      // city: ['', Validators.required],
      // zipCode: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      reasonCode: ['', Validators.required]
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));

  }
  
  showAnswer() {
    this.showSpinner = true;

    setTimeout(() => {
      this.answerDisplay = this.answer;
      this.showSpinner = false;
    }, 2000);
  }

  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  valuechange(newValue: string) {
    if (newValue != undefined) {
      if (newValue.length > 1) {
        this.NodeList = [];
        this.NodeList.push({
          NodeName: "Hyderabad",
          NodeID: 687485,
          startDate: "20/01/2018",
          endDate: "18/02/2018"
        },
          {
            NodeName: "Bangalore",
            NodeID: 354687,
            startDate: "02/02/2018",
            endDate: "18/02/2018"
          })
        this.NodeName = this.NodeList[0].NodeName
        this.dataSource = new MatTableDataSource<Element>(this.NodeList);
      } else {
        this.NodeList = [];
        this.dataSource = new MatTableDataSource<Element>(this.NodeList);
      }
    }

  }
  more(item, i) {
    this.searchNode = item.NodeName;
    this.view = i;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  edit(i, inss) {
    console.log('index ' + JSON.stringify(i) + " inss " + inss);
    this.viewsss = inss;
  }
  explansionDetialRowCollection = new Array<any>();
  toggleDetailsRow(item) {
    this.expandRow = this.explansionDetialRowCollection.includes(item);

  }
  save() {
    alert(this.thirdFormGroup.value.reasonCode);
  }
  openDialog() {
    this.dialog.open(DialogDataExampleDialog, {
      maxWidth: 'auto',
      data: {
        animal: 'panda'
      }
    });
  }
}
export interface Element {
  NodeID: number;
  NodeName: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}