import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-playing-card',
  templateUrl: './playing-card.component.html',
  styleUrls: ['./playing-card.component.css']
})
export class PlayingCardComponent implements OnInit {
  @Input() rank: string;
  @Input() suit: string;
  @Input() showFace: boolean = false;

  constructor() {}
  ngOnInit() {}
}
