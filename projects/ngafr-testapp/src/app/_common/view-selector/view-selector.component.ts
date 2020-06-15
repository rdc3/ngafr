import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngafr-demo-view-selector',
  templateUrl: './view-selector.component.html',
  styleUrls: []
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
