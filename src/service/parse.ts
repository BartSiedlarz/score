import { Match, MatchWithQuarters, MatchWithSets } from '../types/index'

export const SETS_SCORE_REGEX = /([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+)/

export const parseSetsScore = ({ score, sport }: MatchWithSets) => {
  const scores = SETS_SCORE_REGEX.exec(score)
  if (!scores) {
    throw new Error(`Invalid ${sport} score`)
  }

  const [mainScore, ...rest] = scores.slice(1)

  return `Main score: ${mainScore} (${rest
    .map((setScore, index) => `set${index + 1} ${setScore}`)
    .join(', ')})`
}

const flattenArray = <T>(array: (T | T[])[]): T[] => {
  return array.reduce<T[]>(
    (acc, item) => (Array.isArray(item) ? acc.concat(flattenArray(item)) : acc.concat(item)),
    [],
  )
}

export const parseQuartersScore = ({ score }: MatchWithQuarters) => flattenArray(score).join(',')

export const formatEventName = (match: Match): string => {
  const { sport, participant1, participant2 } = match
  const separator = ['soccer', 'volleyball', 'basketball'].includes(sport) ? ' - ' : ' vs '

  return `${participant1}${separator}${participant2}`
}
