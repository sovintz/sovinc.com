import { useTranslations } from 'next-intl'

import { Project } from '@/types'

import ProjectCard from './ProjectCard'

const Projects = () => {
  const t = useTranslations('homePage.projectsSection')
  const projects: Project[] = t.raw('projects')

  return (
    <div id='projects' className='container mx-auto'>
      <h3 className='text-3xl md:text-4xl font-bold text-center mb-8'>
        {t('title')}
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
