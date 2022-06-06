import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';


const Navigation = () => {

    const [value, setValue] = React.useState('recents');

    const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
        setValue(newValue);
    };

    return (
        <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Profile" value="nearby" icon={<PersonIcon />} />
        </BottomNavigation>
    );
}

export default Navigation;

