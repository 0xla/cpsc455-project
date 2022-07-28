import TopNavigation from "../components/TopNavigation";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {decodeToken} from "react-jwt";
import TEXT from "../statics/text";

const base_fe_url = process.env.BASE_FE_URL;

export const PageNotFound = () => {

    // @ts-ignore
    const loggedInUsername = decodeToken(localStorage.getItem("authToken")).username

    return (
        <div>
            <TopNavigation/>
            <Typography variant='h5'>
                Sorry, this page isn't available.
            </Typography>
           <Link href={`${base_fe_url}/${loggedInUsername}`}>
               The link you followed may be broken, or the page may have been removed. Go back to {TEXT.COMMON.TITLE}.
           </Link>

        </div>
    )
}