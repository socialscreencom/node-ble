import events = require('events');

declare namespace NodeBle {
    interface GattCharacteristic extends events.EventEmitter {
        getUUID(): Promise<string>;
        getFlags(): Promise<string[]>;
        isNotifying(): Promise<boolean>;
        readValue(offset?: number): Promise<Buffer>;
        writeValue(buffer: Buffer, optionsOrOffset?: number | WriteValueOptions): Promise<void>;
        startNotifications(): Promise<void>;
        stopNotifications(): Promise<void>;
        toString(): Promise<string>;

        on(event: 'valuechanged', listener: (buffer: Buffer) => void): this;
    }

    interface GattService {
        isPrimary(): Promise<Boolean>;
        getUUID(): Promise<string>;
        characteristics(): Promise<string[]>;
        toString(): Promise<string>;
        getCharacteristic(uuid: string): Promise<GattCharacteristic>;
    }

    interface GattServer {
        services(): Promise<string[]>;
        getPrimaryService(uuid: string): Promise<GattService>;
    }

    interface ConnectionState {
        connected: boolean;
    }

    interface Device extends events.EventEmitter {
        getName(): Promise<string>;
        getAddress(): Promise<string>;
        getAddressType(): Promise<string>;
        getAlias(): Promise<string>;
        getRSSI(): Promise<number>;
        getTXPower(): Promise<number>;
        isPaired(): Promise<boolean>;
        isConnected(): Promise<boolean>;
        pair(): Promise<void>;
        cancelPair(): Promise<void>;
        connect(): Promise<void>;
        disconnect(): Promise<void>;
        gatt(): Promise<GattServer>;
        toString(): Promise<string>;

        on(event: 'connect', listener: (state: ConnectionState) => void): this;
        on(event: 'disconnect', listener: (state: ConnectionState) => void): this;
    }

    interface Adapter {
        getAddress(): Promise<string>;
        getAddressType(): Promise<string>;
        getName(): Promise<string>;
        getAlias(): Promise<string>;
        setAlias(alias: string): Promise<void>;
        isPowered(): Promise<boolean>;
        setPowered(powered: boolean): Promise<void>;
        isDiscoverable(): Promise<boolean>;
        setDiscoverable(discoverable: boolean): Promise<void>;
        getDiscoverableTimeout(): Promise<number>;
        setDiscoverableTimeout(timeout: number): Promise<void>;
        isPairable(): Promise<boolean>;
        setPairable(pairable: boolean): Promise<void>;
        getPairableTimeout(): Promise<number>;
        setPairableTimeout(timeout: number): Promise<void>;
        isDiscovering(): Promise<boolean>;
        startDiscovery(): Promise<void>;
        stopDiscovery(): Promise<void>;
        registerAdvertisement(advertisement: string): Promise<void>;
        unregisterAdvertisement(advertisement: string): Promise<void>;
        devices(): Promise<string[]>;
        getDevice(uuid: string): Promise<Device>;
        waitDevice(uuid: string): Promise<Device>;
        toString(): Promise<string>;
    }

    interface Bluetooth {
        adapters(): Promise<string[]>;
        defaultAdapter(): Promise<Adapter>;
        getAdapter(adapter: string): Promise<Adapter>;
    } 

    function createBluetooth(): {
        destroy(): void;
        bluetooth: Bluetooth;
    };

    interface WriteValueOptions {
        offset?: number;
        type?: 'reliable' | 'request' | 'command';
    }
}

export = NodeBle;

