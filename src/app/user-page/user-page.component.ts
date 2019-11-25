import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  UserDataService
} from '../services/user-data.service';
import {
  UserModel
} from '../models/user.model';
import {
  Subscription,
  SubscriptionLike
} from 'rxjs';
import {
  ActivatedRoute
} from '@angular/router';
import {
  PostModel
} from '../models/post.model';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(250, [animate('0.5s', style({ opacity: 1 }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class UserPageComponent implements OnInit, OnDestroy {
  userList: Array<UserModel>;
  userListSubscription: Subscription;
  postListSubscription: Subscription;
  currentUserId: number;
  postList: Array<PostModel>;
  constructor(
    private getDataService: UserDataService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userList = [];
    this.postList = [];
    // tslint:disable-next-line: radix
    this.currentUserId = parseInt(
      this.activateRoute.snapshot.paramMap.get('id')
    );
    this.getDataService.getAllPostsForUser(this.currentUserId).then(data => {
      if (data.length) {
        this.postList = data;
        console.log(this.postList);
      } else {
        this.postList = [];
      }
    });
    this.userListSubscription = this.getDataService.userDataObs.subscribe(
      users => {
        if (users.length) {
          this.userList = users.slice();
        } else {
          this.userList = [];
          this.currentUserId = -1;
        }
      }
    );
  }

  get userName() {
    const x = this.userList.find(ele => {
      return ele.id === this.currentUserId;
    });

    return x ? x.name : 'User';
  }

  ngOnDestroy() {
    // this.postListSubscription.unsubscribe();
    this.userListSubscription.unsubscribe();
  }
}
