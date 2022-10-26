let instance;

const logLevels = ['error', 'warn', 'info', 'log', 'debug'];

class Logger {
  constructor(transports = []) {
    if(!instance) {
      this.transports = transports;
      instance = this;
    }
    return instance;
  }

  init({config, namespace, options}) {
    try {
      this.env = config.env;
      this.logLevel = config.logLevel;
      this.namespace = namespace;
      if(this.env !== 'dev') {
        this.initYourChoiceOfLogger({env: this.env, options});
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  initYourChoiceOfLogger({env, options}) {
    this.transports.push(new TheLoggerofYourChoice({env, options}));
  }

  shouldLog(method) {
    const appLogLevel = logLevels.findIndex((f) => f === this.logLevel);
    const methodLogLevel = logLevels.findIndex((f) => f === method);
    return methodLogLevel <= appLogLevel;
  }

  send(method, ...args) {
    try {
      if(this.shouldLog(method)) {
        this.transports.forEach((t) => {
          t[method](...args);
        })
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  log(...args) {
    return this.send('log', ...args);
  }

  error(...args) {
    return this.send('error', ...args);
  }

  warn(...args) {
    return this.send('warn', ...args);
  }

  info(...args) {
    return this.send('info', ...args);
  }

  debug(...args) {
    return this.send('debug', ...args);
  }
}

const transports = [console];
export default new Logger(transports);