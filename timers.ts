import { Subscription, timer } from 'rxjs';

export class TimerObservables {
  private subs1: Subscription;

  startTimer(endDate: Date) {
    console.log('TimerObservables : startTimer : endDate', endDate);

    this.subs1 = timer(0, 1000)
      .pipe()
      .subscribe({
        next: (nextVal) => {
          console.log('TimerObservables sub nextVal', nextVal);
        },
        complete: () => {
          console.log('TimerObservables sub complete');
        },
      });
  }

  unsubscribeObs() {
    setTimeout(() => {
      console.log('unsubscribed from TimerObservables');
      this.subs1.unsubscribe();
    }, 10000);
  }
}
