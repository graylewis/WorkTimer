import { Component, OnInit } from '@angular/core';
import { TimerServiceService } from './../timer-service.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements OnInit {

  ticker: any;
  timeElapsed: number = 0;
  startTime: Date | undefined;
  running: boolean = false;
  entries: { startTime: Date, endTime: Date, length: number, prettyLength: string }[] = [];
  uploadedEntries: { length: number, prettyLength: string }[] = [];

  constructor(private timerService:TimerServiceService) { }

  formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);
    return [
      h,
      m > 9 ? m : (h ? '0' + m : m || '0'),
      s > 9 ? s : '0' + s
    ].filter(Boolean).join(':');
  }

  updateTime = () => {
    let currentDate = new Date();
    if (this.startTime) {
      this.timeElapsed = Math.round((+currentDate - +this.startTime) / 1000);
    }
  }

  startTimer() {
    this.ticker = setInterval(this.updateTime, 1000);
    this.running = true;
  }

  onClickPlus() {
    this.startTime = new Date();
    this.startTimer();
  }

  onClickStop() {
    if (this.startTime) {
      const currentTime = new Date();
      this.entries.push({
        startTime: this.startTime,
        endTime: currentTime,
        length: this.timeElapsed,
        prettyLength: this.formatTime(this.timeElapsed)
      })
      this.timeElapsed = 0;
      this.running = false;
      clearInterval(this.ticker)

      this.saveEntries();
    }
  }

  saveEntries() {
      this.timerService.saveEntries(this.entries).subscribe(result => {
        console.log(`RESULT: ${result}`)
        if(result) {
          console.log('updated entries')
          this.uploadedEntries = this.uploadedEntries.concat(this.entries.map((val) => { return { length: val.length, prettyLength: val.prettyLength }}))
          this.entries = [];
        } else {
          console.log(result);
        }
      })
  }

  trackByFn(index: number, item: any) {
    return index
  }

  ngOnInit(): void {
  }

}
