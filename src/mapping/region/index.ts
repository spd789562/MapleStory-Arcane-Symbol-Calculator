import ArcaneRiver from './arcane';
import Grandis from './grandis';

import { SymbolType, ArcaneSymbolType, GrandisSymbolType } from './type';

export const SymbolTypeMapping = {
  [SymbolType.Arcane]: [
    ArcaneSymbolType.VanishingJourney,
    ArcaneSymbolType.ChuChu,
    ArcaneSymbolType.Lachelein,
    ArcaneSymbolType.Arcana,
    ArcaneSymbolType.Morass,
    ArcaneSymbolType.Esfera,
  ],
  [SymbolType.Grandis]: [
    GrandisSymbolType.Cernium,
    GrandisSymbolType.HotelArcs,
    GrandisSymbolType.Odium,
    GrandisSymbolType.ShangriLa,
    GrandisSymbolType.Arteria,
    GrandisSymbolType.Carcion,
  ],
};

export * from './type';

export default {
  arcane: ArcaneRiver,
  grandis: Grandis,
};
