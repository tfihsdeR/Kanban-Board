import OnboardingForm from "@/components/OnboardingForm"

const Onboarding = (id: string) => {
    return (
        <div className="bg-[url('/bg.jpeg')] h-[100vh] relative w-full bg-cover mt-[-75px] overflow-hidden">
            <OnboardingForm />
        </div>
    )
}

export default Onboarding
