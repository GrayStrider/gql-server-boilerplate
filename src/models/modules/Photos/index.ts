import {Arg, Mutation, Query, Resolver} from 'type-graphql'
import {Album} from '../../entity/Photos/Album'
import {Photo} from '../../entity/Photos/Photo'

@Resolver()
export class PhotoResolver {
	@Query(returns => [Photo])
	async photos() {return Photo.find({relations: ['albums']})}
	
	@Mutation(returns => Photo)
	async photoCreate(@Arg('album') album: string) {
		const res = await Album.findOne({name: album}) ??
			await Album.create({name: album}).save()
		
		return await Photo.create({albums: [res]}).save()
	}
}

@Resolver()
export class AlbumResolver {
	@Query(returns => [Album])
	async albums() {return Album.find({relations: ["photos"]})}
	
	@Mutation(returns => Album)
	async albumCreate(@Arg('name')name: string) {
		return Album.create({name}).save()}
}
