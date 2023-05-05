import {
  concatMap,
  exhaustMap,
  mergeMap,
  Observable,
  of,
  switchMap,
  EMPTY,
  catchError,
  map,
  from,
} from 'rxjs';
 
export default class FlatteningOperators {
  private source$ = new Observable((subscriber) => {
    setTimeout(() => subscriber.next('A'), 1000);
    setTimeout(() => subscriber.next('B'), 2000);
    // setTimeout(() => subscriber.error('error in source$'), 1100);
    setTimeout(() => subscriber.complete(), 2100);
  });

  execute() {
    console.log('FlatteningOperators App has started');

    this.source$
      .pipe(
        concatMap((v) => {
          console.log('inside contactMap1', { v });
          return new Observable((subscriber) =>
            subscriber.error('error in contactMap 1')
          ).pipe(
            map((v) => v),
            catchError(() => {
              return from(
                new Promise((resolve, reject) =>
                  setTimeout(() => resolve('error handled in contactMap'), 3000)
                )
              );
            })
          );
        }),
        concatMap((v) => {
          console.log('inside concatMap2', { v });
          return of(1, 2);
        })
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log('contactMap', err),
        complete: () => console.log('Completed concatMap tests'),
      });

    this.source$
      .pipe(
        exhaustMap((v) => {
          console.log('inside exhaustMap 1', { v });
          return new Observable((subscriber) =>
            subscriber.error('error in exhaustMap 1')
          ).pipe(
            map((v) => v),
            catchError(() => {
              return from(
                new Promise((resolve, reject) =>
                  setTimeout(
                    () => resolve('error handled in exhaustMap 1'),
                    3000
                  )
                )
              );
            })
          );
        }),
        exhaustMap((v) => {
          console.log('inside exhaustMap 2', { v });
          return of(3, 4);
        })
      )
      .subscribe({
        next: (value) => console.log(value),
        error: (err) => console.log('exhaustMap', err),
        complete: () => console.log('Completed exhaustMap tests'),
      });

    // this.source$.pipe(exhaustMap((v) => of(3, 4))).subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.log('exhaustMap', err),
    //   complete: () => console.log('Completed exhaustMap tests'),
    // });

    // this.source$.pipe(switchMap((v) => of(5, 6))).subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.log('switchMap', err),
    //   complete: () => console.log('Completed switchMap tests'),
    // });

    // this.source$.pipe(mergeMap((v) => of(7, 8))).subscribe({
    //   next: (value) => console.log(value),
    //   error: (err) => console.log('mergeMap', err),
    //   complete: () => console.log('Completed mergeMap tests'),
    // });
  }
}
