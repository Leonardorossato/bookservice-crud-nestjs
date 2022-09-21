import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './interface/post.interce';

@Injectable()
export class PostService {
    private lastPostId = 0;
    private posts: Post[] = [];

    getAllposts() {
        return this.posts
    }

    getPostById(id: number) {
        const post = this.posts.find(post => post.id === id);
        if (post) {
            return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

    async createPost(post: CreatePostDto) {
        const newPost = {
            id: this.lastPostId++,
            ...post
        }
        try {
            const post = await this.posts.push(newPost);
            return post; 
        } catch (error) {
            throw new HttpException('Cont not create a post', HttpStatus.BAD_REQUEST)
        }   
    }

    async deletePost(id : number){
        try {
            const postIndex = this.posts.findIndex(post => post.id === id);
            if (postIndex > -1) {
              this.posts.splice(postIndex, 1);
            } else {
              throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Post not found', HttpStatus.BAD_REQUEST);
        }
    }

    updatePost(id: number, post: UpdatePostDto) {
        try {
            const postIndex = this.posts.findIndex(post => post.id === id);
            if (postIndex > -1) {
              this.posts[postIndex] = post;
              return post;
            }
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
          
        } catch (error) {
            throw new HttpException('Error to found a id', HttpStatus.BAD_REQUEST)
        }   
    }
}
