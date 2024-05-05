class CyEvents<E> {
    private readonly listeners: Record<string, Set<Function>> = {};
  
    readonly allEventFormat;
  
    constructor(events?:E) {
      if (events) {
        this.allEventFormat = events
      }
    }
  
    on(event: string, listener: Function) {
      if (!this.listeners[event]) {
        this.listeners[event] = new Set();
      } else if (this.listeners[event].has(listener)) {
        console.error('listener already exists');
        return;
      }
      this.listeners[event].add(listener);
    }
  
    off(event: string, listener: Function) {
      if (this.listeners[event]) {
        this.listeners[event].delete(listener);
      }
    }
  
    emit(event: string, ...args: any[]) {
      if (this.listeners[event]) {
        this.listeners[event].forEach((listener) => {
          listener(...args);
        });
      }
    }
  
    get allListenersEvents() {
      return this.listeners
    }
  
  
}


const eventInstance = new CyEvents();

export default eventInstance;