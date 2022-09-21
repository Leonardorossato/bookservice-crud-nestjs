import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Request, Router } from 'express';
import { PostService } from './post.service';
@Controller('/api/posts')
export default class PostsController {
  constructor(
    private readonly postsService: PostService
  ) {}

  @Get('/all')
  getAllPosts() {
    return this.postsService.getAllposts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post('/create')
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put('/update/:id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete('/delete/:id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}