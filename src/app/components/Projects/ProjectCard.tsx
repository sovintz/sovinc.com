'use client'

import Image from 'next/image'

import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Project } from '@/types'

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className='overflow-hidden h-fit p-3 rounded-3xl'>
      <div className='relative h-[200px] w-full'>
        <Image
          src={project.image}
          alt={project.altText}
          fill
          className='object-cover rounded-xl'
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        {project.link && (
          <Button
            variant='link'
            className='p-0 cursor-pointer'
            onClick={() => window.open(project.link, '_blank')}
          >
            View Project
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProjectCard
