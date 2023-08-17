const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const structureTower = require('./structure.tower');
const rolesConfig = require('./enum.roles')
const spawn = Game.spawns['Spawn1'];
const extensionsWanted = 5;
const towersWanted = 1;

function clearMemory(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}

function manageSpawn(role, config) {
    const creepsWithRole = _.filter(Game.creeps, creep => creep.memory.role === role);
    if(creepsWithRole.length < config.desiredCount && getTotalEnergyAvailable() >= config.energyCost) {
        const newName = `${config.baseName}${Game.time}`;
        console.log(`Spawning new ${role}: ${newName}`);
        spawn.spawnCreep(config.body, newName, { memory: {role: role }});
    }
}

function getTotalEnergyAvailable() {
    let total = spawn.store.getUsedCapacity(RESOURCE_ENERGY);
    const extensions = spawn.room.find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_EXTENSION } });
    if(!extensions) return total;
    for(let ext of extensions) {
        total += ext.store.getUsedCapacity(RESOURCE_ENERGY);
    }
    console.log('Total Energy ', total)
    return total;
};


function createExtensions(numExtensions, room) {
    const referencePos = spawn.pos;
    const roomName = spawn.room.name;
    if (!room) {
        console.log('Room not found:',roomName);
        return;
    }
    
    let createdCount = 0;
    const offsets = [
        {x: -5, y: -5},
        {x: -5, y: -4},
        {x: -5, y: -3},
        {x: -5, y: -2},                  
        {x: -5, y: -1},
        {x: -5, y: -6},
        {x: -5, y: -7},
        {x: -5, y: -8},
        {x: -5, y: -9},
        {x: -5, y: -10}
    ];

    for (let offset of offsets) {
        if (createdCount >= numExtensions) {
            break;
        }
        
        const pos = new RoomPosition(referencePos.x + offset.x, referencePos.y + offset.y, roomName);
        const createdExtension = room.createConstructionSite(pos, STRUCTURE_EXTENSION);
        if (createdExtension === OK) {
            createdCount++;
        }
    }
    
    console.log(`Created ${createdCount} extension`);
}


function createTower(room) {
    const referencePos = spawn.pos;
    const roomName = spawn.room.name;

    if (!room) {
        return;
    }

    const offset = { x: -6,  y: -6 }
    
    const pos = new RoomPosition(referencePos.x + offset.x, referencePos.y + offset.y, roomName);
    const result = room.createConstructionSite(pos, STRUCTURE_TOWER);

    if (result === OK) {
        console.log(`Tower construction site created at ${pos}`);
    }
}


module.exports.loop = function () {
    const creeps = Game.creeps;
    const room = Game.rooms[spawn.room.name];

    clearMemory();
    
    // Spawn
    for(let role in rolesConfig) {
        manageSpawn(role, rolesConfig[role]);
    }

    // Extensions
    const existingExtensionsCount = room.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_EXTENSION }).length + room.find(FIND_CONSTRUCTION_SITES, { filter: (s) => s.structureType === STRUCTURE_EXTENSION }).length;
    
    if (extensionsWanted > existingExtensionsCount) {
        createExtensions(extensionsWanted, room);
    }
    
    // Actions
    for(var name in creeps) {
        const creep = Game.creeps[name];
        const { role } = creep.memory;
        if(role == 'harvester' || role == 'bigHarvester') {
            roleHarvester.run(creep);
        }
        if(role == 'upgrader' || role == 'bigUpgrader' ) {
            roleUpgrader.run(creep);
        }
         if(role == 'builder' || role == 'bigBuilder') {
            roleBuilder.run(creep);
        }
    }
    
    // Tower
    if(room.controller.level >= 3) { 
        const existingTowersCount = room.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_TOWER }).length + room.find(FIND_CONSTRUCTION_SITES, { filter: (s) => s.structureType === STRUCTURE_TOWER }).length;
        if (towersWanted > existingTowersCount) {
          createTower(room);
        }
        
        const towers = structureTower.getTowers();
        
        towers?.forEach(tower => structureTower.run(tower));
    }
}

// For testing purposes
module.exports = {
    clearMemory,
    manageSpawn,
    createExtensions
}