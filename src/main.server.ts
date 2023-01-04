const MockBrowser = require('mock-browser').mocks.MockBrowser;
const mock = new MockBrowser();

global['document'] = mock.getDocument();
global['window'] = mock.getWindow();

(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

global['navigator'] = mock.getNavigator();
export { AppServerModule } from './app/app.server.module';

