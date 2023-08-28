import SymbolMapping from '../mapping/symbol'

const arcMatching = ({ region }, arcane) =>
  Object.values(SymbolMapping[region]).find(
    // get match range of arcane
    (arc, index, arr) =>
      arcane >= arc.stack &&
      arcane < (arr[index + 1] ? arr[index + 1].stack : arc.stack + 1)
  ) || { level: 0, stack: 0, count: 0 }

export default arcMatching
