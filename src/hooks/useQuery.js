import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { PiUserCircleMinusBold } from "react-icons/pi";

export function useQuery () {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}