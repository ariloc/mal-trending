import { AnimeRanking } from "../data/AnimeRanking";
import { AnimeRankingMapper } from "./AnimeRankingMapper";
import AnimeDetails from "../data/AnimeDetails";
import { MalService } from "./MalService";
import PagedResult from "../utils/PagedResult";

export interface IMalRepository {
    getAnimeRanking: (pageOffset: number) => Promise<PagedResult<AnimeRanking>>
    getAnimeDetails: (id: number) => Promise<AnimeDetails>
}

export class MalRepository implements IMalRepository {
    _service: MalService

    constructor() {
        this._service = new MalService()
    }

    public async getAnimeRanking(pageOffset: number): Promise<PagedResult<AnimeRanking>> {
        const rankingDto = await this._service.fetchAnimeRanking(pageOffset);
        return AnimeRankingMapper.toEntity(rankingDto);
    }

    public async getAnimeDetails(id: number): Promise<AnimeDetails> {
        // TODO: Implement
        return {

        }
    }
}