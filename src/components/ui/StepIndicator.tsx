"use client";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    return (
        <div className="flex items-center justify-center gap-4 mb-8">
            {/* Step dots */}
            <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }, (_, i) => {
                    const stepNum = i + 1;
                    const isActive = stepNum === currentStep;
                    const isCompleted = stepNum < currentStep;

                    return (
                        <div
                            key={stepNum}
                            className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${isActive
                                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-125 ring-4 ring-indigo-500/20"
                                    : isCompleted
                                        ? "bg-indigo-500"
                                        : "bg-zinc-300 dark:bg-zinc-600"
                                }
              `}
                        />
                    );
                })}
            </div>

            {/* Step text */}
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Étape {currentStep} sur {totalSteps}
            </span>
        </div>
    );
}
