import { Module } from '@nestjs/common';
import PostsController from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostService]
})
export class PostModule {}
