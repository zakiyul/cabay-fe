import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CardComp({headerText, text, btnText}){
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div"> {headerText} </Typography>
            <Typography variant="body2" color="text.secondary"> {text} </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary"> {btnText} </Button>
        </CardActions>
      </Card>
    )
}