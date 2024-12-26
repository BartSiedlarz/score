export type Discipline =
  | 'soccer'
  | 'volleyball'
  | 'handball'
  | 'basketball'
  | 'tennis'
  | 'ski jumping'

export interface BaseMatch {
  sport: Discipline
  participant1?: string
  participant2?: string
  score?: string | string[][]
}

export type MatchWithTwoHalves = Omit<Required<BaseMatch>, 'score'> & {
  score: string
}
export type MatchWithSets = Omit<Required<BaseMatch>, 'score'> & {
  score: string
}
export type MatchWithQuarters = Omit<Required<BaseMatch>, 'score'> & {
  score: string[][]
}

export type Match = MatchWithTwoHalves | MatchWithSets | MatchWithQuarters | BaseMatch

export type MatchResult = {
  name: string
  score: string
}
