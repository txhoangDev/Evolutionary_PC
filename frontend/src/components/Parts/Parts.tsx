import React from "react";
import { getBuild } from "../../http-common";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Slide,
  Button,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CPU from "../../assets/images/cpu.png";
import GPU from "../../assets/images/gpu.png";
import RAM from "../../assets/images/ram.png";
// import mb from "../../assets/images/mb.png";
// import psu from "../../assets/images/psu.png";
// import storage from "../../assets/images/storage.png";
// import cooler from "../../assets/images/cooler.png";
// import c from "../../assets/images/case.png";

const components: string[] = [
  "CPU",
  "GPU",
  "RAM",
  "Motherboard",
  "PSU",
  "Storage",
  "Cooling",
  "Case",
];
const descriptions: string[] = [
  "This component is used as the brains of the computer. It understands the instructions given and it will execute the instruction for you. When installing this component do not let the pins bend, otherwise the component will lose function. It should fit right into the motherboard without having to be forced in. Make sure you lift up the tab before trying to install the component. When putting the tab back, you might need a bit of force.",
  "This component is the most well known component in the gaming community. It is what powers your games and makes your games look pretty. Without this component, you would be looking at games without good video settings.When installing this component, you might need a bit of force. Make sure the part lines up with where it is supposed to go on the motherboard before using force to put it in.",
  "This component is known for how many chrome tabs you can have open. In a simpler way, it will determine how fast your computer can access information for your apps. The amount of RAM you need is based on your needs and budget. Don't worry, we got you covered on this one.",
  "This component is what brings all the parts together so they can work together. Typically, they don't hinder your performance. This is merely up to user preference. Take a look at how many ports you may need to decide which motherboard to get. Also, remember to look at the socket. For AMD CPUs the socket would be AM4 and for Intel CPUs the socket would be LGA. Remember to install the motherboard stands in the case before putting the motherboard in. Also, install your CPU, GPU, and RAM on the motherboard before installing the motherboard in the case.",
  "This component provides power to all your components. The rating of the PSU comes in bronze, gold, platinum, etc. These ratings indicate how well the component can last. Typically, this will not hinder your performance. It depends on how much budget you have left to determine which rating PSU you will get. The worst the rating, the cheaper it is.",
  "This component stores all your data files, information, applications, etc. Pretty simple right? This one is self explanatory. Get as much as you need for storage.",
  "This component can vary per user. Typically, most users will be okay with an air cooling system. However, if you plan on doing tasks that require high levels of computing, it is recommended to get a liquid cooling system.",
  "This component holds all your components and makes your computer look good or not. This one is a no brainer and is mostly just for looks and differs per person. The only complication would be if the motherboard fits or not. Remember to look at the size of your motherboard and the size of the case. Make sure the case can fit the motherboard.",
];

const maxLength = 250;

const Parts: React.FC = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [cpu, setCpu] = React.useState("");
  const [gpu, setGpu] = React.useState("");
  const [ram, setRam] = React.useState("");
  const [prices, setPrices] = React.useState<string[]>([]);
  const [component, setComponent] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [image, setImage] = React.useState(CPU);
  const [checked, setChecked] = React.useState(false);
  const [showFull, setShowFull] = React.useState(false);

  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  React.useEffect(() => {
    const result = getBuild(Number(id));
    result.then(
      function (res) {
        setCpu(res["build"]["cpu"]);
        setComponent(res["build"]["cpu"]);
        setGpu(res["build"]["gpu"]);
        setRam(res["build"]["ram"]);
        setPrices([res["cpu_price"], res["gpu_price"], res["ram_price"]]);
      },
      function (err) {
        console.log(err);
      }
    );
    setChecked(true);
  }, [id]);

  const handleRight = () => {
    setChecked(false);
    switch (index) {
      case 0:
        setIndex(index + 1);
        setComponent(gpu);
        setImage(GPU);
        break;
      case 1:
        setIndex(index + 1);
        setComponent(ram);
        setImage(RAM);
        break;
      default:
        setIndex(0);
        setComponent(cpu);
        setImage(CPU);
        break;
    }
    setTimeout(function () {
      setChecked(true);
    }, 250);
  };

  const handleLeft = () => {
    setChecked(false);
    switch (index) {
      case 0:
        setIndex(2);
        setComponent(ram);
        setImage(RAM);
        break;
      case 1:
        setIndex(index - 1);
        setComponent(cpu);
        setImage(CPU);
        break;
      default:
        setIndex(index - 1);
        setComponent(gpu);
        setImage(GPU);
        break;
    }
    setTimeout(function () {
      setChecked(true);
    }, 250);
  };

  const handleShow = () => {
    setShowFull(!showFull);
  };

  return (
    <Grid
      container
      spacing={9}
      style={{ minHeight: "100vh" }}
      alignItems="center"
      justifyContent="space-between"
      direction={window.innerWidth ? "row" : "column"}
    >
      <Grid item xs={1} alignItems={"center"}>
        <IconButton
          size="large"
          disableRipple
          onClick={handleLeft}
          style={{
            position: "absolute",
            left: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      <Grid item xs={8} md={10} container direction={window.innerWidth > theme.breakpoints.values.sm ? "row" : "column"} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
              <Box data-aos={isMd ? "fade-right" : "fade-up"}>
                <Box marginBottom={2}>
                  <Typography variant="h3">{components[index]}</Typography>
                  <Typography
                    variant="h1"
                    sx={{ fontWeight: 700, fontSize: 80 }}
                  >
                    {component}
                  </Typography>
                </Box>
                <Box marginBottom={2}>
                  <Typography variant="h4">${prices[index]}</Typography>
                </Box>
                <Box marginBottom={3}>
                  <Typography variant="h6" component="p">
                    {showFull
                      ? descriptions[index]
                      : descriptions[index].slice(
                          0,
                          descriptions[index].lastIndexOf(".", maxLength)
                        )}
                    {descriptions[index].length > maxLength &&
                      !showFull &&
                      "..."}
                    {descriptions[index].length > maxLength && (
                    <Button onClick={handleShow} sx={{ color: 'black'}}>
                      {showFull ? "Show Less" : "Show More"}
                    </Button>
                  )}
                  </Typography>
                </Box>
              </Box>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6} alignItems="center" justifyContent="center">
            <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
              <Box
                component="img"
                loading="lazy"
                height={1}
                width={1}
                src={image}
                alt="gpu"
                borderRadius={2}
                maxWidth={700}
                maxHeight={600}
                sx={{
                  objectFit: "cover",
                }}
                style={{
                  height: "auto",
                  width: "100%",
                }}
              />
            </Slide>
          </Grid>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          size="large"
          disableRipple
          onClick={handleRight}
          style={{
            position: "absolute",
            right: "5px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Parts;
