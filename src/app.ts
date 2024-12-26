import { log } from './infra/logger'
import { StorageFactory } from './repository/data'
import { MatchService } from './service/matchService'

const data = StorageFactory.createLogger('static')
const matchService = new MatchService(data, log)

export const getMatchesResults = () => {
  const results = matchService.parseMatches()

  log.info('Matches results:', results)
}

getMatchesResults()
