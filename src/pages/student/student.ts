import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import {AuthService} from '../../services/auth';
import {PlanPage} from '../plan/plan'

/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {

  students = [];
  name = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthService) {
  const userId = this.auth.getAuthenticatedUser().uid;
  firebase.database().ref('/' + userId).once('value').then((snapshot)=>{
     this.name = snapshot.val().userbasic.fname;
  })
  firebase.database().ref('/coaches/'+this.name).once('value').then((snapshot)=>{
    const a = snapshot.val();
    var b;
    Object.keys(a).map((key)=>{
       console.log(key);
       b = a[key];
    }); 
    console.log(b);
    if(b.first!=="stu1"){
    this.students.push(b.first);
    }
    if(b.second!=="stu2"){
    this.students.push(b.second);
    }
    if(b.third!=="stu3"){
    this.students.push(b.third);
    }
    //console.log(this.coaches);
  })


}
viewPlan(item){
  console.log(item);
  this.navCtrl.push(PlanPage,item)
}
}
