import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {

  @Input () parentData: string='';

  @Output () childTitle:EventEmitter<string> = new EventEmitter<string>();
  
  setChildData(){
    this.childTitle.emit('root');
  }

  ngOninit(){
    // this.setChild();
  }
}
