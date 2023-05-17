import Navbar from "../shared/components/navbar.component";

const Dashboard: React.FC = () => {
	return (
		<div className="bg-dark min-h-screen">
			<Navbar />
            <div className="max-w-[1200px] m-auto grid grid-cols-2 gap-4 mt-8">
				<div className="bg-orange-500 h-[500px] rounded-3xl flex items-center p-8">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Vitae totam autem sapiente eius deserunt illo labore at
					nulla error perferendis! Debitis, dignissimos. Dolorem,
					fugiat. Minima harum assumenda expedita laudantium libero.
				</div>
				<div className="grid grid-rows-2 gap-4">
					<div className="bg-orange-500 rounded-3xl p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
					<div className="bg-orange-500 rounded-3xl p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
				</div>
				<div className="flex h-[500px] gap-4">
					<div className="bg-orange-500 rounded-3xl p-8">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
				</div>
				<div className="bg-orange-500 rounded-3xl p-4">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Vitae totam autem sapiente eius deserunt illo labore at
					nulla error perferendis! Debitis, dignissimos.
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
