import { formatEventName, parseQuartersScore, parseSetsScore } from './service/parse'
import { Match, MatchWithQuarters, MatchWithSets, MatchWithTwoHalves } from './types'

interface MatchEvent {
  makeEventName(): string
  parseEventScore(): string
}

abstract class BaseMatchEvent implements MatchEvent {
  protected match: Match

  constructor(match: Match) {
    this.match = match
  }

  abstract isValidMatch(match: Match): match is Match
  abstract parseEventScore(): string
  makeEventName = () => formatEventName(this.match)
}

class MatchEventWithTwoHalves extends BaseMatchEvent {
  isValidMatch = (match: Match): match is MatchWithTwoHalves =>
    match.score !== undefined && typeof match.score === 'string'

  parseEventScore = () => {
    if (this.isValidMatch(this.match)) {
      return this.match.score
    }

    throw new Error(`Invalid ${this.match.sport} score`)
  }
}

class MatchEventWithQuarters extends BaseMatchEvent {
  isValidMatch = (match: Match): match is MatchWithQuarters => {
    const { score } = match
    return score !== undefined && Array.isArray(score)
  }

  parseEventScore = () => {
    if (this.isValidMatch(this.match)) {
      return parseQuartersScore(this.match)
    }

    throw new Error(`Invalid ${this.match.sport} score`)
  }
}

class MatchEventWithSets extends BaseMatchEvent {
  isValidMatch = (match: Match): match is MatchWithSets => {
    const { score } = match
    return score !== undefined && typeof score === 'string'
  }

  parseEventScore = () => {
    if (this.isValidMatch(this.match)) {
      return parseSetsScore(this.match)
    }

    throw new Error(`Invalid ${this.match.sport} score`)
  }
}

export class MatchEventFactory {
  createMatchEvent(match: Match): MatchEvent {
    switch (match.sport) {
      case 'soccer':
      case 'handball':
        return new MatchEventWithTwoHalves(match)
      case 'volleyball':
      case 'tennis':
        return new MatchEventWithSets(match)
      case 'basketball':
        return new MatchEventWithQuarters(match)
      default:
        throw new Error(`Invalid sport: ${match.sport}`)
    }
  }
}
