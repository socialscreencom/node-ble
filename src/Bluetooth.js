const {BLUEZ_SERVICE} = require('./bluez')
const {BusHelper} = require('./BusHelper')
const {Adapter} = require('./Adapter')

class Bluetooth {
  constructor(dbus) {
    this.dbus = dbus
    this.helper = new BusHelper(dbus, BLUEZ_SERVICE, '/org/bluez', 'org.bluez.AgentManager1', {useProps: false})
  }

  async adapters() {
    return await this.helper.children()
  }

  async defaultAdapter() {
    const adapters = await this.adapters()
    if (!adapters.length) {
      throw new Error('No available adapters found')
    }

    return await this.getAdapter(adapters[0])
  }

  async getAdapter(adapter) {
    const adapters = await this.adapters()
    if (!adapters.includes(adapter)) {
      throw new Error('Adapter not found')
    }

    return new Adapter(this.dbus, adapter)
  }
}

module.exports.Bluetooth = Bluetooth


