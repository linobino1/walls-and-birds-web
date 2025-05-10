import * as migration_20250509_141614_migration from './20250509_141614_migration';
import * as migration_20250510_054127_slugLock from './20250510_054127_slugLock';

export const migrations = [
  {
    up: migration_20250509_141614_migration.up,
    down: migration_20250509_141614_migration.down,
    name: '20250509_141614_migration',
  },
  {
    up: migration_20250510_054127_slugLock.up,
    down: migration_20250510_054127_slugLock.down,
    name: '20250510_054127_slugLock'
  },
];
