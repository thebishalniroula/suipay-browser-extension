import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  // Defines icons used in the extension across different contexts and sizes (browser toolbar, Chrome Web Store, etc.).
  icons: {
    16: 'img/logo.png',
    32: 'img/logo.png',
    48: 'img/logo.png',
    128: 'img/logo.png',
  },

  // Defines the extension's browser action (i.e., the popup that appears when you click the extension icon).
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo.png',
  },

  // Specifies the page to be shown in Chrome’s extension settings ("Options" link).
  // options_page: 'options.html',
  // Registers a custom panel inside Chrome DevTools for your extension.
  devtools_page: 'devtools.html',

  // Defines a background service worker that runs persistently or on-demand, handling things like alarms, events, or long-running tasks.
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },

  // Injects scripts into webpages matching the listed URLs.
  // This script runs in the context of the visited page (not the extension).
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],

  // Registers a side panel (a new Chrome feature) to show custom content in the browser’s side panel.
  // side_panel: {
  //   default_path: 'sidepanel.html',
  // },

  // Makes resources like images, scripts, or styles accessible to web pages via a public URL. Without this, web pages can't access your extension’s internal files.
  web_accessible_resources: [
    {
      resources: ['img/logo.png'],
      matches: [],
    },
  ],

  // Specifies the permissions your extension needs:
  // permissions: ['sidePanel', 'storage'],
  permissions: ['storage'],
  // chrome_url_overrides: {
  //   newtab: 'newtab.html',
  // },
})
