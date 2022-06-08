import Grid from "@material-ui/core/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ImageData } from "../types";

export default function ImageCard({ imageData }: { imageData: ImageData }) {

    return (
        <Grid container justify="center">
            <Card className="App" sx={{ width: '300px', height: '300px' }}>
                <CardMedia component="img" className='cardMedia' image={imageData.url} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {imageData.description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}