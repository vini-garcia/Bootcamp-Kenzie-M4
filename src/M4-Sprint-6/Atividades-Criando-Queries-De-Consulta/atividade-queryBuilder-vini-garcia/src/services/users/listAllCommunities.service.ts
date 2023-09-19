import AppDataSource from "../../data-source"
import { Community } from "../../entities/community.entity"

//Service que irá listar todas as comunidades de um determinado usuário
const listAllCommunitiesUserService = async(userId: number) => {
    const communityRepository = AppDataSource.getRepository(Community)

    const communities = await communityRepository.createQueryBuilder('community')
    .innerJoin('community.usersCommunity', 'userToCommunity')
    .innerJoin('userToCommunity.user', 'user', 'user.id = :userId', {userId})
    .getMany()

    return communities
}

export default listAllCommunitiesUserService