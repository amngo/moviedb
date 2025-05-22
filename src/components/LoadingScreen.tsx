import Loader from './Loader/Loader';

function LoadingScreen({ text }: { text: string }) {
    return (
        <div className="flex flex-col gap-2 justify-center items-center min-h-screen w-full">
            <p className="text-3xl">{text}</p>
            <Loader />
        </div>
    );
}

export default LoadingScreen;
