import './style.css';

import {
  of,
  map,
  delay,
  tap,
  exhaustMap,
  switchMap,
  interval,
  take,
  Observable,
  repeatWhen,
  skipWhile,
  repeat,
} from 'rxjs';
import { BasicObservableTests } from './basics';
import { SubscriptionLifecycle } from './subscription-lifecycle';
import { ColdObservable, HotObservable } from './cold-vs-hot-observables';
import FlatteningOperators from './flattening-operators';
// import { basicStringObservable$ } from './basics';

// of('World')
//   .pipe(map((name) => `Hello, ${name}!`))
//   .subscribe(console.log);

// Open the console in the bottom right to see results.

// const basicTest = new BasicObservableTests();
// basicTest.subscribeBasicObs();

// const lifecycleTest = new SubscriptionLifecycle();
// lifecycleTest.subscribe();
// new ColdObservable().execute();
// new HotObservable().execute();

// const flatteningOperators = new FlatteningOperators();
// flatteningOperators.execute();

const activationStatusObs$ = new Observable((subscriber) => {
  setTimeout(() => subscriber.next('pending'), 1000);
  setTimeout(() => subscriber.next('pending'), 3000);
  setTimeout(() => subscriber.next('pending'), 5000);
  // setTimeout(() => subscriber.next('expired'), 7000);
  setTimeout(() => subscriber.next('pending'), 8000);
  setTimeout(() => subscriber.next('resolved'), 9000);
});

of('get upload url')
  .pipe(
    delay(2000),
    tap((res) => console.log(res)),
    exhaustMap(() =>
      of('content variation activation').pipe(
        switchMap(() =>
          activationStatusObs$.pipe(
            tap((x) => console.log(x)),
            map((x) => {
              if (x === 'expired') {
                throw new Error(
                  'Something went wrong!.Please try again after sometime'
                );
              }

              return x;
            }),
            repeat({ delay: 1000 }),
            skipWhile((x) => x === 'pending'),
            take(1)
          )
        ),
        take(1)
      )
    )
  )
  .subscribe({
    next: (res) => {
      console.log('next', res);
    },
    error: (error) => {
      console.log('error', error);
    },
    complete: () => {
      console.log('complete');
    },
  });

// exhaustMap(() => {
//   return this.participationService
//     .contentVariationActivation(
//       this.containerDetail.data.id,
//       <string>token
//     )
//     .pipe(
//       switchMap(() => {
//         return this.participationService
//           .contentVariationActivationStatus(
//             this.containerDetail.data.id,
//             token!
//           )
//           .pipe(
//             map(res => {
//               if (res.data.at(-1).status === 'expired') {
//                 throw new Error(
//                   'Something went wrong!.Please try again after sometime'
//                 );
//               }
//               return res;
//             }),
//             repeatWhen(delay(1000)),
//             skipWhile(
//               response =>
//                 response.data.at(-1).status === 'pending'
//             ),
//             take(1)
//           );
//       }),
//       take(1)
//     );
// }),
