import Loader from './Loader/Loader';

function LoadingScreen({ text }: { text: string }) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-2">
            <p className="text-xl sm:text-3xl">{text}</p>
            <Loader />
        </div>
    );
}

export default LoadingScreen;
