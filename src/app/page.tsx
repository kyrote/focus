"use client";

import { useEffect, useState } from "react";
import TimeCard from "./components/TimeCard";

export default function Home() {
    const [timeLeft, setTimeLeft] = useState("");
    const [activeArray, setActiveArray] = useState(Array(10).fill(false));
    const [isRest, setIsRest] = useState(false);

    var periods = [
        [8, 15], //schver
        [9, 40], // 1
        [9, 45], // r1
        [11, 15], // 2
        [11, 20], // r2
        [13, 16], // 3
        [13, 21], // r3
        [14, 1], // adv
        [14, 6], // radv
        [15, 31], // 4
        [32, 15], // 1st period + 24 hours bc im lazy
    ];

    var periodInfo = [
        ["First Period", "8:15/AM", "9:40/AM", activeArray[0], activeArray[1]],
        [
            "Second Period",
            "9:45/AM",
            "11:15/AM",
            activeArray[2],
            activeArray[3],
        ],
        ["Third Period", "11:20/AM", "1:16/PM", activeArray[4], activeArray[5]],
        ["ROARR", "1:21/PM", "2:01/PM", activeArray[6], activeArray[7]],
        ["Fourth Period", "2:06/PM", "3:31/PM", activeArray[8], activeArray[9]],
    ];

    function period(t: number) {
        // cooking fiesta
        for (let i = 0; i < periods.length; i++) {
            if (periods[i][0] * 3600 + periods[i][1] * 60 + 5 > t) {
                i % 2 == 0 ? setIsRest(true) : setIsRest(false);
                activeArray[i - 1] = true;
                return periods[i];
            }
            activeArray[i - 1] = false;
        }
        return periods[periods.length - 1];
    }

    useEffect(() => {
        setInterval(() => {
            // get seconds since start of day
            let start = new Date();
            let seconds =
                start.getMilliseconds() / 1e3 +
                start.getSeconds() +
                60 * start.getMinutes() +
                3600 * start.getHours();

            // calculate & format time left
            let timeLeft =
                period(seconds)[0] * 3600 +
                period(seconds)[1] * 60 +
                5 -
                seconds;

            // this is the least proud I've ever been about myself
            let x;
            if (timeLeft < 3600) {
                x = 14;
            } else if (timeLeft < 36000) {
                x = 12;
            } else {
                x = 11;
            }

            let timeLeftFormatted = new Date(timeLeft * 1000)
                .toISOString()
                .slice(x, 19);

            setTimeLeft(timeLeftFormatted);
        }, 250);
    });

    return (
        <>
            <div className="h-full flex flex-col justify-center align-center text-center grow shrink basis-auto">
                <div className="h-[10rem] w-full"></div>
                <div className="flex flex-col justify-center align-center grow shrink basis-auto">
                    <span className="text-[1.25rem] text-black/[0.4] font-[600]">
                        School Timer
                    </span>
                    <div className="text-[18rem] font-['Pretendard Variable'] font-[800] leading-[20rem]">
                        {timeLeft}
                    </div>
                </div>
                <div className="w-full flex justify-center align-center gap-[1rem] pb-[14rem]">
                    {periodInfo.map((info) => {
                        return (
                            <TimeCard
                                key={info[0]}
                                period={info[0]}
                                periodTime={info[1]}
                                periodActive={info[3]}
                                restTime={info[2]}
                                restActive={info[4]}
                            />
                        );
                    })}
                </div>
                {/* Planned progress bar */}
                <div
                    className={`${
                        isRest ? "bg-[var(--chill)]" : "bg-[var(--focus)]"
                    } h-[3vh] w-full absolute bottom-0`}
                ></div>
            </div>
        </>
    );
}
