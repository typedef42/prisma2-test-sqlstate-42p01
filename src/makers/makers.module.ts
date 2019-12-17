import { Module } from '@nestjs/common';
import { PhotonService } from '../storage/photon.service';
import { MakersResolver } from './makers.resolver';

@Module({
  providers: [MakersResolver, PhotonService]
})
export class MakersModule {}
