import { Controller, Get, Post, Req } from "@nestjs/common";

@Controller("cats")
export class CatsController {

  @Post()
  create(): string {
    return "this action adds a new cats";
  }

  @Get()
  findAll(@Req() request: Request): string {
    return "this action returns all cats";
  }

}