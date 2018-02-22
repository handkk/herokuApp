import { Component, ChangeDetectorRef, OnInit, ViewChild, Inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { CommonServService } from './common-serv.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSelectedNode: boolean = false;
  startDate; endDate;
  itemsDropped = [];
  geoBoundaryHead: any;
  NodeName;
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
  thirdFormGroup: FormGroup; geoBoundaryHeadForm: FormGroup;
  NodeList = [];
  displayedColumns = ['SNo', 'NodeName', 'select'];
  dataSource = new MatTableDataSource<Element>(this.NodeList);
  selection = new SelectionModel<Element>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  citiesList = [
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Pune",
    "Mumbai",
    "Kerala",
    "Delhi"
  ];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _formBuilder: FormBuilder,
    public dialog: MatDialog, public snackBar: MatSnackBar, private common: CommonServService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      searchNode: ['', Validators.required]
    });
    this.geoBoundaryHeadForm = this._formBuilder.group({
      geoBoundaryHead: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      itemsDropped: this.itemsDropped,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      reasonCode: ['', Validators.required]
    });

  }


  isSelected(value) {
    this.NodeName = value;
    this.isSelectedNode = true;
  }
  onSubmitStep() {
    this.geoBoundaryHead = this.geoBoundaryHeadForm.value.geoBoundaryHead;
  }

  addDropItem(event) {
    this.itemsDropped.push(event);
  }

  releaseDrop(event) {

    let index = this.citiesList.indexOf(event);
    if (index >= 0) {
      this.citiesList.splice(index, 1);
    }
  }

  onChangeStartDate(value) {
    this.startDate = value;
  }
  onChangeEndDate(value) {
    this.endDate = value;
  }

  onSubmitThird() {
    if (this.itemsDropped.length > 0) {
    } else if (this.itemsDropped.length == 0) {
      alert('Drag and Drop the Countries List');
    }
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
    this.viewsss = inss;
  }
  explansionDetialRowCollection = new Array<any>();
  toggleDetailsRow(item) {
    this.expandRow = this.explansionDetialRowCollection.includes(item);

  }
  save() {
    var reason = this.thirdFormGroup.value.reasonCode;
    if(reason=='') {

    } else if(reason!='') {
      var msg = 'Submitted Successfully !!!';
      this.common.showToaster(msg)
    }
    
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

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: './snackbar-example.html',
  styles: [`.example-pizza-party { color: hotpink; }`],
})
export class PizzaPartyComponent { }