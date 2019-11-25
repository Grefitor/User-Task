import {
  Component,
  OnInit,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import {
  UserDataService
} from '../services/user-data.service';
import {
  UserModel
} from '../models/user.model';
import {
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  map,
  startWith
} from 'rxjs/operators';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit, OnDestroy {
  userList: Array < UserModel > ;
  searchForm: FormGroup;
  filteredOptions: Observable < UserModel[] > ;
  subscription: Subscription;
  constructor(
    private getDataService: UserDataService,
    private form: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.userList = [];
    this.searchForm = this.form.group({
      search: new FormControl('')
    });
  }
  ngOnInit() {
    this.getDataService.getAllUsersData();

    this.subscription = this.getDataService.userDataObs.subscribe(users => {
      if (users) {
        this.userList = users.slice();
      } else {
        this.userList = [];
      }
    });

    this.filteredOptions = this.searchForm.get('search').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): UserModel[] {
    const filterValue = value.toLowerCase();

    return this.userList.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  optionClicked(option: UserModel) {
    console.log(option);
    this.router.navigate(['user', option.id]).then(_ => {
      this.searchForm.reset();
    });
  }

  enterClicked(event) {
    if (event) {
      const x = this._filter(event);
      if (x.length === 1) {
        this.optionClicked(x[0]);
      } else {
        return;
      }
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
