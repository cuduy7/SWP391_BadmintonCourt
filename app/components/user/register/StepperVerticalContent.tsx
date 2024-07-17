import { StepperVertical } from "../../providers"

interface StepperData {
    steps: string[];
    currentStep: number;
}

const StepperVerticalContent: React.FC<StepperData> = ({
    steps,
    currentStep
}) => {
    return (
        <div className="col-span-1 p-4 rounded-lg bg-white border-2 border-[#E7EBEE] h-full lg:block hidden">
            <div className="p-4 text-gray-500 font-normal text-xl">
                Step to complete
            </div>
            <StepperVertical steps={steps} currentStep={currentStep} />
        </div>
    )
}

export default StepperVerticalContent