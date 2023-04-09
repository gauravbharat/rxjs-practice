import { Observable, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';

export class ColdObservable {
  // Cold observable
  // - 'all values are emitted/produced independently for EACH subscription'
  //  - new HTTP request for each subscription

  private ajax$ = ajax<any>(`https://random-data-api.com/api/v2/appliances`);

  execute() {
    this.ajax$.subscribe({
      next: (data) => console.log('Sub 1: ', data.response.equipment),
      error: (err) => console.error('Sub 1', err.message),
      complete: () => console.info('ajax$ sub 1 completed'),
    });

    this.ajax$.subscribe({
      next: (data) => console.log('Sub 2: ', data.response.equipment),
      error: (err) => console.error('Sub 2', err.message),
      complete: () => console.info('ajax$ sub 2 completed'),
    });

    this.ajax$.subscribe({
      next: (data) => console.log('Sub 3: ', data.response.equipment),
      error: (err) => console.error('Sub 3', err.message),
      complete: () => console.info('ajax$ sub 3 completed'),
    });
  }
}

export class HotObservable {
  // Hot observable
  // - all subscriptions share the SAME source
  // - DOM events e.g. mouse or keyboard event

  private clickBtn = document.querySelector('button#hotObsClick');
  private unsubBtn = document.querySelector('button#hotObsUnsub');

  private click$ = new Observable<MouseEvent>((subscriber) => {
    const nextFunc = (e: MouseEvent) => {
      subscriber.next(e);
    };
    this.clickBtn.addEventListener('click', nextFunc);

    return () => {
      console.log('HotObservable : click$ teardown');
      this.clickBtn.removeEventListener('click', nextFunc);
    };
  });

  private subs!: Subscription;
  private subs2!: Subscription;

  execute() {
    // console.log('HotObservable : document', this.clickBtn, this.unsubBtn);
    this.unsubBtn.addEventListener('click', this.unsubscribe);

    this.subs = this.click$.subscribe((event) =>
      console.log('Sub 1: ', event.type, event.x, event.y)
    );

    setTimeout(() => {
      this.subs2 = this.click$.subscribe((event) =>
        console.log('Sub 2: ', event.type, event.x, event.y)
      );
    }, 3000);
  }

  private unsubscribe() {
    console.log('HotObservable : unsubscribed all subs');
    this.subs?.unsubscribe();
    this.subs2?.unsubscribe();
  }

  destructor() {
    console.log('HotObservable : destructor : remove unsubBtn listener');
    this.unsubBtn.removeEventListener('click', this.unsubscribe);
    this.unsubscribe();
  }
}
