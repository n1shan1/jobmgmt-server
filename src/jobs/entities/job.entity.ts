import { JobType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Job {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'Senior Software Engineer' })
  title: string;

  @ApiProperty({ example: 'Tech Corp Inc.' })
  companyName: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  location: string;

  @ApiProperty({ enum: JobType, example: JobType.FULL_TIME })
  jobType: JobType;

  @ApiProperty({ example: 100000, required: false })
  minSalary?: number;

  @ApiProperty({ example: 150000, required: false })
  maxSalary?: number;

  @ApiProperty({ example: 'We are looking for a skilled software engineer...' })
  description: string;

  @ApiProperty({ example: '5+ years of experience with Node.js...' })
  requirements: string;

  @ApiProperty({ example: 'Develop new features, fix bugs...' })
  responsibilities: string;

  @ApiProperty({ example: '2023-12-31T00:00:00.000Z' })
  applicationDeadline: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
