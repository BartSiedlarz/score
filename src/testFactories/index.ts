import { vi } from 'vitest'
import { Logger } from '../infra/logger'
import { Storage } from '../repository/data'
import { BaseMatch, MatchWithQuarters, MatchWithSets, MatchWithTwoHalves } from '../types'

export const testMatchWithSets = (override: Partial<MatchWithSets> = {}): MatchWithSets => ({
  sport: 'volleyball',
  participant1: 'Germany',
  participant2: 'France',
  score: '3:0,25:23,25:19,25:21',
  ...override,
})

export const testMatchWithQuarters = (
  override: Partial<MatchWithQuarters> = {},
): MatchWithQuarters => ({
  sport: 'basketball',
  participant1: 'GKS Tychy',
  participant2: 'GKS Katowice',
  score: [
    ['9:7', '2:1'],
    ['5:3', '9:9'],
  ],
  ...override,
})

export const testMatchWithTwoHalves = (
  override: Partial<MatchWithTwoHalves> = {},
): MatchWithTwoHalves => ({
  sport: 'soccer',
  participant1: 'Chelsea',
  participant2: 'Arsenal',
  score: '2:1',
  ...override,
})

export const testBaseMatch = (override: Partial<BaseMatch> = {}): BaseMatch => ({
  sport: 'ski jumping',
  ...override,
})

export const testStorage = (override: Partial<Storage> = {}): Storage => ({
  getMatches: vi.fn(),
  ...override,
})

export const testLog = (override: Partial<Logger> = {}): Logger => ({
  info: vi.fn(),
  error: vi.fn(),
  ...override,
})
