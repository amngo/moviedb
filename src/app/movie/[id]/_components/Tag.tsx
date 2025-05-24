function Tag({ name }: { name: string }) {
    return (
        <p className="text-xs text-white font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-xl bg-white/10 backdrop-blur-lg border-white border-[1px]">
            {name}
        </p>
    );
}

export default Tag;
