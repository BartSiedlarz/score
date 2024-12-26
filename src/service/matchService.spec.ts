import { describe, expect, it } from 'vitest'
import {
  testBaseMatch,
  testLog,
  testMatchWithQuarters,
  testMatchWithSets,
  testMatchWithTwoHalves,
  testStorage,
} from '../testFactories'
import { MatchService } from './matchService'

const log = testLog()

describe('matchService', () => {
  it('parse matches', () => {
    const matches = [
      testMatchWithTwoHalves({
        sport: 'soccer',
        participant1: 'FC Barcelona',
        participant2: 'Real Madrid',
        score: '1:3',
      }),
      testMatchWithQuarters({
        sport: 'basketball',
        participant1: 'GKS Tychy',
        participant2: 'GKS Katowice',
        score: [
          ['9:7', '2:1'],
          ['5:3', '9:9'],
        ],
      }),
    ]
    const storage = testStorage({ getMatches: () => matches })

    const matchService = new MatchService(storage, log)

    const results = matchService.parseMatches()

    expect(results).toEqual([
      { name: 'FC Barcelona - Real Madrid', score: '1:3' },
      {
        name: 'GKS Tychy - GKS Katowice',
        score: '9:7,2:1,5:3,9:9',
      },
    ])
  })

  it('handles no matches', () => {
    const storage = testStorage({ getMatches: () => [] })

    const matchService = new MatchService(storage, log)

    const results = matchService.parseMatches()

    expect(results).toEqual([])
  })

  it('handles invalid match', () => {
    const matches = [testBaseMatch(), testMatchWithSets()]
    const storage = testStorage({ getMatches: () => matches })

    const matchService = new MatchService(storage, log)

    const results = matchService.parseMatches()

    expect(results).toEqual([
      {
        name: 'Germany - France',
        score: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
      },
    ])

    expect(log.error).toHaveBeenCalledWith(
      'Error parsing match',
      new Error('Invalid sport: ski jumping'),
    )
  })
})
