import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  routes: {
    path: string,
    icon: string,
    text: string
  }[] = [
    {
      path: '/',
      icon: 'home',
      text: 'Accueil'
    }, {
      path: '/history',
      icon: 'history',
      text: 'Historique'
    }, {
      path: '/settings',
      icon: 'toolbox',
      text: 'Paramètres'
    }
  ];

  ngOnInit(): void {
  }

}
