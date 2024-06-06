import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

const TimeCard = ({
    period,
    periodTime,
    periodActive,
    restTime,
    restActive,
}: {
    period: string;
    periodTime: string;
    periodActive: boolean;
    restTime: string;
    restActive: boolean;
}) => {
    return (
        <div className="h-[9rem] w-[10rem] bg-[white] rounded-[0.5rem] border">
            <div
                className={`${
                    periodActive
                        ? "bg-[var(--focus)] text-[white]"
                        : "bg-[white] text-black"
                } h-[6rem] w-full rounded-t-[0.5rem]`}
            >
                <span
                    className={`${
                        periodActive ? "font-[600]" : ""
                    } block text-left pl-[1rem] pt-[0.75rem]`}
                >
                    {period}
                </span>
                <div className="flex justify-start align-center pl-[1rem] pt-[0.25rem]">
                    <FontAwesomeIcon
                        icon={faBriefcase}
                        className="self-center pr-[1rem]"
                    />
                    <span
                        className={`${
                            periodActive ? "font-bold" : ""
                        } text-[1.75rem] self-center pr-[0.3rem]`}
                    >
                        {periodTime.split("/")[0]}
                    </span>
                    <span className="self-center">
                        {periodTime.split("/")[1]}
                    </span>
                </div>
            </div>
            <div
                className={`${
                    restActive
                        ? "bg-[var(--chill)] text-[var(--background)]"
                        : "bg-black"
                } flex h-[2.9rem] pl-[1rem] text-white rounded-b-[0.5rem]`}
            >
                <span
                    className={`${
                        restActive ? "font-[600]" : ""
                    } self-center pr-[0.6rem]`}
                >
                    Rest
                </span>
                <span
                    className={`${
                        restActive ? "font-bold" : ""
                    } text-[1.5rem]  self-center pr-[0.3rem]`}
                >
                    {restTime.split("/")[0]}
                </span>
                <span className="self-center">{restTime.split("/")[1]}</span>
            </div>
        </div>
    );
};

export default TimeCard;
