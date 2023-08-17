global.Game = {
    creeps: {
        John: {},
        Doe: {},
    },
    spawns: {
        'Spawn1': {
            room: {
                find: jest.fn()
            },
            store: {
                getUsedCapacity: jest.fn().mockReturnValue(500)
            },
            spawnCreep: jest.fn().mockReturnValue(1),
            pos: {
                x: 0,
                y: 0,
                z: 0
            },
            creeps: {},
            time: 1234567,
            spawns: {
                'Spawn1': {
                    spawnCreep: jest.fn(),
                    room: {
                        find: jest.fn()
                    }
                }
            },
        }
    },
    spawn:{
        room:{
            find: jest.fn().mockReturnValue([])
        },
        spawnCreep: jest.fn()
    }
};
global._ = {
    filter: jest.fn()
};

global.RoomPosition = class RoomPosition {
    constructor(x, y, roomName) {
        this.x = x;
        this.y = y;
        this.roomName = roomName;
    }
};
global.getTotalEnergyAvailable = jest.fn().mockReturnValue(1000);

global.RESOURCE_ENERGY = 'energy';  
global.WORK = 'work';
global.CARRY = 'carry';
global.MOVE = 'move';
global.STRUCTURE_EXTENSION = 'extension';
global.STRUCTURE_TOWER = 'tower';
global.FIND_MY_STRUCTURES = 'find_my_structures';
global.OK = 0;
global.RESOURCE_ENERGY = 'energy';
global.WORK = 'work';
global.CARRY = 'carry';
global.MOVE = 'move';
global.STRUCTURE_EXTENSION = 'extension';
global.STRUCTURE_TOWER = 'tower';
global.OK = 0;
global.FIND_MY_STRUCTURES = 'find_my_structures';
