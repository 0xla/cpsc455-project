import { Button, Grid, Paper } from "@mui/material";
import TopNavigation from "../components/TopNavigation";
import { Box } from "@mui/system";
import {ListItemIcon} from "@mui/material";
import HelpTextarea from "../components/HelpTextarea";
import AccountSwitch from "../components/AccountSwitch";
import LogOut from "../components/LogOut";
import ChangePW from "../components/ChangePW";
import PrivacyOP from "../components/PrivacyOP";




const SettingPage = () => {

    return(        
        <div className="bg-[#FAFAFA] ">
            <TopNavigation />
           
           <Box p={5} >
           <Paper >
            <Box p={5} sx={{ display: 'grid',columnGap: 3, gridTemplateRows: 'repeat(3, 1fr)' }}>          

    
                </Box>                
            </Paper>

            <Paper>
            <Box p={5}>
            <div>Account</div>
                <AccountSwitch/>
                </Box>
            </Paper>

            <br></br>

            <Paper>
            <Box p={5}>
                
                <div>Log out</div>
                <LogOut/>
                </Box>
            </Paper>

            <br></br>

            <Paper >
            <Box p={5}>
                <div>Privacy</div>
                <PrivacyOP/>
                </Box>

            </Paper>

            <br></br>

            <Paper >
            <Box p={5}>
                <div>Security</div>                
                <ChangePW/>
                </Box>

            </Paper>

            <br></br>

            <Paper >
            <Box p={5}>
            <div>Help</div>
                <HelpTextarea/>
                </Box>
               
            </Paper>

            <br></br>

               



           </Box> 
        </div>
        
        
        
    )

}

export default SettingPage;