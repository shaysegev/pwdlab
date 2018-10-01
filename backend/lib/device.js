const geoip = require('geoip-lite');
const useragent = require('useragent');
const cryptLib = require('../lib/crypt');
const logger = require('../logger');

/**
 * @const {int} The number of device mismatches allowed 
 * before we consider the device as new/suspicious device
 */
const DEVICE_MISMATCH_LIMIT = 2;

/**
 * Gets user device info (useragent/IP address)
 * 
 * @param {object} request API request
 * @return {object} user device
 */
const getUserDevice = (request) => {
  const agent = useragent.parse(request.headers['user-agent']);
  const ip = request.headers['x-forwarded-for'];

  let device = {
    browser: {
      name: agent.family,
      version: agent.major,
    },
    os: {
      name: agent.os.family,
      version: agent.os.major,
    },
    ip,
    geo: null,
  }

  const geo = geoip.lookup(ip);
  device.geo = {
    country: geo ? geo.country : null,
    city: geo ? geo.city : null,
  }

  return device;
}

/**
 * Compare user's logged in device with the devices added in previous sessions
 * 
 * @param {object} currentDevice The device the user has logged in from
 * @param {array} userDevices Previous user's session devices
 * @return {bool} Whether the device is recognised
 */
const compareWithPreviousDevices = (currentDevice, userDevices) => {
  let unknownDevice = false;

    for (let device of userDevices) {
      if (unknownDevice) {
        // New device registered
        return true;
      }

      try {
        prevDevice = JSON.parse(cryptLib.publicDecrypt(device));
      } catch (e) {
        logger.error(e);
        continue;
      }

      let deviceMismatches = 0;

      if (!sameIP(currentDevice, prevDevice)) {
        deviceMismatches++;
      }

      if (!sameBrowser(currentDevice, prevDevice)) {
        deviceMismatches++;
      }

      if (!sameOS(currentDevice, prevDevice)) {
        deviceMismatches++;
      }
  
      if (!sameGeoLocation(currentDevice, prevDevice)) {
        deviceMismatches++;
      }

      // Do we have any major difference between any of the previous login devices?
      if (deviceMismatches >= DEVICE_MISMATCH_LIMIT) {
        // Unknown device spotted
        unknownDevice = true;
      }
    }

    return unknownDevice;
}

/**
 * Compares devices IP address
 * 
 * @param {object} currentDevice Current device
 * @param {object} prevDevice Previous device
 * @return {bool} IP is identical
 */
const sameIP = (currentDevice, prevDevice) => {
  return currentDevice.ip === prevDevice.ip
}

/**
 * Compares devices browser history
 * 
 * @param {object} currentDevice Current device
 * @param {object} prevDevice Previous device
 * @return {bool} Browser is identical
 */
const sameBrowser = (currentDevice, prevDevice) => {
  return (
    currentDevice.browser.name === prevDevice.browser.name &&
    currentDevice.browser.version === prevDevice.browser.version
  );
}

/**
 * Compares devices OS history
 * 
 * @param {object} currentDevice Current device
 * @param {object} prevDevice Previous device
 * @return {bool} Operation system is identical
 */
const sameOS = (currentDevice, prevDevice) => {
  return (
    currentDevice.os.name === prevDevice.os.name &&
    currentDevice.os.version === prevDevice.os.version
  );
}

/**
 * Compares devices Geolocation history
 * 
 * @param {object} currentDevice Current device
 * @param {object} prevDevice Previous device
 * @return {bool} Geolocation is identical
 */
const sameGeoLocation = (currentDevice, prevDevice) => {
  return (
    currentDevice.geo.country === prevDevice.geo.country &&
    currentDevice.geo.city === prevDevice.geo.city
  );
}

module.exports = {
  getUserDevice,
  compareWithPreviousDevices,
}