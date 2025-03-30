import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job, JobType } from '@prisma/client';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    return this.prisma.job.create({
      data: createJobDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: {
      title?: { contains: string };
      location?: { contains: string };
      jobType?: JobType;
      minSalary?: { gte?: number; lte?: number };
      maxSalary?: { gte?: number; lte?: number };
    };
    orderBy?: { [key: string]: 'asc' | 'desc' };
  }): Promise<Job[]> {
    const { skip, take, where, orderBy } = params;

    if (where?.jobType && !Object.values(JobType).includes(where.jobType)) {
      throw new BadRequestException(
        `Invalid value for jobType: ${where.jobType}`,
      );
    }

    return this.prisma.job.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async findOne(id: string): Promise<Job | null> {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    await this.findOne(id); // Check if job exists

    return this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });
  }

  async remove(id: string): Promise<Job> {
    await this.findOne(id); // Check if job exists

    return this.prisma.job.delete({
      where: { id },
    });
  }

  async countJobs(): Promise<number> {
    return this.prisma.job.count();
  }
}
