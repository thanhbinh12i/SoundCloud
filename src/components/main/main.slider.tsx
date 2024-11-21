'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';

const MainSlider = () => {
      const NextArrow = (props: any) => {
            return (
                  <Button variant="outlined"
                        onClick={props.onClick}
                        sx={{
                              position: "absolute",
                              right: 0,
                              top: "50%",
                              zIndex: 2,
                              minWidth: 30,
                              width: 35,
                        }}
                  >
                        <ChevronRightIcon />
                  </Button>
            )
      }

      const PrevArrow = (props: any) => {
            return (
                  <Button variant="outlined" onClick={props.onClick}
                        sx={{
                              position: "absolute",
                              top: "50%",
                              zIndex: 2,
                              minWidth: 30,
                              width: 35,
                        }}
                  >
                        <ChevronLeftIcon />
                  </Button>
            )
      }

      const settings: Settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
      };
      //box === div
      return (

            <Box
                  sx={{
                        margin: "0 40px",
                        ".abc": {
                              padding: "0 10px",
                        },
                        "img": {
                              marginLeft: '30px',
                              border: "1px solid #ccc",
                              padding: "10px",
                              height: "240px",
                              width: '240px'
                        }
                  }}
            >
                  <h2> Multiple tracks </h2>

                  <Slider {...settings}>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                        <div className="abc">
                              <img src="assest/avatar.jpg" />
                        </div>
                  </Slider>
                  <Divider />
            </Box>

      );
}

export default MainSlider;