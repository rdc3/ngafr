import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: ['./view-selector.component.scss']
})
export class ViewSelectorComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  navigateTo(id) {
   this.router.navigate([id], {relativeTo: this.route.children[0]});
  }
}
