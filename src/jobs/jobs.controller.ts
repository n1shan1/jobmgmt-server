import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  NotFoundException,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { Job, JobType } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { Job as JobEntity } from './entities/job.entity';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new job posting' })
  @ApiResponse({
    status: 201,
    description: 'Job created successfully',
    type: JobEntity,
  })
  create(@Body() createJobDto: CreateJobDto): Promise<Job> {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all job postings with optional filters' })
  @ApiQuery({ name: 'title', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({
    name: 'jobType',
    enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'],
    required: false,
  })
  @ApiQuery({ name: 'minSalary', type: Number, required: false })
  @ApiQuery({ name: 'maxSalary', type: Number, required: false })
  @ApiQuery({ name: 'skip', type: Number, required: false })
  @ApiQuery({ name: 'take', type: Number, required: false })
  @ApiQuery({ name: 'orderBy', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of jobs',
    type: [JobEntity],
  })
  findAll(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('minSalary') minSalary?: string,
    @Query('maxSalary') maxSalary?: string,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip?: number,
    @Query('take', new DefaultValuePipe(10), ParseIntPipe) take?: number,
    @Query('orderBy') orderBy?: string,
  ): Promise<Job[]> {
    return this.jobsService.findAll({
      skip,
      take,
      where: {
        title: title ? { contains: title } : undefined,
        location: location ? { contains: location } : undefined,
        jobType: jobType as JobType,
        minSalary: minSalary ? { gte: +minSalary } : undefined,
        maxSalary: maxSalary ? { lte: +maxSalary } : undefined,
      },
      orderBy: orderBy ? { [orderBy]: 'asc' } : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job posting by ID' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Job details',
    type: JobEntity,
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  async findOne(@Param('id') id: string): Promise<Job> {
    const job = await this.jobsService.findOne(id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a job posting' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Updated job',
    type: JobEntity,
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a job posting' })
  @ApiParam({ name: 'id', description: 'Job ID' })
  @ApiResponse({
    status: 200,
    description: 'Deleted job',
    type: JobEntity,
  })
  @ApiResponse({ status: 404, description: 'Job not found' })
  remove(@Param('id') id: string): Promise<Job> {
    return this.jobsService.remove(id);
  }

  @Get('count/all')
  @ApiOperation({ summary: 'Get total count of jobs' })
  @ApiResponse({
    status: 200,
    description: 'Total job count',
    type: Number,
  })
  countJobs(): Promise<number> {
    return this.jobsService.countJobs();
  }
}
