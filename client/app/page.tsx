import Clients from "../components/Clients"
import ClientForm from "../components/ClientForm";


export default function Home() {
  return (
		<>
			<h1 className="font-bold">Zazu</h1>

			<Clients />

			<ClientForm />
		</>
  );
}
