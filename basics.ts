import { Observable, Subscription } from 'rxjs';

export class BasicObservableTests {
  private basicStringObservable$ = new Observable<string>((subscriber) => {
    console.log('basicStringObservable$ executed');
    subscriber.next('Gary');
    setTimeout(() => subscriber.next("'souza"), 4000);
    setTimeout(() => subscriber.next("D 'souza"), 2000);
  });

  private observer1 = { next: (value: string) => console.log(value) };
  private subs1: Subscription;

  subscribeBasicObs() {
    this.subs1 = this.basicStringObservable$.subscribe(this.observer1);

    this.unsubscribeBasicObs();
  }

  private unsubscribeBasicObs() {
    setTimeout(() => {
      console.log('unsubscribed from basicStringObservable$ observable');
      this.subs1.unsubscribe();
    }, 3000);
  }
}
