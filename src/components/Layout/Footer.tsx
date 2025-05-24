function Footer() {
    return (
        <footer>
            <div className="flex items-center justify-center w-full h-16 border-t bg-black/75 backdrop-blur-md border-white/10">
                <p className="text-sm text-white">
                    © {new Date().getFullYear()} MovieDB v2. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
