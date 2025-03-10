export const HeroVideo = () => {
    return (
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl">
                <video 
                    src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4" 
                    className="w-full" 
                    controls={false} 
                    muted 
                    autoPlay
                    loop
                    playsInline
                />
            </div>
        </div>
    )
}