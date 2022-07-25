import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUserData } from "../slices/userSlice";
import { UserDetails } from "../types";

export default function PieChart() {
    const userData: UserDetails = useSelector(selectUserData);
    const imageCategories: string[] = userData.imageCategories;

    // let categoriesMap = new Map();
    // for (const category of imageCategories) {
    //     if (categoriesMap.has(category)) {
    //         categoriesMap.set(category, categoriesMap.get(category) + 1)
    //     } else {
    //         categoriesMap.set(category, 1);
    //     }
    // }

    // console.log(categoriesMap);

    return (
        <Box></Box>

    );

}