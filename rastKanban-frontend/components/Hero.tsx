import Link from 'next/link'
import Button from './ui/Button'

const Hero = () => {
    return (
        <div className="bg-[url('/bg.jpeg')] h-[100vh] relative w-full bg-cover mt-[-75px] overflow-hidden text-white">
            <div className="flex h-full items-center justify-center pt-[82px] gap-20 w-[90%] mx-auto max-w-[1450px]">
                <div className="grid items-center gap-6 md:grid-cols-2">
                    <img
                        alt="product image"
                        className="mx-auto rounded-xl order-last md:min-w-[800px] min-w-[500px] md:h-[500px] max-sm:px-5"
                        src="/hero-image.png"
                    />
                    <div className="flex flex-col justify-center max-md:items-center space-y-4 max-md:text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                To Achive Your Goals
                            </h2>
                            <p className="max-w-[500px] md:text-xl text-gray-300">
                                Rast Kanban is a tool that helps you to manage your tasks and goals in a simple way.
                            </p>
                        </div>

                        <Link href={"/boards"}>
                            <Button
                                text="Start Planning Now &#8594;"
                                buttonSize="lg"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
