import { Component, OnInit } from '@angular/core';
import { TimerServiceService } from './../timer-service.service';

@Component({
  selector: 'app-view-entries',
  templateUrl: './view-entries.component.html',
  styleUrls: ['./view-entries.component.scss', '../timer-page/timer-page.component.scss', '../timer/timer.component.scss']
})
export class ViewEntriesComponent implements OnInit {

  entries: { startTime: Date, endTime: Date, length: number, prettyLength: string, day: any, prettyDate: any }[] = [];

  constructor(private timerService:TimerServiceService) { }

  ngOnInit() {
    this.getWorkbook();

  }

  getWorkbook() {
    this.timerService.fetchWorkbook().subscribe(result => {
      console.log(result)
      result.forEach((entry, i) => {
        const date = new Date(entry.endTime)
        entry.day = date.getDay();
        console.log(entry)
        if ((result[i-1] && result[i].day !== result[i-1].day) || i===0) {
          entry.prettyDate = date.toLocaleDateString()
        }
      })
      this.entries = result
      console.log(this.entries)
    })
  }

  trackByFn(index: number, item: any) {
    return index
  }
}
