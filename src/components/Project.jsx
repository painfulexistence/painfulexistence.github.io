import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"

const Project = (props) => {
    return (
        <Card>
            <CardHeader
                title={props.title}
                subheader={props.subheader}
            />
            {
                props.imgSrc
                ? (
                    <img
                        src={props.imgSrc}
                        alt={props.imgAlt}
                        width="100%"
                    />
                ) : null
            }
            <CardContent>
                {
                    props.content
                }
            </CardContent>
            {
                props.website
                ? (
                    <CardActions>
                        <Button component="a" size="small" href={props.website} target="_blank">
                            Learn More
                        </Button>     
                    </CardActions>
                ) : null
            }
        </Card>
    )
}

export default Project