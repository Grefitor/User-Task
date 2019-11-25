import {
  Injectable
} from '@angular/core';
import {
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import {
  UserModel
} from 'src/app/models/user.model';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import {
  PostModel
} from '../models/post.model';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: Array < UserModel > ;
  private userDataBs: BehaviorSubject < Array < UserModel >> ;
  userDataObs: Observable < Array < UserModel >> ;

  private postData: Array < PostModel > ;
  private postDataBs: BehaviorSubject < Array < PostModel >> ;
  postDataObs: Observable < Array < PostModel >> ;
  constructor(private http: HttpClient) {
    this.userData = [];
    this.userDataBs = new BehaviorSubject(this.userData);
    this.userDataObs = this.userDataBs.asObservable();

    this.postData = [];
    this.postDataBs = new BehaviorSubject(this.postData);
    this.postDataObs = this.postDataBs.asObservable();
  }

  getAllUsersData(): Promise < any > {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://jsonplaceholder.typicode.com/users')
        .toPromise()
        .then(data => {
          if (data) {
            // console.log(res);
            this.userData = data as Array < UserModel > ;
            this.userDataBs.next(this.userData);
            resolve(true);
          } else {
            this.userData = [];
            this.userDataBs.next([]);
            resolve(false);
          }
        });
    });
  }

  getAllPostsForUser(id): Promise < any > {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            userId: id
          }
        })
        .toPromise()
        .then(data => {
          if (data) {
            // console.log(res);
            this.postData = data as Array < PostModel > ;
            this.postDataBs.next(this.postData);
            resolve(this.postData);
          } else {
            this.postData = [];
            this.postDataBs.next([]);
            resolve(false);
          }
        });
    });
  }
}
