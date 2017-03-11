import {BehaviorSubject, Subject} from "rxjs";

interface Action {
	type: string,
	payload?: any
}
interface Reducer<T> {
	(state: T, action: Action): T;
}
interface ListenerCallback {        //subscribe
	(): void;
}
interface Unsubscribe {
	(): void;
}

class Store<T> extends BehaviorSubject<T> {
	//private _state: T;
	//private _listeners: ListenerCallback[] = [];
	private _dispatcher: Subject <Action>;
	constructor(
		private reducer: Reducer<T>,
		initialState: T
	){
		super(initialState);
		//this._state = initialState;
		this._dispatcher = new Subject<Action>();
		this._dispatcher
			.scan(
				(state: T, action: Action) => this.reducer(state, action),
				initialState
			)
			.subscribe( (state) => super.next(state) )
		;
	}
	
	getState():T {
		//return this._state;
		return this.value;
	}
	
	dispatch(action: Action): void {
		//this._state = this.reducer(this._state, action);
		//this._listeners.forEach( (listener: ListenerCallback) => listener() );
		this._dispatcher.next(action);
	}
	/* is now part of the BehaviourSubject
	subscribe(listener: ListenerCallback) {
		this._listeners.push(listener);
		// The return value is a function which will update the list of _listeners
		// to be the list of _listeners without the listener we just added. That is, it returns
		// the UnsubscribeCallback that we can use to remove this listener from the list.
		return () => {
			this._listeners = this._listeners.filter( l => l !== listener );
		};
	}
	*/
}

// from here on ther is no difference whether Observables are used or not

let incrementAction: Action = {type: 'INCREMENT'};
let decrementAction: Action = {type: 'DECREMENT'};

let reducer: Reducer<number> = (state: number, action: Action) => {
	switch (action.type) {
		case 'INCREMENT': return state + 1;
		case 'DECREMENT': return state - 1;
		case 'PLUS': return state + action.payload;
		default: return state;
	}
};

console.log( reducer(0, incrementAction));
console.log( reducer(1, incrementAction));
console.log( reducer(100, decrementAction));

let unknownAction: Action = {type: 'UNKNOWN'};
console.log(reducer(100, unknownAction));

let plusSevenAction: Action = {type: 'PLUS', payload: 7};
console.log(reducer(100, plusSevenAction));
console.log(reducer(12, {type: 'PLUS', payload:1200}));

let store = new Store<number>(reducer, 0);

console.log(store.getState());
store.dispatch(incrementAction);
console.log(store.getState());
store.dispatch(incrementAction);
console.log(store.getState());
store.dispatch(decrementAction);
console.log(store.getState());

// subcribe
let unsubscribe = store.subscribe( () => {
	console.log('subscribed: ', store.getState());
});
store.dispatch(incrementAction);
store.dispatch(incrementAction);
//unsubscribe();
store.unsubscribe();
console.log('unsubscribed');
console.log('--> store fails spectacularly when accessed after being unsubscribed');
console.log('want to see?');
store.dispatch(incrementAction);
//console.log('getState() has to be requestet after being unsubscribd ',store.getState());
