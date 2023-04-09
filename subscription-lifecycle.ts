import { Observable, Subscriber, Subscription } from 'rxjs';

export class SubscriptionLifecycle {
  private observable$ = new Observable<string>((s: Subscriber<string>) => {
    // synchronous emissions
    s.next('* Apple');
    s.next('* Beetroot');

    // asynchronous emissions
    setTimeout(() => {
      s.next('* Cinnamon Bun');
      // s.complete();
    }, 2000);

    setTimeout(() => {
      s.error(new Error('Failure'));
    }, 1000);

    // THERE SHOULD BE NO MORE EMISSIONS AFTER COMPLETE() OR ERROR() METHOD CALLS

    // TEARDOWN
    return () => {
      // clean-up and cancellation of any http calls
      console.log('TEARDOWN LOGIC');
    };
  });

  private intervalObservable$ = new Observable((subscriber) => {
    let counter = 1;
    const intervalId = setInterval(() => {
      console.log('intervalObservable about to emit', counter);
      subscriber.next(counter++);
    }, 1000);

    return () => {
      console.log('intervalObservable teardown');
      clearInterval(intervalId);
    };
  });

  private subscription!: Subscription;
  private subs2!: Subscription;

  subscribe() {
    console.group('SubscriptionLifecycle');
    console.log('subscribed observable$');

    this.subscription = this.observable$.subscribe({
      next: (value) => console.log(value),
      error: (err) => console.error(err.message),
      complete: () => console.log('completed'),
    });

    console.log('about to unsubscribe observable$');

    setTimeout(() => {
      this.unsubscribe();
      console.log('unsubscribed observable$');
    }, 0);

    console.log('subscribed intervalObservable$');
    this.subs2 = this.intervalObservable$.subscribe({
      next: (cntr) => console.log('interval', cntr),
      complete: () => console.log('interval obs completed'),
    });

    setTimeout(() => {
      this.subs2.unsubscribe();
      console.log('unsubscribed intervalObservable$');
      console.groupEnd();
    }, 7000);
  }

  private unsubscribe() {
    this.subscription.unsubscribe();
  }
}
