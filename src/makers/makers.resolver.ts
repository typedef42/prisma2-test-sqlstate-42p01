import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { NewMakerInput } from './dto/new-maker.input';
import { PaginationArgs } from '../common/args/pagination-args';
import { Maker } from './models/maker';
import { PhotonService } from '../storage/photon.service';

const pubSub = new PubSub();

@Resolver(of => Maker)
export class MakersResolver {
  constructor(private photon: PhotonService) {}

  @Query(returns => Maker)
  async maker(@Args('id') id: string): Promise<Maker> {
    const maker = await this.photon.makers.findOne({ where: { id } });

    if (!maker) {
      throw new NotFoundException(id);
    }
    return maker;
  }

  @Query(returns => [Maker])
  async makers(@Args() { skip, after, before, first, last }: PaginationArgs): Promise<Maker[]> {
    return await this.photon.makers.findMany({
      skip,
      after,
      before,
      first,
      last,
    });
  }

  @Mutation(returns => Maker)
  async createMaker(@Args('newMakerData') newMakerData: NewMakerInput): Promise<Maker> {
    const maker = await this.photon.makers.create({
      data: { ...newMakerData },
    });
    pubSub.publish('makerCreated', { makerCreated: maker });
    return maker;
  }

  @Mutation(returns => Boolean)
  async removeMaker(@Args('id') id: string): Promise<boolean> {
    const maker = await this.photon.makers.delete({ where: { id } });

    if (!maker) {
      throw new NotFoundException(id);
    }
    return true;
  }

  @Subscription(returns => Maker)
  makerCreated() {
    return pubSub.asyncIterator('makerCreated');
  }
}
