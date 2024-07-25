"use client"

import React, { useState, useEffect, useRef } from "react";

interface Step {
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
}

interface StepperVerticalProps {
    steps: string[];
    currentStep: number;
}

const StepperVertical: React.FC<StepperVerticalProps> = ({
    steps,
    currentStep,
}) => {
    const [newStep, setNewStep] = useState<Step[]>([]);
    const stepsRef = useRef<Step[]>([]);

    const updateStep = (stepNumber: number, steps: Step[]): Step[] => {
        const newSteps = [...steps];
        //console.log(newSteps);
        let count = 0;
        while (count < newSteps.length) {
            //current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: false,
                };
                count++;
            }

            //step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: true,
                };
                count++;
            }
            //step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }
        }

        return newSteps;
    };

    useEffect(() => {
        const stepsState: Step[] = steps.map((step, index) => ({
            description: step,
            completed: false,
            highlighted: index === 0 ? true : false,
            selected: index === 0 ? true : false,
        }));

        stepsRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepsRef.current);
        setNewStep(current);
    }, [steps, currentStep]);

    const stepsDisplay = newStep.map((step, index) => {
        return (
            <div
                key={index}
                className={
                    index !== newStep.length - 1
                        ? "flex items-center gap-4"
                        : "flex items-center gap-4"
                }
            >
                <div className="
                        relative 
                        flex 
                        flex-row
                        items-center 
                        gap-2
                    "
                >
                    <div
                        className={`
                            flex-shrink-0
                            rounded-full 
                            transition-all 
                            duration-500 
                            ease-in-out 
                            bg-white
                            text-white
                            !border-4 
                            !border-solid
                            border-gray-500
                            w-8 
                            flex 
                            items-center 
                            justify-center 
                            text-lg
                            py-3  
                            ${step.selected
                                ? " text-white font-bold  !border-primary-blue-cus"
                                : ""
                            }
                            ${step.completed
                                ? "!bg-green-600"
                                : ""
                            }
                        `}
                    >
                        {step.completed ? (
                            <span className="text-white font-bold text-lg">&#10003;</span>
                        ) : (
                            ""
                        )}
                    </div>
                    <div
                        className={`
                            text-center 
                            text-lg 
                            font-semibold 
                            w-auto
                            ${step.highlighted
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                    >
                        {step.description}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="p-4 flex flex-col gap-3">
            {stepsDisplay}
        </div>
    );
};

export default StepperVertical;