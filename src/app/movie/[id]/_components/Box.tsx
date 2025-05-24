function Box({ title, text }: { title: string; text: string }) {
    return (
        <div className="flex flex-col relative justify-center items-center rounded-3xl h-[100px] w-[140px] bg-white/5 backdrop-blur-sm gap-2 border-white border-[1px]">
            <h2 className="text-xs font-bold tracking-widest text-gray-300 uppercase">
                {title}
            </h2>
            <p className="text-lg font-bold tracking-tight">{text}</p>
        </div>
    );
}

export default Box;
