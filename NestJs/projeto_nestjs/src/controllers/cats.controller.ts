import { Controller, Get, Param, Post, Req } from "@nestjs/common";

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

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

}