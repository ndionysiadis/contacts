import React from 'react';
import {FaceSmileIcon, FaceFrownIcon} from "@heroicons/react/20/solid";

interface EmptyStateProps {
    action?: React.ReactNode;
}

export default function EmptyState({ action }: EmptyStateProps) {
    return (
        <div className="text-center flex flex-col items-center text-sm gap-2 group
        motion-delay-50 motion-scale-in-[0.5] motion-rotate-in-[-10deg] motion-blur-in-[10px]
        motion-duration-[1.13s] motion-duration-[0.75s]/scale motion-duration-[0.00s]/rotate motion-duration-[1.50s]/blur">
            <FaceFrownIcon className="text-gray-500 w-8 group-hover:hidden" />
            <FaceSmileIcon className="text-gray-500 w-8 hidden group-hover:flex motion-preset-confetti" />
            <h3 className="font-semibold text-gray-500">Whoops!</h3>
            <p className="text-gray-200">No added contacts found</p>
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
}
