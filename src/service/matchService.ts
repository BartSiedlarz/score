import { MatchEventFactory } from '../eventParser'
import { Logger } from '../infra/logger'
import { Storage } from '../repository/data'
import { MatchResult } from '../types'

export class MatchService {
  constructor(
    private data: Storage,
    private log: Logger,
  ) {}

  parseMatches(): MatchResult[] {
    const matches = this.data.getMatches()

    return matches
      .map((match) => {
        try {
          const { makeEventName, parseEventScore } = new MatchEventFactory().createMatchEvent(match)
          return {
            name: makeEventName(),
            score: parseEventScore(),
          }
        } catch (error) {
          this.log.error('Error parsing match', error)
          return undefined
        }
      })
      .filter((match) => match !== undefined)
  }
}
