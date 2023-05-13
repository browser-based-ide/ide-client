import Navbar from "../shared/components/navbar.component";

const Dashboard: React.FC = () => {
	return (
		<div className="bg-dark min-h-screen">
			<Navbar />
			<div className="max-w-[900px] m-auto flex gap-4 mt-8">
				<div className="bg-blue h-[400px] rounded-3xl flex items-center">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Vitae totam autem sapiente eius deserunt illo labore at
					nulla error perferendis! Debitis, dignissimos. Dolorem,
					fugiat. Minima harum assumenda expedita laudantium libero.
				</div>
				<div className="flex flex-col gap-4">
					<div className="bg-blue rounded-3xl  flex-1">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
						Dolorem, fugiat. Minima harum assumenda expedita
						laudantium libero.
					</div>
					<div className="bg-blue rounded-3xl flex-1">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
						Dolorem, fugiat. Minima harum assumenda expedita
						laudantium libero.
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
