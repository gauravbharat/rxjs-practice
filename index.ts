import './style.css';

import { of, map } from 'rxjs';
import { BasicObservableTests } from './basics';
// import { basicStringObservable$ } from './basics';

of('World')
  .pipe(map((name) => `Hello, ${name}!`))
  .subscribe(console.log);

// Open the console in the bottom right to see results.

const basicTest = new BasicObservableTests();
basicTest.subscribeBasicObs();
