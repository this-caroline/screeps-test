
jest.mock('../src/role.harvester', () => ({}));
jest.mock('../src/role.upgrader', () => ({}));
jest.mock('../src/role.builder', () => ({}));
jest.mock('../src/structure.tower', () => ({}));
jest.mock('../src/enum.roles', () => ({}));

const { clearMemory, manageSpawn, createExtensions } = require('../src/main')

describe('clearMemory', () => {
    beforeEach(() => {
        global.Memory = {
            creeps: {
                John: {},
                Doe: {},
                MissingCreep: {}
            }
        };
    });

    test('should remove non-existing creeps from memory', () => {
        expect(Memory.creeps.MissingCreep).toBeDefined();
        clearMemory();
        expect(Memory.creeps.MissingCreep).toBeUndefined();
    });

    test('should retain existing creeps in memory', () => {
        clearMemory();
        expect(Memory.creeps.John).toBeDefined();
        expect(Memory.creeps.Doe).toBeDefined();
    });
});

describe('manageSpawn', () => {
    beforeEach(() => {
        global.Game = {
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
        };
    });

    test('should not spawn a creep when there are already enough creeps with the desired role', () => {
        _.filter.mockReturnValueOnce([{name: 'Harvester1'}]); 
        
        manageSpawn('harvester', {
            desiredCount: 1,
            body: ["WORK", "CARRY", "MOVE"],
            baseName: 'Harvester',
            energyCost: 100
        });
        expect(Game.spawns['Spawn1'].spawnCreep).not.toHaveBeenCalled();
    });
    
    test('should not spawn a creep when there is not enough energy', () => {
        _.filter.mockReturnValueOnce([]);  
        getTotalEnergyAvailable.mockReturnValue(50);
    
        manageSpawn('harvester', {
            desiredCount: 1,
            body: ["WORK", "CARRY", "MOVE"],
            baseName: 'Harvester',
            energyCost: 100  
        });
    
        expect(Game.spawns['Spawn1'].spawnCreep).not.toHaveBeenCalled();
    });
});

describe('createTower', () => {
     test('should create the correct number of extensions', () => {
        const roomMock = {
            createConstructionSite: jest.fn(() => OK)
        };
      
        createExtensions(3, roomMock);
        expect(roomMock.createConstructionSite).toHaveBeenCalledTimes(3);
        expect(roomMock.createConstructionSite.mock.calls[0][1]).toBe(STRUCTURE_EXTENSION);
    });
});