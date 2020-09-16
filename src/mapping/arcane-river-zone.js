/**
 * ArcaneRiverZone
 * @description arcane river zone data
 * @type {Array<ZoneData>}
 *
 * @typedef {object} ZoneData
 * @property {string} name - zone name
 * @property {string} key - zone key
 * @property {number} daily - get symbol by daily quest everyday
 * @property {Object} [pquest] - party quest data
 * @property {string} pquest.name - party quest name
 * @property {'symbol'|'coin'} pquest.type - party quest reward type
 * @property {number} [pquest.count] - party quest reward count
 * @property {number} [pquest.dailyMax] - party quest reward limit
 * @property {number} [pquest.basic] - party quest basic reward
 * @property {number} [pquest.unit] - party quest reward exchange to symbol need
 * @property {number} [pquest.desc] - custom description
 */
const ArcaneRiverZone = [
  {
    name: '消逝的旅途',
    daily: 8,
    pquest: { name: '艾爾達斯光譜', type: 'symbol', count: 6 },
    key: 'vanishingjourney',
    levelupDiscount: true,
  },
  {
    name: '啾啾愛爾蘭',
    daily: 4,
    pquest: { name: '肚子餓的武藤', type: 'symbol', dailyMax: 15 },
    key: 'chuchu',
  },
  {
    name: '拉契爾恩',
    key: 'lachelein',
    daily: 4,
    pquest: {
      name: '毀夢者',
      type: 'coin',
      unit: 30,
      basic: 24,
      dailyMax: 500,
      desc: `毀夢者: 最多可獲得 ${500} 個, ${30} 個可兌換 1 個符文, 已自動計入雕像對話保底 24 個`,
    },
  },
  {
    name: '阿爾卡納',
    key: 'arcana',
    daily: 8,
    pquest: {
      name: '精靈救援者',
      type: 'coin',
      unit: 3,
      basic: 0,
      dailyMax: 30,
    },
  },
  { name: '魔菈斯', daily: 8, key: 'morass' },
  { name: '艾斯佩拉', daily: 8, key: 'esfera' },
]

export default ArcaneRiverZone
