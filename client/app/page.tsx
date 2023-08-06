import Clients from "../components/clients/Clients"
import ClientForm from "../components/clients/ClientForm";
import Projects from '../components/projects/Projects';
import ProjectForm from "src/components/projects/ProjectForm";


export default function Home() {
  return (
		<>
			<nav className="bg-transparent shadow-xl py-6"><h1 className="text-center text-[clamp(2.5rem,3.5vw,4rem)] font-bold text-purple-900">Projectify</h1></nav>
			<Clients />
			<ClientForm />
			<Projects />
			<ProjectForm />
		</>
  );
}
