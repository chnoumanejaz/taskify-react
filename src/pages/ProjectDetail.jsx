import { useParams } from "react-router-dom"

function ProjectDetail() {

    const {projectId:id} = useParams()

    return (
        <div>
            This is project {id} page, where different tasks are
        </div>
    )
}

export default ProjectDetail
