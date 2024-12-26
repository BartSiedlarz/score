import { describe, expect, it } from 'vitest'
import { testMatchWithQuarters, testMatchWithSets, testMatchWithTwoHalves } from '../testFactories'
import { Match, MatchWithSets } from '../types'
import { formatEventName, parseQuartersScore, parseSetsScore } from './parse'

describe('parse', () => {
  describe('parseSetsScore', () => {
    it.each<{
      given: MatchWithSets['score']
      expected: string
    }>([
      {
        given: '3:0,25:23,25:19,25:21',
        expected: 'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)',
      },
      {
        given: '2:1,7:6,6:3,6:7',
        expected: 'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)',
      },
    ])('should parse sets score for %o', ({ given, expected }) => {
      expect(parseSetsScore(testMatchWithSets({ score: given }))).toBe(expected)
    })

    it('throws an error for invalid score', () => {
      expect(() =>
        parseSetsScore(testMatchWithSets({ score: 'invalid', sport: 'tennis' })),
      ).toThrowError('Invalid tennis score')
    })
  })

  describe('parseQuartersScore', () => {
    it('should parse quarters score', () => {
      expect(
        parseQuartersScore(
          testMatchWithQuarters({
            score: [
              ['9:7', '2:1'],
              ['5:3', '9:9'],
            ],
          }),
        ),
      ).toBe('9:7,2:1,5:3,9:9')
    })

    it('handles empty score', () => {
      expect(parseQuartersScore(testMatchWithQuarters({ score: [] }))).toBe('')
    })
  })

  describe('formatEventName', () => {
    it.each<{ match: Match; eventName: string }>([
      {
        match: testMatchWithTwoHalves({
          sport: 'soccer',
          participant1: 'Chelsea',
          participant2: 'Arsenal',
        }),
        eventName: 'Chelsea - Arsenal',
      },
      {
        match: testMatchWithTwoHalves({
          sport: 'handball',
          participant1: 'Pogoń Szczeciń',
          participant2: 'Azoty Puławy',
        }),
        eventName: 'Pogoń Szczeciń vs Azoty Puławy',
      },
      {
        match: testMatchWithQuarters({ participant1: 'GKS Tychy', participant2: 'GKS Katowice' }),
        eventName: 'GKS Tychy - GKS Katowice',
      },
    ])('gets event name from score for %o', ({ match, eventName }) => {
      expect(formatEventName(match)).toBe(eventName)
    })
  })
})
