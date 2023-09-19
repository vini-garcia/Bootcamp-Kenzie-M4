import AppDataSource from "../../data-source"
import { Community } from "../../entities/community.entity"
import { User } from "../../entities/user.entity"

//Service que irá listar todos os usuários de determinada comunidades
const listAllUsersCommunitiesService = async(communityId: number) => {
    const userRepository = AppDataSource.getRepository(User)

    // const users = await userRepository.createQueryBuilder('user')
    // .innerJoinAndSelect('user.usersCommunity', 'userToCommunity')
    // .innerJoinAndSelect('userToCommunity.community', 'community')
    // .where('community.id = :communityId', {communityId})
    // .getMany()

    const users = await userRepository.createQueryBuilder('user')
    .innerJoin('user.usersCommunity', 'userToCommunity')
    .innerJoin('userToCommunity.community', 'community', 'community.id = :communityId', {communityId})
    .getMany()

    return users
}

export default listAllUsersCommunitiesService