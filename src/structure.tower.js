const structureTower = {

    getTowers: function(tower) {
          return Object.values(Game.structures).filter(structure => structure.structureType === STRUCTURE_TOWER);
      },
  
      attackHostiles: function(tower) {
          const hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
          if (hostile)  tower.attack(hostile);
      },
  
      repairStructures: function(tower) {
          const damagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
              filter: structure => structure.hits < structure.hitsMax
          });
  
          if (damagedStructure) {
              tower.repair(damagedStructure);
          }
      },
  
      run: function(tower) {
          if (!tower) return;
  
          this.attackHostiles(tower);
  
          if (!this.attackHostiles(tower)) {
              this.repairStructures(tower);
          }
      }
  };
  
  module.exports = structureTower;