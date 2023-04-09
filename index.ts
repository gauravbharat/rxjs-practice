import './style.css';

import { of, map } from 'rxjs';
import { BasicObservableTests } from './basics';
import { SubscriptionLifecycle } from './subscription-lifecycle';
import { ColdObservable, HotObservable } from './cold-vs-hot-observables';
// import { basicStringObservable$ } from './basics';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

// const basicTest = new BasicObservableTests();
// basicTest.subscribeBasicObs();

// const lifecycleTest = new SubscriptionLifecycle();
// lifecycleTest.subscribe();
// new ColdObservable().execute();
new HotObservable().execute();
