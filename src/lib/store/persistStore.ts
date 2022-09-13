import { Writable, Subscriber, Invalidator } from "svelte";

export class PersistStore<T extends any> implements Writable<T> {
	value: T;
	itemName: string;
	subscribers = new Set<Subscriber<T>>();
	serializer: (v: T) => string;

	constructor(opts: {
		itemName: string;
		value: T;
		serializer(v: T): string | undefined;
	}) {
		this.itemName = opts.itemName;
		this.value = opts.value;
		this.serializer = opts.serializer;
	}

	save() {
		const str = (this.serializer = window.localStorage.setItem());
	}

	set(value: T) {
		this.value = value;
	}

	subscribe(subscriber: Subscriber<T>, invalidate?: Invalidator<T>) {
		this.subscribers.add(subscriber);
		return () => this.subscribers.remove(subscriber);
	}
}
