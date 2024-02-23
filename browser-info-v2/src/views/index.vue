
<script setup>
import { reactive, ref } from "vue"



const getPluginInfo = () => {
  var plugins = [];
  for (var i = 0; i < navigator.plugins.length; i++) {
    plugins.push(navigator.plugins[i].name);
  }
  return plugins;
}


const getWebGLInfo = () => {
  var canvas = document.createElement('canvas');
  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  var info = {};
  if (gl) {
    info.vendor = gl.getParameter(gl.VENDOR);
    info.renderer = gl.getParameter(gl.RENDERER);
  }
  return info;
}

// Bağlantı türünü al
const getConnectionType = () => {
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection) {
    return connection.type;
  } else {
    return "N/A";
  }
}
const getMediaDevices = () => {
  var devices = [];
  if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    navigator.mediaDevices.enumerateDevices()
      .then(function (deviceInfos) {
        deviceInfos.forEach(function (deviceInfo) {
          devices.push({
            kind: deviceInfo.kind,
            label: deviceInfo.label,
            deviceId: deviceInfo.deviceId
          });
        });
      })
      .catch(function (err) {
        console.log('MediaDevices error: ' + err);
      });
  }
  return devices;
}


const getBatteryInfo =() => {
    var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
    if (battery) {
        return {
            Level: battery.level * 100 + "%",
            Charging: battery.charging ? "Yes" : "No"
        };
    } else {
        return "N/A";
    }
}

const info = reactive({
  BrowserName: window.navigator.appName,
  BrowserVersion: window.navigator.appVersion,
  Platform: window.navigator.platform,
  UserLanguage: window.navigator.language,
  JavaEnabled: window.navigator.javaEnabled() ? "Yes" : "No",
  CookiesEnabled: navigator.cookieEnabled ? "Yes" : "No",
  ScreenHeight: window.screen.height,
  ScreenWidth: window.screen.width,
  ScreenColorDepth: window.screen.colorDepth,
  URL: window.location.href,
  UserAgent: window.navigator.userAgent,
  Vendor: window.navigator.vendor,
  Product: window.navigator.product,
  BuildID: window.navigator.buildID,
  HardwareConcurrency: window.navigator.hardwareConcurrency,
  DoNotTrack: window.navigator.doNotTrack || "N/A",
  Plugins: getPluginInfo(),
  WebGLVendor: getWebGLInfo().vendor,
  WebGLRenderer: getWebGLInfo().renderer,
  ConnectionType: getConnectionType(),
  LanguageList: window.navigator.languages,
  TimeZone: new Date().getTimezoneOffset() / -60,
  ScreenOrientation: window.screen.orientation.type,
  TouchPoints: navigator.maxTouchPoints || 0,
  MediaDevices: getMediaDevices(),
    Battery: getBatteryInfo() // Pil bilgisi
});
const win = ref('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-windows" viewBox="0 0 16 16"> <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 13.795l6.555.933V8.313H0v5.482zm7.278-5.4.026 6.378L16 16V8.395H7.278zM16 0 7.33 1.244v6.414H16V0z"/> </svg>')
const mac = ref('<svg xmlns="http://www.w3.org/2000/svg" width="0.82em" height="1em" viewBox="0 0 256 315"><path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262"/></svg>')

console.log(info);


console.log(window)

</script>
<template>
  <div class="body">
    <Card style="width: 65rem; overflow: hidden">
      <template #header>

      </template>
      <template #title>
        <div class="flex justify-content-between"><strong>BROWSER INFO</strong>
          <div v-html="info?.Platform == 'Win32' ? win : mac"></div>
        </div>
      </template>
      <template #subtitle><strong>Browser Name: </strong>{{ info?.BrowserName }} </template>
      <template #content>
        <div class="grid">
          <div class="col-12">
            <Tag severity="info" rounded>Browser Version:</Tag> {{ info?.BrowserVersion }}
          </div>
          <div class="col-12">
            <Tag severity="info" rounded>User Agent:</Tag> {{ info?.UserAgent }}
          </div>

          <div class="col-3">
            <Tag severity="info" rounded>User Language:</Tag> {{ info?.UserLanguage }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Java Enabled:</Tag> {{ info?.JavaEnabled }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Cookies Enabled:</Tag> {{ info?.CookiesEnabled }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Screen:</Tag> {{ info?.ScreenWidth }}X{{ info?.ScreenHeight }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Color Depth:</Tag> {{ info?.ScreenColorDepth }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Do Not Track:</Tag> {{ info?.DoNotTrack }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Product:</Tag> {{ info?.Product }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Vendor:</Tag> {{ info?.Vendor }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Hardware Concurrency:</Tag> {{ info?.HardwareConcurrency }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Build ID:</Tag> {{ info?.BuildID }}
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Time Zone:</Tag> GMT+0{{ info?.TimeZone }}:00
          </div>
          <div class="col-3">
            <Tag severity="info" rounded>Touch Points:</Tag> {{ info?.TouchPoints }}
          </div>
          <!-- <div class="col-3">
            <Tag severity="info" rounded>Screen Orientation:</Tag> {{ info?.ScreenOrientation }}
          </div> -->
          <div class="col-4">
            <Tag severity="info" rounded>URL:</Tag> {{ info?.URL }}
          </div>
          <div class="col-4">
            <Tag severity="info" rounded>WebGL Vendor:</Tag> {{ info?.WebGLVendor }}
          </div>
          <div class="col-4">
            <Tag severity="info" rounded>WebGL Renderer:</Tag> {{ info?.WebGLRenderer }}
          </div>


        </div>


      </template>
      <template #footer>

      </template>
    </Card>
  </div>
</template>

<style></style>
