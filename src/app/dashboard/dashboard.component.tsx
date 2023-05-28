import Navbar from "../shared/components/navbar.component";
import { problems } from "../shared/config";

const Dashboard: React.FC = () => {
	return (
		<div className="bg-dark min-h-screen">
			<Navbar />
			<div className="max-w-[900px] m-auto flex flex-col mt-5 ">
				<h1 className="font-mono text-7xl text-white font-black mb-4">
					Questions
				</h1>
				{Object.keys(problems).map((key) => {
					return (
						<a
							href={`/editor/${key}`}
							className="text-white bg-[#353535] w-full rounded p-4 py-3 flex justify-between items-center border-b-2 border-b-dark hover:opacity-80"
							key={key}>
							<h2 className="">
								{key}. {problems[key].title}
							</h2>
						</a>
					);
				})}
			</div>
			{/* <div className="max-w-[900px] m-auto grid grid-cols-2 gap-4 mt-8 pb-8">
				<div className="bg-[#353535]  h-[500px] rounded-3xl flex items-center p-8">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Vitae totam autem sapiente eius deserunt illo labore at
					nulla error perferendis! Debitis, dignissimos. Dolorem,
					fugiat. Minima harum assumenda expedita laudantium libero.
				</div>
				<div className="grid grid-rows-2 gap-4">
					<div className="bg-[#353535]  rounded-3xl p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
					<div className="bg-[#353535]  rounded-3xl p-4">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
				</div>
				<div className="flex h-[500px] gap-4">
					<div className="bg-[#353535]  rounded-3xl p-8">
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Vitae totam autem sapiente eius deserunt illo
						labore at nulla error perferendis! Debitis, dignissimos.
					</div>
				</div>
				<div className="bg-[#353535]  rounded-3xl p-4">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Vitae totam autem sapiente eius deserunt illo labore at
					nulla error perferendis! Debitis, dignissimos.
				</div>
			</div> */}
		</div>
	);
};

export default Dashboard;
