const rolesConfig = {
    harvester: {
        desiredCount: 2,
        body: [WORK, CARRY, MOVE],
        baseName: 'harvester',
        energyCost: 200 
    },
    upgrader: {
        desiredCount: 1,
        body: [WORK, CARRY, MOVE],
        baseName: 'upgrader',
        energyCost: 200 
    },
    builder: {
        desiredCount: 1,
        body: [WORK, CARRY, MOVE],
        baseName: 'builder',
        energyCost: 200  
    },
    bigBuilder: {
        desiredCount: 1,
        body: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
        baseName: 'builder',
        energyCost: 550  
    },
    bigHarvester: {
      desiredCount: 4,
        body: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
        baseName: 'bigHarvester',
        energyCost: 550 
    },
    bigUpgrader: {
        desiredCount: 2,
        body: [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
        baseName: 'bigUpgrader',
        energyCost: 550 
    },
};

module.exports = rolesConfig;