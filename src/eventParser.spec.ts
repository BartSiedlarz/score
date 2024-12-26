/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from 'vitest'
import { MatchEventFactory } from './eventParser'
import * as parseModule from './service/parse'
import {
  testBaseMatch,
  testMatchWithQuarters,
  testMatchWithSets,
  testMatchWithTwoHalves,
} from './testFactories'
import { BaseMatch } from './types'

vi.mock('./service/parse')

describe('eventParser', () => {
  it.each<{ match: BaseMatch; parseScoreFn?: (...args: any[]) => any }>([
    { match: testMatchWithTwoHalves() },
    { match: testMatchWithQuarters(), parseScoreFn: parseModule.parseQuartersScore },
    { match: testMatchWithSets(), parseScoreFn: parseModule.parseSetsScore },
  ])('parses match: $match', ({ match, parseScoreFn }) => {
    const { makeEventName, parseEventScore } = new MatchEventFactory().createMatchEvent(match)
    makeEventName()
    parseEventScore()

    expect(parseModule.formatEventName).toHaveBeenCalledWith(match)
    if (parseScoreFn) {
      expect(parseScoreFn).toHaveBeenCalledWith(match)
    }
  })

  it.each<BaseMatch>([
    testMatchWithTwoHalves({ score: 12 } as any),
    testMatchWithQuarters({ score: 'invalid' } as any),
    testMatchWithSets({ score: 1 } as any),
  ])('throws an error for invalid match: #o', (match) => {
    const { parseEventScore } = new MatchEventFactory().createMatchEvent(match)

    expect(() => parseEventScore()).toThrowError(`Invalid ${match.sport} score`)
  })

  it('throws an error for invalid match sport', () => {
    const match = testBaseMatch()

    expect(() => new MatchEventFactory().createMatchEvent(match)).toThrowError(
      `Invalid sport: ${match.sport}`,
    )
  })
})
