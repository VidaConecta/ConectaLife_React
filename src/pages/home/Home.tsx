function Home() {
    return (
        <>
            <div className="flex min-h-[50vh] justify-center bg-slate-800 md:min-h-[70vh]">
                <div className="container grid grid-cols-1 px-6 text-white md:grid-cols-2">
                    {/* Apresentação */}
                    <div className="flex flex-col items-center justify-center gap-4 py-8 md:items-start">
                        <span className="rounded-full bg-emerald-500/20 px-4 py-1 text-sm font-medium text-emerald-400">
                            Gestão de seguros de vida
                        </span>

                        <h2 className="text-center text-3xl font-bold md:text-left md:text-5xl">
                            Bem-vinde ao ConectaLife!
                        </h2>

                        <p className="max-w-lg text-center text-lg text-slate-300 md:text-left md:text-xl">
                            Gerencie clientes, oportunidades e apólices em um
                            único lugar, com mais organização e agilidade.
                        </p>
                    </div>

                    <div className="flex justify-center items-center w-full">
                        <img
                            src="https://ik.imagekit.io/vpgms/VidaConecta/ConectaLife/ConectaLife-home.png"
                            alt="Imagem Página Home"
                            className="w-2/3 md:w-2/3 mx-auto h-52 md:h-80 lg:h-96 object-contain"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
