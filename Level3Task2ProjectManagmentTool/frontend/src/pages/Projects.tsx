import { getUserProjects } from '@/api/projectApi'
import ProjectCard from '@/components/projectCard'
import { Project } from '@/schema'
import useAuth from '@/store'
import { useQuery } from '@tanstack/react-query'

export default function Projects () {
  const { token } = useAuth()

  const { data: projects, error } = useQuery<Project[], Error>({
    queryKey: ['Projects'],
    queryFn: () => getUserProjects(token)
  })

  console.log(projects)
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
      {projects?.map((project: Project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  )
}
