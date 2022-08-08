import { useSelector } from "react-redux";
import { selectUserData } from "../slices/userSlice";
import { UserDetails } from "../types";
import DonutChart from 'react-donut-chart';

export default function PieChart() {
    const userData: UserDetails = useSelector(selectUserData);
    const imageCategories: string[] = userData.imageCategories;

    let categoriesMap = new Map();
    for (const category of imageCategories) {
        if (categoriesMap.has(category)) {
            categoriesMap.set(category, categoriesMap.get(category) + 1)
        } else {
            categoriesMap.set(category, 1);
        }
    }

    const data = [];
    for (const [key, value] of categoriesMap) {
        data.push({ label: key, value: value });
    }

    return (
        <DonutChart
            className="text-3xl"
            height={1000}
            data={data}
            interactive={true}
            legend={false}
            clickToggle={false}
            />
    );

}